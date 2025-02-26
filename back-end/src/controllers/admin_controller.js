const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your-secret-key"; // Ganti dengan secret key yang aman
const pool = require("../database/database_connection")
const multer = require("multer")

// Konfigurasi penyimpanan dengan Multer
const storage = multer.memoryStorage(); // Menyimpan foto dalam memory sebelum masuk ke database
const upload = multer({ storage: storage });


const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await pool.execute(
            "SELECT * FROM admin WHERE username = ?", [username]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            SECRET_KEY,
            {
                expiresIn: "1h"
            }
        );
        res.status(200).json({ token, userId: user.id });
        if (token.length !== 0) {
            console.log("Login sukses dengan id admin :", user.id)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const addAdmin = async (req, res) => {
    try {
        const { username, password, confirmPassword, role = "admin", status = "active" } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.execute(
            "INSERT INTO admin (username, password, role, status) VALUES (?, ?, ?, ?)",
            [username, hashedPassword, role, status]
        );

        res.status(201).json({
            message: "Admin registered successfully",
            userId: result.insertId,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAdmin = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM admin"
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

};

const getAdminPhoto = async (req, res) => {
    try {
        const { id } = req.params; // Ambil ID admin dari parameter URL
        const [rows] = await pool.execute(
            "SELECT foto FROM admin WHERE id = ?",
            [id]
        );

        if (rows.length === 0 || !rows[0].foto) {
            return res.status(404).json({ message: "Foto tidak ditemukan" });
        }

        // Mengembalikan gambar dalam bentuk binary
        res.setHeader("Content-Type", "image/jpeg"); // Sesuaikan dengan tipe gambar (jpeg/png)
        res.send(rows[0].foto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil foto" });
    }
};

const uploadAdminPhoto = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.file) {
            return res.status(400).json({ message: "Tidak ada file yang diunggah" });
        }

        const fotoBuffer = req.file.buffer;

        await pool.execute(
            "UPDATE admin SET foto = ? WHERE id = ?",
            [fotoBuffer, id]
        );

        res.status(200).json({ message: "Foto berhasil diunggah" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal mengunggah foto" });
    }
};

const deleteAdminPhoto = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.execute(
            "UPDATE admin SET foto = NULL WHERE id = ?",
            [id]
        );

        res.status(200).json({ message: "Foto berhasil dihapus" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal menghapus foto" });
    }
};


const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, role, status } = req.body;

        let query = "UPDATE admin SET username = ?, role = ?, status = ? WHERE id = ?";
        let values = [username, role, status, id];

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query = "UPDATE admin SET username = ?, password = ?, role = ?, status = ? WHERE id = ?";
            values = [username, hashedPassword, role, status, id];
        }

        await pool.execute(query, values);

        res.status(200).json({ message: "Admin updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.execute("DELETE FROM admin WHERE id = ?", [id]);
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const disableToggleStatusAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        // Ambil status saat ini
        const [rows] = await pool.execute(
            "SELECT status FROM admin WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        const currentStatus = rows[0].status;
        const newStatus = currentStatus === "active" ? "inactive" : "active"; // Toggle status

        // Update status ke nilai yang berlawanan
        const [result] = await pool.execute(
            "UPDATE admin SET status = ? WHERE id = ?",
            [newStatus, id]
        );

        if (result.affectedRows > 0) {
            res.json({ message: `Status berhasil diubah menjadi ${newStatus}` });
        } else {
            res.status(500).json({ message: "Gagal mengubah status" });
        }
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
    }
};



module.exports = {
    loginAdmin,
    addAdmin,
    getAdmin,
    getAdminPhoto,
    uploadAdminPhoto,
    deleteAdminPhoto,
    updateAdmin,
    deleteAdmin,
    disableToggleStatusAdmin
};
