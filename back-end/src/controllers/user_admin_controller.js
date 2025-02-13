const pool = require("../database/database_connection")

const getUserAdmin = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM admin"
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
    
};

module.exports = {
    getUserAdmin,
}