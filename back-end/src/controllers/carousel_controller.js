const db = require("../database/database_connection");

// GET all carousel items
const getAllCarousel = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM carousel");
        const data = rows.map(row => ({
            ...row,
            gambar: row.gambar ? Buffer.from(row.gambar).toString("base64") : null
        }));
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Gagal mengambil data carousel" });
    }
};

// ADD carousel
const addCarousel = async (req, res) => {
    try {
        const { judul } = req.body;
        const gambar = req.file ? req.file.buffer : null;

        if (!gambar) {
            return res.status(400).json({ message: "Gambar wajib diupload" });
        }

        if (!judul || judul.trim() === "") {
            return res.status(400).json({ message: "Judul tidak boleh kosong" });
        }

        await db.execute(
            "INSERT INTO carousel (judul, gambar, created_at) VALUES (?, ?, NOW())",
            [judul, gambar]
        );

        res.status(201).json({ message: "Gambar berhasil ditambahkan" });
    } catch (err) {
        console.error("❌ Gagal insert carousel:", err);
        res.status(500).json({ message: "Gagal menambahkan gambar carousel", error: err.message });
    }
};

// UPDATE carousel
const updateCarousel = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul } = req.body;
        const gambar = req.file ? req.file.buffer : null;

        let query = "UPDATE carousel SET judul=?";
        let values = [judul];

        if (gambar) {
            query += ", gambar=?";
            values.push(gambar);
        }

        query += " WHERE id=?";
        values.push(id);

        await db.execute(query, values);
        res.json({ message: "Data carousel diperbarui" });
    } catch (err) {
        res.status(500).json({ message: "Gagal memperbarui data" });
    }
};

// DELETE carousel
const deleteCarousel = async (req, res) => {
    try {
        const { id } = req.params;
        await db.execute("DELETE FROM carousel WHERE id = ?", [id]);
        res.json({ message: "Gambar berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ message: "Gagal menghapus gambar" });
    }
};

module.exports = {
    getAllCarousel,
    addCarousel,
    updateCarousel,
    deleteCarousel
};
