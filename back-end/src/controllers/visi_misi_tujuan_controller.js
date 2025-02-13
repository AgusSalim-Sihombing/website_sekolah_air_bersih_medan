const pool = require("../database/database_connection");

//VISI
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
            return res.status(400).json({ message: "visi tidak boleh kosong!" });
        }

        const [result] = await pool.execute(
            "UPDATE visi SET visi = ?", [visi]
        );


        // Berikan respon sukses
        if (result.length != 0) {
            return res.status(200).json({
                message: "visi berhasil diperbarui!",
            });
        }



    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//MISI
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

const getMisiById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.execute('SELECT * FROM misi WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Misi tidak ditemukan' });
        }

        res.json(rows[0]); // Kirim data misi
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error });
    }
};


const updateMisiById = async (req, res) => {
    const { id } = req.params;
    const { misi } = req.body;

    if(!misi){
        return res.status(400).json({message :"Misi tidak boleh kosong!"})
    }

    try {
        const [result] = await pool.execute(
            "UPDATE misi SET misi = ?, created_at = NOW() WHERE id = ?", [misi, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Misi tidak ditemukan' });
        }

        res.json({ message: "Misi Berhasil Di Perbaharui" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



//TUJUAN
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

const getTujuanById = async (req, res) => {

    const { id } = req.params;
 
    try {
        const [rows] = await pool.execute('SELECT * FROM tujuan WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Tujuan tidak ditemukan' });
        }

        res.json(rows[0]); // Kirim data misi
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error });
    }
};

const updateTujuanById = async (req, res) => {
    const { id } = req.params;
    const { tujuan } = req.body;

    if(!tujuan){
        return res.status(400).json({message :"Tujuan tidak boleh kosong!"})
    }

    try {
        const [result] = await pool.execute(
            "UPDATE tujuan SET tujuan = ?, created_at = NOW() WHERE id = ?", [tujuan, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tujuan tidak ditemukan' });
        }

        res.json({ message: "Tujuan Berhasil Di Perbaharui" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getVisi,
    updateVisi,
    getMisi,
    getMisiById,
    updateMisiById,
    getTujuan,
    getTujuanById,
    updateTujuanById
}
