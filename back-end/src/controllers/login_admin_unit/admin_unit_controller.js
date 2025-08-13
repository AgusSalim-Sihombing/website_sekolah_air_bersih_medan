const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../../database/database_connection");
const SECRET_KEY = process.env.SECRET_KEY;
const axios = require("axios");
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

// Login Admin untuk semua unit
const loginAdminUnit = async (req, res) => {
    try {
        const { username, password, unit_sekolah, recaptchaToken } = req.body;

        if (!recaptchaToken) {
            return res.status(400).json({ message: "reCAPTCHA token tidak ditemukan" });
        }

        // Validasi ke server Google
        const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;

        const captchaResponse = await axios.post(verifyURL);

        if (!captchaResponse.data.success) {
            return res.status(403).json({ message: "Validasi reCAPTCHA gagal" });
        }

        const [userRows] = await pool.execute(
            "SELECT * FROM admin_sekolah WHERE username = ?",
            [username]
        );

        if (userRows.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        const user = userRows[0];

        // Cek apakah unitnya sesuai
        if (user.unit_sekolah.toUpperCase() !== unit_sekolah.toUpperCase()) {
            return res.status(403).json({ message: "Anda tidak memiliki akses ke unit ini atau bukan bagian dari unit ini" });
        }


        // Cek status aktif
        if (user.status !== "active") {
            return res.status(403).json({ message: "Akun tidak aktif, hubungi administrator" });
        }

        // Cek password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: "Password salah" });

        // Token dan respon
        const token = jwt.sign({
            id: user.id,
            username: user.username,
            role: user.role,
            unit_sekolah: user.unit_sekolah
        }, SECRET_KEY, { expiresIn: "4h" });

        res.json({
            token,
            id: user.id,
            username: user.username,
            role: user.role,
            status: user.status,
            unit_sekolah: user.unit_sekolah
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Tambah Admin Baru (hanya superadmin)
const addAdminUnit = async (req, res) => {
    try {
        if (req.user.role !== 'superadmin') {
            return res.status(403).json({ message: "Akses ditolak" });
        }

        const { username, password, confirmPassword, role = "admin", status = "active", unit_sekolah } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password tidak cocok" });
        }

        const hashed = await bcrypt.hash(password, 10);
        await pool.execute(
            "INSERT INTO admin_sekolah (username, password, role, status, unit_sekolah) VALUES (?, ?, ?, ?, ?)",
            [username, hashed, role, status, unit_sekolah]
        );

        res.status(201).json({ message: "Admin berhasil ditambahkan" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Ambil semua data admin
const getAdminUnit = async (req, res) => {
    try {
        if (req.user.role !== 'superadmin') {
            return res.status(403).json({ message: "Akses ditolak" });
        }

        const [rows] = await pool.execute("SELECT id, username, role, status, unit_sekolah, created_at, updated_at FROM admin_sekolah ORDER BY unit_sekolah");
        res.json(rows);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update data admin
const updateAdminUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, role, status } = req.body;

        if (req.user.id !== parseInt(id) && req.user.role !== 'superadmin') {
            return res.status(403).json({ message: "Akses ditolak" });
        }

        let query = "UPDATE admin_sekolah SET username=?, role=?, status=? WHERE id=?";
        let values = [username, role, status, id];
        
        if (password) {
            const hashed = await bcrypt.hash(password, 10);
            query = "UPDATE admin_sekolah SET username=?, password=?, role=?, status=? WHERE id=?";
            values = [username, hashed, role, status, id];
        }

        await pool.execute(query, values);
        res.json({ message: "Admin berhasil diperbarui" });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Hapus admin
const deleteAdminUnit = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user.role !== 'superadmin') {
            return res.status(403).json({ message: "Akses ditolak" });
        }

        if (req.user.id === parseInt(id)) {
            return res.status(400).json({ message: "Tidak bisa hapus akun sendiri" });
        }

        await pool.execute("DELETE FROM admin_sekolah WHERE id=?", [id]);
        res.json({ message: "Admin berhasil dihapus" });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Toggle status aktif/non-aktif
const toggleStatusAdminUnit = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user.role !== 'superadmin') {
            return res.status(403).json({ message: "Akses ditolak" });
        }

        if (req.user.id === parseInt(id)) {
            return res.status(400).json({ message: "Tidak bisa ubah status sendiri" });
        }

        const [rows] = await pool.execute("SELECT status FROM admin_sekolah WHERE id=?", [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Admin tidak ditemukan" });

        const newStatus = rows[0].status === "active" ? "inactive" : "active";

        await pool.execute("UPDATE admin_sekolah SET status=? WHERE id=?", [newStatus, id]);
        res.json({ message: `Status berhasil diubah menjadi ${newStatus}` });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    loginAdminUnit,
    addAdminUnit,
    getAdminUnit,
    updateAdminUnit,
    deleteAdminUnit,
    toggleStatusAdminUnit
};
