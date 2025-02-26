const pool = require("../database/database_connection")

const getKepalaSekolahSma = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM kepala_sekolah_sma"
        );


        const formattedData = rows.map((row) => ({
            ...row,
            foto: row.foto ? Buffer.from(row.foto).toString("base64") : null, // Konversi BLOB ke Base64
        }));

        res.json(formattedData);
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

};

module.exports = {
    getKepalaSekolahSma,
}
