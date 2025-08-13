const db = require("../database/database_connection");

// Get informasi pendaftaran (ambil satu data terbaru)
const getInformasiPendaftaran = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM informasi_pendaftaran ORDER BY id DESC LIMIT 1");

        if (rows.length > 0 && rows[0].gambar) {
            rows[0].gambar = Buffer.from(rows[0].gambar).toString("base64");
        }

        res.json(rows[0] || {});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal mengambil informasi pendaftaran" });
    }
};

// Tambah informasi pendaftaran
const createInformasiPendaftaran = async (req, res) => {
    try {
        const { syarat } = req.body;
        const gambar = req.file ? req.file.buffer : null;

        if (!gambar || !syarat) {
            return res.status(400).json({ message: "Gambar dan syarat wajib diisi" });
        }

        await db.execute(
            "INSERT INTO informasi_pendaftaran (gambar, syarat) VALUES (?, ?)",
            [gambar, syarat]
        );

        res.status(201).json({ message: "Informasi pendaftaran berhasil ditambahkan" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal menambahkan informasi pendaftaran" });
    }
};

// Update informasi pendaftaran
const updateInformasiPendaftaran = async (req, res) => {
    try {
        const { id } = req.params;
        const { syarat } = req.body;
        const gambar = req.file ? req.file.buffer : null;

        let query = "UPDATE informasi_pendaftaran SET syarat=?";
        const values = [syarat];

        if (gambar) {
            query += ", gambar=?";
            values.push(gambar);
        }

        query += " WHERE id=?";
        values.push(id);

        await db.execute(query, values);

        res.json({ message: "Informasi pendaftaran berhasil diperbarui" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal memperbarui informasi pendaftaran" });
    }
};

// Hapus informasi pendaftaran
const deleteInformasiPendaftaran = async (req, res) => {
    try {
        const { id } = req.params;

        await db.execute("DELETE FROM informasi_pendaftaran WHERE id = ?", [id]);

        res.json({ message: "Informasi pendaftaran berhasil dihapus" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal menghapus informasi pendaftaran" });
    }
};

module.exports = {
    getInformasiPendaftaran,
    createInformasiPendaftaran,
    updateInformasiPendaftaran,
    deleteInformasiPendaftaran,
};
