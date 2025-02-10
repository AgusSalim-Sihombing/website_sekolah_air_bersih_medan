const pool = require("../database/database_connection")

const getTotalSiswaTahunan = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM total_siswa_tahunan"
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
    
};

module.exports = {
    getTotalSiswaTahunan,
}