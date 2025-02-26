const pool = require("../../database/database_connection");


const  getDataOrganization = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM chart_organisasi_sma"
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

};

module.exports = {
    getDataOrganization
}