const pool = require("../../database/database_connection");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Ambil semua Fasilitas
const getAllFasilitas = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM fasilitas");

        // Konversi buffer gambar ke base64
        const fasilitas = rows.map(row => ({
            id: row.id,
            nama_fasilitas: row.nama_fasilitas,
            deskripsi: row.deskripsi,
            gambar_fasilitas: row.gambar_fasilitas ? `data:image/jpeg;base64,${row.gambar_fasilitas.toString("base64")}` : null
        }));

        res.json(fasilitas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tambah fasilitas baru
const addFasilitas = async (req, res) => {
    try {
        const { nama_fasilitas, deskripsi} = req.body;
        const gambar_fasilitas = req.file ? req.file.buffer : null; // Simpan sebagai buffer (BLOB)

        if (!nama_fasilitas || !deskripsi || !gambar_fasilitas) {
            return res.status(400).json({ error: "Semua data harus diisi!" });
        }

        await pool.execute(
            "INSERT INTO fasilitas (nama_fasilitas, deskripsi, gambar_fasilitas) VALUES (?, ?, ?)",
            [nama_fasilitas, deskripsi, gambar_fasilitas]
        );

        res.status(201).json({ message: "Fasilitas berhasil ditambahkan!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update Fasilitas (termasuk gambar)
const updateFasilitas = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_fasilitas, deskripsi} = req.body;
        const gambarBaru = req.file ? req.file.buffer : null; // Cek apakah ada gambar baru

        // Ambil gambar lama jika tidak ada gambar baru
        const [rows] = await pool.execute("SELECT gambar_fasilitas FROM fasilitas WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Fasilitas tidak ditemukan!" });
        }

        const gambarLama = rows[0].gambar_fasilitas; // Ambil gambar lama dari database
        const gambarFinal = gambarBaru || gambarLama; // Gunakan gambar baru jika ada, jika tidak tetap pakai gambar lama

        await pool.execute(
            "UPDATE fasilitas SET nama_fasilitas = ?, deskripsi = ?, gambar_fasilitas = ? WHERE id = ?",
            [nama_fasilitas, deskripsi, gambarFinal, id]
        );

        res.status(200).json({ message: "Fasilitas berhasil diperbarui!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Hapus dokumentasi
const deleteFasilitas = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.execute("DELETE FROM fasilitas WHERE id = ?", [id]);
        res.status(200).json({ message: "Fasilitas berhasil dihapus!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllFasilitas,
    addFasilitas: [upload.single("gambar_fasilitas"), addFasilitas],
    updateFasilitas,
    deleteFasilitas,
    upload,
};