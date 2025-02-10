const pool = require("../database/database_connection");

const getVisi = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT visi FROM visi"
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

};

const updateVisi = async (req, res) => {
    try {
        // const {id} = req.params; 
        const { visi } = req.body;
        

        if (!visi) {
            return res.status(400).json({ message: "Visi tidak boleh kosong!" });
        }

        const [result] = await pool.execute(
            "UPDATE visi SET visi = ?", [visi]
        );
        

        // Berikan respon sukses
        if (result.length != 0) {
            return res.status(200).json({
                message: "Visi berhasil diperbarui!",
            });
        }
        


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getMisi = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM misi"
        );
        res.json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getTujuan = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM tujuan"
        );
        res.json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getVisi,
    updateVisi,
    getMisi,
    getTujuan
}
