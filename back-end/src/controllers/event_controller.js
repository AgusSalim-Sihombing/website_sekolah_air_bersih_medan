const pool = require("../database/database_connection")

// Get semua event
const getAllEvents = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT id, nama_event, deskripsi, tanggal, waktu, lokasi, penyelenggara, status, created_at, updated_at
            FROM event
            ORDER BY tanggal DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil event", error });
    }
};

// Get detail event by ID
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute("SELECT * FROM event WHERE id = ?", [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Event tidak ditemukan" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil detail event", error });
    }
};

// Get flyer event
const getEventFlyer = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute("SELECT flyer FROM event WHERE id = ?", [id]);
        if (rows.length === 0 || !rows[0].flyer) {
            return res.status(404).json({ message: "Flyer tidak ditemukan" });
        }
        
        res.setHeader("Content-Type", "image/jpeg");
        res.send(rows[0].flyer);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil flyer", error });
    }
};

// Tambah event
const createEvent = async (req, res) => {
    try {
        const { nama_event, deskripsi, tanggal, waktu, lokasi, penyelenggara, status } = req.body;
        const flyer = req.file ? req.file.buffer : null;

        if (!nama_event || !deskripsi || !tanggal || !status) {
            return res.status(400).json({ message: "Field wajib tidak lengkap" });
        }

        await pool.execute(`
            INSERT INTO event (nama_event, deskripsi, tanggal, waktu, lokasi, penyelenggara, status, flyer, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `, [nama_event, deskripsi, tanggal, waktu, lokasi, penyelenggara, status, flyer]);

        res.status(201).json({ message: "Event berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambahkan event", error });
    }
};

// Edit event
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_event, deskripsi, tanggal, waktu, lokasi, penyelenggara, status } = req.body;
        const flyer = req.file ? req.file.buffer : null;

        const fields = [nama_event, deskripsi, tanggal, waktu, lokasi, penyelenggara, status, id];
        let query = `
            UPDATE event
            SET nama_event = ?, deskripsi = ?, tanggal = ?, waktu = ?, lokasi = ?, penyelenggara = ?, status = ?, updated_at = NOW()
            WHERE id = ?
        `;

        if (flyer) {
            query = `
                UPDATE event
                SET nama_event = ?, deskripsi = ?, tanggal = ?, waktu = ?, lokasi = ?, penyelenggara = ?, status = ?, flyer = ?, updated_at = NOW()
                WHERE id = ?
            `;
            fields.splice(7, 0, flyer); // sisipkan flyer sebelum id
        }

        await pool.execute(query, fields);
        res.json({ message: "Event berhasil diupdate" });
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate event", error });
    }
};

// Hapus event
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.execute("DELETE FROM event WHERE id = ?", [id]);
        res.json({ message: "Event berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus event", error });
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    getEventFlyer,
    createEvent,
    updateEvent,
    deleteEvent
};
