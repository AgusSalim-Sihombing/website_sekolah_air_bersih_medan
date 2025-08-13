// controllers/sma/arsip_controller.js
const db = require("../database/database_connection");

// ===== Arsip Tahun =====
const getAllTahun = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM arsip_tahun ORDER BY tahun ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data tahun arsip" });
  }
};

const getTahunById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute("SELECT * FROM arsip_tahun WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Tahun arsip tidak ditemukan" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data tahun" });
  }
};

const createTahun = async (req, res) => {
  try {
    const { tahun, program_studi, kepala_sekolah } = req.body;
    await db.execute(
      "INSERT INTO arsip_tahun (tahun, program_studi, kepala_sekolah) VALUES (?, ?, ?)",
      [tahun, program_studi, kepala_sekolah]
    );
    res.status(201).json({ message: "Tahun arsip berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menambahkan tahun arsip" });
  }
};

const updateTahun = async (req, res) => {
  try {
    const { id } = req.params;
    const { tahun, program_studi, kepala_sekolah } = req.body;
    await db.execute(
      "UPDATE arsip_tahun SET tahun=?, program_studi=?, kepala_sekolah=? WHERE id=?",
      [tahun, program_studi, kepala_sekolah, id]
    );
    res.json({ message: "Tahun arsip berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ message: "Gagal memperbarui tahun arsip" });
  }
};

const deleteTahun = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM arsip_tahun WHERE id = ?", [id]);
    res.json({ message: "Tahun arsip berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus tahun arsip" });
  }
};

// ===== Arsip Alumni =====
const getAlumniByTahun = async (req, res) => {
  try {
    const { id_arsip_tahun } = req.params;
    const [rows] = await db.execute(
      "SELECT * FROM arsip_alumni WHERE id_arsip_tahun = ? ORDER BY nama ASC",
      [id_arsip_tahun]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data alumni" });
  }
};

const addAlumni = async (req, res) => {
  try {
    const { id_arsip_tahun, nama, status_keterangan } = req.body;
    await db.execute(
      "INSERT INTO arsip_alumni (id_arsip_tahun, nama, status_keterangan) VALUES (?, ?, ?)",
      [id_arsip_tahun, nama, status_keterangan]
    );
    res.status(201).json({ message: "Alumni berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menambahkan alumni" });
  }
};

const updateAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, status_keterangan } = req.body;
    await db.execute(
      "UPDATE arsip_alumni SET nama=?, status_keterangan=? WHERE id=?",
      [nama, status_keterangan, id]
    );
    res.json({ message: "Data alumni berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ message: "Gagal memperbarui data alumni" });
  }
};

const deleteAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM arsip_alumni WHERE id = ?", [id]);
    res.json({ message: "Alumni berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus alumni" });
  }
};

module.exports = {
  getAllTahun,
  getTahunById,
  createTahun,
  updateTahun,
  deleteTahun,
  getAlumniByTahun,
  addAlumni,
  updateAlumni,
  deleteAlumni,
};
