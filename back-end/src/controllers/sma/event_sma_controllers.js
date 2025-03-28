const pool = require("../../database/database_connection"); // Pastikan koneksi database tersedia
const multer = require("multer");

// Konfigurasi Multer untuk upload file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Ambil semua event
const getAllEvents = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM event_sma");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data", error: error.message });
    }
};


// Ambil satu event berdasarkan ID
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute("SELECT * FROM event_sma WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data", error: error.message });
    }
};

// Ambil Flyer berdasarkan id
const getFlyerById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute("SELECT flyer FROM event_sma WHERE id = ?", [id]);

        if (rows.length === 0 || !rows[0].flyer) {
            return res.status(404).json({ message: "Flyer tidak ditemukan" });
        }

        res.setHeader("Content-Type", "image/png"); // Sesuaikan dengan format gambar yang digunakan
        res.send(rows[0].flyer);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil flyer", error: error.message });
    }
};

// Tambah event baru
const addEvent = async (req, res) => {
    try {
        const { nama_event, deskripsi, tanggal, waktu, lokasi, penyelenggara, status } = req.body;
        const flyer = req.file ? req.file.buffer : null;

        const [result] = await pool.execute(
            "INSERT INTO event_sma (nama_event, deskripsi, tanggal, waktu, lokasi, penyelenggara, flyer, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [nama_event, deskripsi, tanggal, waktu, lokasi, penyelenggara, flyer, status]
        );

        res.status(201).json({ message: "Event berhasil ditambahkan", eventId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambahkan event :", error: error.message });
    }
};

// Update event
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_event, deskripsi, tanggal, waktu, lokasi, penyelenggara} = req.body;
        // const flyer = req.file ? req.file.buffer : null;

        const [result] = await pool.execute(
            "UPDATE event_sma SET nama_event = ?, deskripsi = ?, tanggal = ?, waktu = ?, lokasi = ?, penyelenggara = ? WHERE id = ?",
            [nama_event, deskripsi, tanggal, waktu, lokasi, penyelenggara,id] 
        );

        res.json({ message: "Event berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbarui event", error: error.message });
    }
};

//update status
const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await pool.execute("UPDATE event_sma SET status=? WHERE id=?", [status, id]);
        res.json({ message: "Status event berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbarui status event", error: error.message });
    }
};

const updateFlyerById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.file) {
            return res.status(400).json({ message: "File flyer diperlukan" });
        }
        const flyer = req.file.buffer;

        await pool.execute("UPDATE event_sma SET flyer = ? WHERE id = ?", [flyer, id]);

        res.json({ message: "Flyer berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbarui flyer", error: error.message });
    }
};

// Hapus event
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.execute("DELETE FROM event_sma WHERE id = ?", [id]);

        res.json({ message: "Event berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus event", error: error.message });
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    getFlyerById,
    // addEvent,
    addEvent: [upload.single("flyer"), addEvent],
    updateEvent,
    updateFlyerById,
    updateStatus,
    deleteEvent
};
