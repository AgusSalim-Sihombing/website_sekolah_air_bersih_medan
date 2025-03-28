const pool = require("../../database/database_connection");

const getTotalSiswaBulanan = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT kelas, jumlah_laki_laki, jumlah_perempuan, bulan, tahun FROM total_siswa_sma_bulanan ORDER BY tahun, bulan"
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTotalSiswaBulanan
};
