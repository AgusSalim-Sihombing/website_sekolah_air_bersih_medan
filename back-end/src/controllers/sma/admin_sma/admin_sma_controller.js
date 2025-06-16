// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "your-secret-key"; // Ganti dengan secret key yang aman
// const pool = require("../../../database/database_connection")

// const loginAdminSma = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const [rows] = await pool.execute(
//             "SELECT * FROM admin_sma WHERE username = ?", [username]
//         );

//         if (rows.length === 0) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         const user = rows[0];

//         if (user.status !== "active") {
//             return res.status(403).json({ message: "Akun tidak aktif. Hubungi administrator." });
//         }

//         const match = await bcrypt.compare(password, user.password);

//         if (!match) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         const token = jwt.sign(
//             { id: user.id, username: user.username },
//             SECRET_KEY,
//             {
//                 expiresIn: "1h"
//             }
//         );
//         res.status(200).json({
//             token,
//             id: user.id,
//             username: user.username,
//             role: user.role,
//             status: user.status
//         });
//         if (token.length !== 0) {
//             console.log("Login sukses dengan id admin :", user.id)
//         }
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: "Internal server error" })
//     }
// }

// const addAdminSma = async (req, res) => {
//     try {
//         const { username, password, confirmPassword, role = "admin", status = "active" } = req.body;

//         if (password !== confirmPassword) {
//             return res.status(400).json({ message: "Passwords do not match" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const [result] = await pool.execute(
//             "INSERT INTO admin_sma (username, password, role, status) VALUES (?, ?, ?, ?)",
//             [username, hashedPassword, role, status]
//         );

//         res.status(201).json({
//             message: "Admin registered successfully",
//             userId: result.insertId,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// const getAdminSma = async (req, res) => {
//     try {
//         const [rows] = await pool.execute(
//             "SELECT * FROM admin_sma"
//         );
//         res.json(rows);
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }

// };

// const updateAdminSma = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { username, password, role, status } = req.body;

//         let query = "UPDATE admin_sma SET username = ?, role = ?, status = ? WHERE id = ?";
//         let values = [username, role, status, id];

//         if (password) {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             query = "UPDATE admin_sma SET username = ?, password = ?, role = ?, status = ? WHERE id = ?";
//             values = [username, hashedPassword, role, status, id];
//         }

//         await pool.execute(query, values);

//         res.status(200).json({ message: "Admin updated successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// const deleteAdminSma = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await pool.execute("DELETE FROM admin_sma WHERE id = ?", [id]);
//         res.status(200).json({ message: "Admin deleted successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// const disableToggleStatusAdminSma = async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Ambil status saat ini
//         const [rows] = await pool.execute(
//             "SELECT status FROM admin_sma WHERE id = ?",
//             [id]
//         );

//         if (rows.length === 0) {
//             return res.status(404).json({ message: "Data tidak ditemukan" });
//         }

//         const currentStatus = rows[0].status;
//         const newStatus = currentStatus === "active" ? "inactive" : "active"; // Toggle status

//         // Update status ke nilai yang berlawanan
//         const [result] = await pool.execute(
//             "UPDATE admin_sma SET status = ? WHERE id = ?",
//             [newStatus, id]
//         );

//         if (result.affectedRows > 0) {
//             res.json({ message: `Status berhasil diubah menjadi ${newStatus}` });
//         } else {
//             res.status(500).json({ message: "Gagal mengubah status" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Terjadi kesalahan", error });
//     }
// };



// module.exports = {
//     loginAdminSma,
//     addAdminSma,
//     getAdminSma,
//     updateAdminSma,
//     deleteAdminSma,
//     disableToggleStatusAdminSma
// };

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your-secret-key";
const pool = require("../../../database/database_connection");

const loginAdminSma = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await pool.execute(
            "SELECT * FROM admin_sma WHERE username = ?", [username]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = rows[0];

        if (user.status !== "active") {
            return res.status(403).json({ message: "Akun tidak aktif. Hubungi administrator." });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { 
                id: user.id, 
                username: user.username,
                role: user.role 
            },
            SECRET_KEY,
            { expiresIn: "1h" }
        );
        
        res.status(200).json({
            token,
            id: user.id,
            username: user.username,
            role: user.role,
            status: user.status
        });
        
        console.log("Login sukses dengan id admin:", user.id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const addAdminSma = async (req, res) => {
    try {
        // Hanya super admin yang bisa menambahkan admin baru
        if (req.user.role !== 'superadmin') {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const { username, password, confirmPassword, role = "admin", status = "active" } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.execute(
            "INSERT INTO admin_sma (username, password, role, status) VALUES (?, ?, ?, ?)",
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

const getAdminSma = async (req, res) => {
    try {
        // Hanya super admin yang bisa melihat semua admin
        if (req.user.role !== 'superadmin') {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const [rows] = await pool.execute("SELECT id, username, role, status, created_at, updated_at FROM admin_sma");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAdminSma = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, role, status } = req.body;

        // Verifikasi kepemilikan atau role super admin
        if (req.user.id !== parseInt(id) && req.user.role !== 'superadmin') {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        let query = "UPDATE admin_sma SET username = ?, role = ?, status = ? WHERE id = ?";
        let values = [username, role, status, id];

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query = "UPDATE admin_sma SET username = ?, password = ?, role = ?, status = ? WHERE id = ?";
            values = [username, hashedPassword, role, status, id];
        }

        await pool.execute(query, values);

        res.status(200).json({ message: "Admin updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteAdminSma = async (req, res) => {
    try {
        const { id } = req.params;

        // Hanya super admin yang bisa menghapus admin
        if (req.user.role !== 'superadmin') {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        // Tidak boleh menghapus diri sendiri
        if (req.user.id === parseInt(id)) {
            return res.status(400).json({ message: "Cannot delete yourself" });
        }

        await pool.execute("DELETE FROM admin_sma WHERE id = ?", [id]);
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const disableToggleStatusAdminSma = async (req, res) => {
    const { id } = req.params;

    try {
        // Hanya super admin yang bisa mengubah status
        if (req.user.role !== 'superadmin') {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        // Tidak bisa menonaktifkan diri sendiri
        if (req.user.id === parseInt(id)) {
            return res.status(400).json({ message: "Cannot disable yourself" });
        }

        const [rows] = await pool.execute(
            "SELECT status FROM admin_sma WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        const currentStatus = rows[0].status;
        const newStatus = currentStatus === "active" ? "inactive" : "active";

        const [result] = await pool.execute(
            "UPDATE admin_sma SET status = ? WHERE id = ?",
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
    loginAdminSma,
    addAdminSma,
    getAdminSma,
    updateAdminSma,
    deleteAdminSma,
    disableToggleStatusAdminSma
};
