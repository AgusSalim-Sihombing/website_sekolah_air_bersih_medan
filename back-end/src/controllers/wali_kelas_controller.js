// File: waliKelasController.js
const pool = require("../database/database_connection");

// Ambil semua wali kelas beserta nama guru
const getAllWaliKelas = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT 
                wk.id, 
                wk.kelas, 
                wk.unit_sekolah, 
                g.id AS guru_id,
                g.nama AS nama_guru,
                g.mapel_dampu,
                g.jabatan,
                g.foto
            FROM wali_kelas wk
            JOIN guru_tendik g ON wk.guru_id = g.id
            ORDER BY wk.kelas`
        );

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Tambah wali kelas
const tambahWaliKelas = async (req, res) => {
    const { guru_id, kelas, unit_sekolah } = req.body;

    if (!guru_id || !kelas || !unit_sekolah) {
        return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    try {
        await pool.execute(
            "INSERT INTO wali_kelas (guru_id, kelas, unit_sekolah) VALUES (?, ?, ?)",
            [guru_id, kelas, unit_sekolah]
        );

        res.status(201).json({ message: "Wali kelas berhasil ditambahkan" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error, hubungi developer" });
    }
};

const editWaliKelas = async (req, res) => {
    const { id } = req.params;
    const { guru_id, kelas, unit_sekolah } = req.body;

    if (!guru_id || !kelas || !unit_sekolah) {
        return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    try {
        const [cek] = await pool.execute("SELECT * FROM wali_kelas WHERE id = ?", [id]);
        if (cek.length === 0) {
            return res.status(404).json({ message: "Data wali kelas tidak ditemukan" });
        }

        await pool.execute(
            "UPDATE wali_kelas SET guru_id = ?, kelas = ?, unit_sekolah = ? WHERE id = ?",
            [guru_id, kelas, unit_sekolah, id]
        );

        res.json({ message: "Data wali kelas berhasil diperbarui" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error, hubungi  developer" });
    }
};

// Hapus wali kelas
const hapusWaliKelas = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.execute("DELETE FROM wali_kelas WHERE id = ?", [id]);
        res.json({ message: "Wali kelas berhasil dihapus" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error, hubungi developer" });
    }
};

module.exports = { getAllWaliKelas, tambahWaliKelas, editWaliKelas, hapusWaliKelas };
