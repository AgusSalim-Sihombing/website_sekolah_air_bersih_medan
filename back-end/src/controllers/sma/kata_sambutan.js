const pool = require("../../database/database_connection")

const getKataSambutan = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT kata_sambutan FROM katasambutan"
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

};