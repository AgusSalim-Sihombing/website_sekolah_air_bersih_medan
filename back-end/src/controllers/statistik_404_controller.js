// File: statistik_404_controller.js
const pool = require("../database/database_connection");

// Mencatat statistik ketika halaman 404 diakses
const catat404 = async (req, res) => {
    const { url_yang_dicari } = req.body;

    if (!url_yang_dicari) {
        return res.status(400).json({ message: "URL yang dicari wajib diisi" });
    }

    try {
        await pool.execute(
            "INSERT INTO statistik_404 (url_yang_dicari) VALUES (?)",
            [url_yang_dicari]
        );

        res.status(201).json({ message: "Statistik 404 berhasil dicatat" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Mengambil semua data statistik 404 (untuk dashboard)
const getStatistik404 = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT id, url_yang_dicari, waktu FROM statistik_404 ORDER BY waktu DESC"
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Mengambil jumlah total statistik 404 (untuk visual ringkas)
const getTotalStatistik404 = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT COUNT(*) as total FROM statistik_404");
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Mengambil data rekap jumlah URL 404 terbanyak
const getStatistikRekap404 = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT url_yang_dicari, COUNT(*) as jumlah FROM statistik_404 GROUP BY url_yang_dicari ORDER BY jumlah DESC LIMIT 10"
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { catat404, getStatistik404, getTotalStatistik404, getStatistikRekap404 };
