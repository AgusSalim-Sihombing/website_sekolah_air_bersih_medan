// controllers/siswaAdminSmaController.js
const pool = require("../../database/database_connection");
const xlsx = require("xlsx");
const moment = require("moment");

// Get semua siswa SMA
const getAllSiswa = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM siswa WHERE unit_sekolah = 'SMA' ORDER BY nama");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Gagal mengambil data", error: err });
    }
};


const getDataSiswaByKelas = async (req, res) => {
    const { kelas } = req.params; // Ambil kelas dari URL parameter
    const allowedKelas = ["X_1", "X_2", "XI_IPA", "XII_IPA", "XII_IPS", "XI_TKJ", "X_TKJ", "XII", "VII", "VIII_A", "VIII_B", "IX_A", "IX_B"];

    if (!allowedKelas.includes(kelas)) {
        return res.status(400).json({ error: "Kelas tidak valid" });
    }

    try {
        const [rows] = await pool.execute(
            "SELECT * FROM siswa WHERE kelas = ?", [kelas]
        );
        return res.json(rows); // 
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// upload Excel
const uploadExcel = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "File is required" });
    }

    try {
        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { raw: false });

        for (const row of data) {
            let tanggalLahir = row["tanggal_lahir"];

            // Cek apakah tanggal berupa angka serial Excel
            if (!isNaN(tanggalLahir)) {
                const parsedDate = xlsx.SSF.parse_date_code(tanggalLahir);
                tanggalLahir = moment(`${parsedDate.y}-${parsedDate.m}-${parsedDate.d}`).format("YYYY-MM-DD");
            } else {
                tanggalLahir = moment(new Date(tanggalLahir)).format("YYYY-MM-DD");
            }

            // Helper function untuk cek null
            const safeValue = (val) => {
                if (val === undefined || val === "" || val === null) return null;
                return val.toString().trim();
            };

            await pool.execute(
                `INSERT INTO siswa 
                (nama, jk, nis, nisn, tempat_lahir, tanggal_lahir, nik, agama, alamat, kelurahan, kecamatan, kode_pos, jenis_tinggal, alat_transportasi, hp, nama_ayah, nama_ibu, kelas, unit_sekolah)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    safeValue(row["nama"]),
                    safeValue(row["jk"]),
                    safeValue(row["nis"]),
                    safeValue(row["nisn"]),
                    safeValue(row["tempat_lahir"]),
                    tanggalLahir || null,
                    safeValue(row["nik"]),
                    safeValue(row["agama"]),
                    safeValue(row["alamat"]),
                    safeValue(row["kelurahan"]),
                    safeValue(row["kecamatan"]),
                    safeValue(row["kode_pos"]),
                    safeValue(row["jenis_tinggal"]),
                    safeValue(row["alat_transportasi"]),
                    safeValue(row["hp"]),
                    safeValue(row["nama_ayah"]),
                    safeValue(row["nama_ibu"]),
                    safeValue(row["kelas"]),
                    safeValue(row["unit_sekolah"])
                ]
            );
        }

        res.status(201).json({ message: "File uploaded and data inserted successfully" });
    } catch (error) {
        console.error("Error processing Excel file:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Tambah siswa SMA
const createSiswa = async (req, res) => {
    try {
        const {
            nama, jk, nisn, tempat_lahir, tanggal_lahir,
            nik, agama, alamat, nama_ayah, nama_ibu, kelas
        } = req.body;

        await pool.execute(
            `INSERT INTO siswa (nama, jk, nisn, tempat_lahir, tanggal_lahir, nik, agama, alamat, nama_ayah, nama_ibu, kelas, unit_sekolah)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'SMA')`,
            [nama, jk, nisn, tempat_lahir, tanggal_lahir, nik, agama, alamat, nama_ayah, nama_ibu, kelas]
        );

        res.status(201).json({ message: "Data siswa berhasil ditambahkan" });
    } catch (err) {
        res.status(500).json({ message: "Gagal menambah data", error: err });
    }
};

// Update siswa SMA
const updateSiswa = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nama, jk, nisn, tempat_lahir, tanggal_lahir,
            nik, agama, alamat, nama_ayah, nama_ibu, kelas
        } = req.body;

        await pool.execute(
            `UPDATE siswa SET nama=?, jk=?, nisn=?, tempat_lahir=?, tanggal_lahir=?, nik=?, agama=?, alamat=?, nama_ayah=?, nama_ibu=?, kelas=?
            WHERE id = ? AND unit_sekolah = 'SMA'`,
            [nama, jk, nisn, tempat_lahir, tanggal_lahir, nik, agama, alamat, nama_ayah, nama_ibu, kelas, id]
        );

        res.json({ message: "Data siswa berhasil diperbarui" });
    } catch (err) {
        res.status(500).json({ message: "Gagal memperbarui data", error: err });
    }
};

// Hapus siswa SMA
const deleteSiswa = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.execute("DELETE FROM siswa WHERE id = ? AND unit_sekolah = 'SMA'", [id]);
        res.json({ message: "Data siswa berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ message: "Gagal menghapus data", error: err });
    }
};

const deletelAllDataSiswa = async (req, res) => {
    try {
        await pool.execute("TRUNCATE siswa");
        res.status(200).json({ message: "All Data deleted successfully" });
    } catch (error) {
        console.error("Error deleting all data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllSiswa,
    getDataSiswaByKelas,
    uploadExcel,
    createSiswa,
    updateSiswa,
    deleteSiswa,
    deletelAllDataSiswa
};
