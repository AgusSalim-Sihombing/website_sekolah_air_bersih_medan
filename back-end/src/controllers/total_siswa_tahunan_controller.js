const pool = require("../database/database_connection")

const getTotalSiswaTahunan = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM total_siswa_tahunan"
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

};

const addTotalSiswaTahunan = async (req, res) => {
    const { laki_laki, perempuan, tahun } = req.body;

    try {
        await pool.execute(
            "INSERT INTO total_siswa_tahunan (laki_laki, perempuan, tahun) VALUES (?, ?, ?)",
            [laki_laki, perempuan, tahun]
        );
        res.status(201).json({ message: "Data berhasil ditambahkan!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Update data siswa tahunan berdasarkan tahun
const updateTotalSiswaTahunan = async (req, res) => {
    const { laki_laki, perempuan } = req.body;
    const { tahun } = req.params; // Ambil tahun dari URL

    try {
        const [result] = await pool.execute(
            "UPDATE total_siswa_tahunan SET laki_laki = ?, perempuan = ? WHERE tahun = ?",
            [laki_laki, perempuan, tahun]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        res.json({ message: "Data berhasil diperbarui!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTotalSiswaTahunan = async (req, res) => {
    const { tahun } = req.params;

    try {
        const [result] = await pool.execute("DELETE FROM total_siswa_tahunan WHERE tahun = ?", [tahun]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        res.json({ message: `Data tahun ${tahun} berhasil dihapus!` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const disableToogleTotalSiswaTahunan = async (req, res) => {
    const { tahun } = req.params;

    try {
        const [result] = await pool.execute(
            "UPDATE total_siswa_tahunan SET is_active = NOT is_active WHERE tahun = ?",
            [tahun]
        );

        if (result.affectedRows > 0) {
            res.json({ message: "Status berhasil diubah" });
        } else {
            res.status(404).json({ message: "Data tidak ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ message: "Gagal mengubah status", error });
    }
}





module.exports = {
    getTotalSiswaTahunan,
    addTotalSiswaTahunan,
    updateTotalSiswaTahunan,
    deleteTotalSiswaTahunan,
    disableToogleTotalSiswaTahunan,
   
}