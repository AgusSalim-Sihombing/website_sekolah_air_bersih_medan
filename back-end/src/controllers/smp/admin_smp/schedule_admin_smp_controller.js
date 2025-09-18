const pool = require('../../../database/database_connection');

// Get all schedule
const getAllSchedule = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM schedule_admin_smp ORDER BY event_date");
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Gagal mengambil data schedule", error });
    }
};

// Get schedule by ID
const getScheduleById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute("SELECT * FROM schedule_admin_smp WHERE id = ?", [id]);
        return res.json(rows[0] || null);
    } catch (error) {
        return res.status(500).json({ message: "Failed", error });
    }
};

// Create new schedule
const createSchedule = async (req, res) => {
    try {
        const { title, description, event_date } = req.body;
        if (!title || !event_date) {
            return res.status(400).json({ message: "Title dan event_date wajib diisi" });
        }

        await pool.execute(
            "INSERT INTO schedule_admin_smp (title, description, event_date) VALUES (?, ?, ?)",
            [title, description, event_date]
        );
        return res.status(201).json({ message: "Schedule berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambahkan schedule", error });
    }
};

// Update schedule
const updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, event_date } = req.body;
        if (!title || !event_date) {
            return res.status(400).json({ message: "Title dan event_date wajib diisi" });
        }

        await pool.execute(
            "UPDATE schedule_admin_smp SET title = ?, description = ?, event_date = ? WHERE id = ?",
            [title, description, event_date, id]
        );
        return res.status(200).json({ message: "Schedule berhasil diupdate" });
    } catch (error) {
        return res.status(500).json({ message: "Schedule gagal diupdate", error });
    }
};

// Delete schedule
const deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.execute("DELETE FROM schedule_admin_smp WHERE id = ?", [id]);
        return res.status(200).json({ message: "Schedule berhasil dihapus" });
    } catch (error) {
        return res.status(500).json({ message: "Gagal menghapus schedule", error });
    }
};

module.exports = {
    getAllSchedule,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule
};
