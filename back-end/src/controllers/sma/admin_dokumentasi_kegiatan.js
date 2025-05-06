
const pool = require("../../database/database_connection");
const multer = require("multer");

// Konfigurasi Multer untuk menyimpan file ke dalam folder "uploads"
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/"); // Folder penyimpanan gambar
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname); // Nama unik untuk file
//     },
// });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ambil semua dokumentasi
const getAllDokumentasi = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM dokumentasi_kegiatan");

        // Konversi buffer gambar ke base64
        const dokumentasi = rows.map(row => ({
            id: row.id,
            nama_kegiatan: row.nama_kegiatan,
            tanggal_kegiatan: row.tanggal_kegiatan,
            gambar: row.gambar ? `data:image/jpeg;base64,${row.gambar.toString("base64")}` : null
        }));

        res.json(dokumentasi);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tambah dokumentasi baru
const addDokumentasi = async (req, res) => {
    try {
        const { nama_kegiatan, tanggal_kegiatan } = req.body;
        const gambar = req.file ? req.file.buffer : null; // Simpan sebagai buffer (BLOB)

        if (!nama_kegiatan || !tanggal_kegiatan || !gambar) {
            return res.status(400).json({ error: "Semua data harus diisi!" });
        }

        await pool.execute(
            "INSERT INTO dokumentasi_kegiatan (nama_kegiatan, gambar, tanggal_kegiatan) VALUES (?, ?, ?)",
            [nama_kegiatan, gambar, tanggal_kegiatan]
        );

        res.status(201).json({ message: "Dokumentasi berhasil ditambahkan!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update dokumentasi (termasuk gambar)
const updateDokumentasi = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_kegiatan, tanggal_kegiatan } = req.body;
        const gambarBaru = req.file ? req.file.buffer : null; // Cek apakah ada gambar baru

        // Ambil gambar lama jika tidak ada gambar baru
        const [rows] = await pool.execute("SELECT gambar FROM dokumentasi_kegiatan WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Dokumentasi tidak ditemukan!" });
        }

        const gambarLama = rows[0].gambar; // Ambil gambar lama dari database
        const gambarFinal = gambarBaru || gambarLama; // Gunakan gambar baru jika ada, jika tidak tetap pakai gambar lama

        await pool.execute(
            "UPDATE dokumentasi_kegiatan SET nama_kegiatan = ?, gambar = ?, tanggal_kegiatan = ? WHERE id = ?",
            [nama_kegiatan, gambarFinal, tanggal_kegiatan, id]
        );

        res.status(200).json({ message: "Dokumentasi berhasil diperbarui!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Hapus dokumentasi
const deleteDokumentasi = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.execute("DELETE FROM dokumentasi_kegiatan WHERE id = ?", [id]);
        res.status(200).json({ message: "Dokumentasi berhasil dihapus!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllDokumentasi,
    addDokumentasi: [upload.single("gambar"), addDokumentasi],
    updateDokumentasi,
    deleteDokumentasi,
    upload,
};

