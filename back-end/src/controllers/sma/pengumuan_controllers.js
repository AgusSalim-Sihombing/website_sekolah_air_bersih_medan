const pool = require("../../database/database_connection");

// Get all announcements (only published)
const getAllPengumuman = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM pengumuman_sma WHERE status = 'published' ORDER BY tanggal DESC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pengumuman", error });
    }
};

// Get all announcements (for admin, including drafts)
const getAllPengumumanAdmin = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM pengumuman_sma ORDER BY tanggal DESC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pengumuman", error });
    }
};

// Get a single announcement by ID
const getPengumumanById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM pengumuman_sma WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Pengumuman tidak ditemukan" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pengumuman", error });
    }
};

// Add Pengumuman
const addPengumuman = async (req, res) => {
    const { judul, isi, status, tanggal } = req.body;
    try {
        const finalTanggal = tanggal ? new Date(tanggal) : null;
        await pool.query(
            "INSERT INTO pengumuman_sma (judul, isi, status, tanggal) VALUES (?, ?, ?, ?)",
            [judul, isi, status, finalTanggal]
        );
        res.status(201).json({ message: "Pengumuman berhasil ditambahkan" });
    } catch (error) {
        console.error("Error add pengumuman:", error); // penting untuk debug
        res.status(500).json({ message: "Error menambahkan pengumuman", error });
    }
};

// Update Pengumuman
const updatePengumuman = async (req, res) => {
    const { id } = req.params;
    const { judul, isi, status, tanggal } = req.body;
    try {
        const finalTanggal = tanggal ? new Date(tanggal) : null;
        await pool.query(
            "UPDATE pengumuman_sma SET judul = ?, isi = ?, status = ?, tanggal = ? WHERE id = ?",
            [judul, isi, status, finalTanggal, id]
        );
        res.json({ message: "Pengumuman berhasil diperbarui" });
    } catch (error) {
        console.error("Error update pengumuman:", error);
        res.status(500).json({ message: "Error updating pengumuman", error });
    }
};

// Delete an announcement
const deletePengumuman = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM pengumuman_sma WHERE id = ?", [id]);
        res.json({ message: "Pengumuman berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting pengumuman", error });
    }
};

module.exports = {
    getAllPengumuman,
    getAllPengumumanAdmin,
    getPengumumanById,
    addPengumuman,
    updatePengumuman,
    deletePengumuman
};
