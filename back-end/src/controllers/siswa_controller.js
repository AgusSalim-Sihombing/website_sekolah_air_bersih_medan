const pool = require("../database/database_connection");

const getAllSiswa = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM siswa");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Gagal mengambil data", error: err });
    }
};


module.exports = {
    getAllSiswa,
};