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

const addVisi = async (req, res) => {
    const { visi } = req.body;
    try {
        await pool.query("INSERT INTO visi (visi) VALUES (?)", [visi]);
        res.status(201).json({ message: "Visi berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ message: "Error menambahkan visi", error });
    }
}

const updateVisi = async (req, res) => {
    const { visi } = req.body;

    try {
        if (!visi) {
            return res.status(400).json({ message: "Visi tidak boleh kosong!" });
        }

        const [rows] = await pool.query("SELECT id FROM visi LIMIT 1");
        if (rows.length === 0) {
            return res.status(404).json({ message: "Data visi belum tersedia untuk diperbarui." });
        }

        const id = rows[0].id;
        await pool.query("UPDATE visi SET visi = ?, created_at = NOW() WHERE id = ?", [visi, id]);

        res.json({ message: "Visi berhasil diperbarui" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteVisi = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id FROM visi LIMIT 1");

        if (rows.length === 0) {
            return res.status(404).json({ message: "Tidak ada visi yang dapat dihapus." });
        }

        const id = rows[0].id;

        await pool.query("DELETE FROM visi WHERE id = ?", [id]);

        res.json({ message: "Visi berhasil dihapus." });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus visi", error });
    }
};


//MISI
const getMisi = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT misi FROM misi"
        );
        res.json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const addMisi = async (req, res) => {
    const { misi } = req.body;
    try {
        await pool.query("INSERT INTO misi (misi) VALUES (?)", [misi]);
        res.status(201).json({ message: "Misi berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ message: "Error menambahkan misi", error });
    }
}

const updateMisi = async (req, res) => {
    const { misi } = req.body;
    try {
        if (!misi) {
            return res.status(400).json({ message: "Misi tidak boleh kosong!" })
        }

        const [rows] = await pool.query("SELECT id FROM misi LIMIT 1");
        if (rows.length === 0) {
            return res.status(404).json({ message: "Data Misi belum tersedia untuk diperbarui." });
        }

        const id = rows[0].id;
        await pool.query("UPDATE misi SET misi = ?, created_at = NOW() WHERE id = ?", [misi, id]);

        res.json({ message: "Misi Berhasil Di Perbaharui" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteMisi = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id FROM misi LIMIT 1");

        if (rows.length === 0) {
            return res.status(404).json({ message: "Tidak ada misi yang dapat dihapus." });
        }

        const id = rows[0].id;

        await pool.query("DELETE FROM misi WHERE id = ?", [id]);

        res.json({ message: "Misi berhasil dihapus." });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus visi", error });
    }
};




//TUJUAN
const getTujuan = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT tujuan FROM tujuan"
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

};

const addTujuan = async (req, res) => {
    const { tujuan } = req.body;
    try {
        await pool.query("INSERT INTO tujuan (tujuan) VALUES (?)", [tujuan]);
        res.status(201).json({ message: "Tujuan berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ message: "Error menambahkan Tujuan", error });
    }
}

const updateTujuan = async (req, res) => {
    const { tujuan } = req.body;

    try {
        if (!tujuan) {
            return res.status(400).json({ message: "Tujuan tidak boleh kosong!" });
        }

        const [rows] = await pool.query("SELECT id FROM tujuan LIMIT 1");
        if (rows.length === 0) {
            return res.status(404).json({ message: "Data tujuan belum tersedia untuk diperbarui." });
        }

        const id = rows[0].id;
        await pool.query("UPDATE tujuan SET tujuan = ?, created_at = NOW() WHERE id = ?", [tujuan, id]);

        res.json({ message: "Tujuan berhasil diperbarui" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTujuan = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id FROM tujuan LIMIT 1");

        if (rows.length === 0) {
            return res.status(404).json({ message: "Tidak ada tujuan yang dapat dihapus." });
        }

        const id = rows[0].id;

        await pool.query("DELETE FROM tujuan WHERE id = ?", [id]);

        res.json({ message: "Tujuan berhasil dihapus." });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus Tujuan", error });
    }
};

module.exports = {
    addVisi,
    getVisi,
    updateVisi,
    deleteVisi,

    addMisi,
    getMisi,
    updateMisi,
    deleteMisi,

    addTujuan,
    getTujuan,
    updateTujuan,
    deleteTujuan
}
