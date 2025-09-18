const db = require("../../database/database_connection");

// Ambil kata sambutan
const getKataSambutan = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM kata_sambutan WHERE kategori = 'SMA'");
        if (rows.length > 0 && rows[0].foto_kepala) {
            rows[0].foto_kepala = Buffer.from(rows[0].foto_kepala).toString("base64");
        }
        res.json(rows[0] || {});
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: "Gagal mengambil data sambutan" });
    }
};

// Tambah sambutan baru
const createKataSambutan = async (req, res) => {
    try {
        const { nama_kepala_sekolah, sambutan } = req.body;
        const foto_kepala = req.file?.buffer || null; 

        await db.execute(
            `INSERT INTO kata_sambutan (nama_kepala_sekolah, sambutan, foto_kepala) VALUES (?, ?, ?)`,
            [nama_kepala_sekolah, sambutan, foto_kepala]
        );

        res.status(201).json({ message: "Sambutan berhasil ditambahkan" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal menambahkan sambutan" });
    }
};

// Update sambutan
const updateKataSambutan = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_kepala_sekolah, sambutan } = req.body;
        const foto_kepala = req.file?.buffer;

        const values = [nama_kepala_sekolah, sambutan];
        let query = `UPDATE kata_sambutan SET nama_kepala_sekolah=?, sambutan=?`;

        if (foto_kepala) {
            query += `, foto_kepala=?`;
            values.push(foto_kepala);
        }

        query += ` WHERE id=?`;
        values.push(id);

        await db.execute(query, values);

        res.json({ message: "Sambutan berhasil diperbarui" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal memperbarui sambutan" });
    }
};

// Hapus sambutan
const deleteKataSambutan = async (req, res) => {
    try {
        const { id } = req.params;
        await db.execute("DELETE FROM kata_sambutan WHERE id = ?", [id]);
        res.json({ message: "Sambutan berhasil dihapus" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal menghapus sambutan" });
    }
};

module.exports = {
    getKataSambutan,
    createKataSambutan,
    updateKataSambutan,
    deleteKataSambutan,
};
