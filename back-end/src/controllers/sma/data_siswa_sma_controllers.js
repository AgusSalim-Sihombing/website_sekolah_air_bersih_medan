const pool = require("../../database/database_connection");

const getDataSiswaByKelas = async (req, res) => {
    const { kelas } = req.params; // Ambil kelas dari URL parameter
    const allowedKelas = ["X_IPA", "X_IPS", "XI_IPA", "XI_IPS", "XII_IPA", "XII_IPS"];

    if (!allowedKelas.includes(kelas)) {
        return res.status(400).json({ error: "Kelas tidak valid" });
    }

    try {
        const [rows] = await pool.execute(
            "SELECT * FROM siswa_sma WHERE kelas = ?", [kelas]
        );
        return res.json(rows); // Kirim hasil query ke frontend
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// CREATE: Tambah data siswa baru berdasarkan kelas
const tambahSiswa = async (req, res) => {
    const { nama, kelas, jenis_kelamin, usia } = req.body;

    try {
        await pool.execute(
            "INSERT INTO siswa_sma (nama, kelas, jenis_kelamin, usia) VALUES (?, ?, ?, ?)",
            [nama, kelas, jenis_kelamin, usia]
        );
        return res.status(201).json({ message: "Siswa berhasil ditambahkan" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// UPDATE: Edit data siswa berdasarkan ID
const updateSiswa = async (req, res) => {
    const { id } = req.params;
    const { nama, nis, jenis_kelamin, kelas, tanggal_lahir, alamat } = req.body;

    try {
        await pool.execute(
            "UPDATE siswa_sma SET nama = ?, nis = ?, jenis_kelamin = ?, kelas = ?, tanggal_lahir = ?, alamat = ? WHERE id = ?",
            [nama, nis, jenis_kelamin, kelas, tanggal_lahir, alamat, id]
        );
        return res.json({ message: "Data siswa berhasil diperbarui" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// DELETE: Hapus data siswa berdasarkan ID
const hapusSiswa = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.execute("DELETE FROM siswa_sma WHERE id = ?", [id]);
        return res.json({ message: "Siswa berhasil dihapus" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDataSiswaByKelas,
    tambahSiswa,
    updateSiswa,
    hapusSiswa
};
