const pool = require("../../database/database_connection");
const xlsx = require("xlsx");
const moment = require("moment");

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

            // Cek apakah tanggal dalam format angka (Excel serial date)
            if (!isNaN(tanggalLahir)) {
                const parsedDate = xlsx.SSF.parse_date_code(tanggalLahir);
                tanggalLahir = moment(`${parsedDate.y}-${parsedDate.m}-${parsedDate.d}`).format("YYYY-MM-DD");
            } else {
                // Format ulang jika bukan angka
                tanggalLahir = moment(new Date(tanggalLahir)).format("YYYY-MM-DD");
            }

            await pool.execute(
                "INSERT INTO siswa_sma (nama, nis, jenis_kelamin, kelas, tanggal_lahir, alamat) VALUES (?,?,?,?,?,?)",
                [row["nama"], row["nis"], row["jenis_kelamin"], row["kelas"], tanggalLahir, row["alamat"]]
            );
        }

        res.status(201).json({ message: "File uploaded and data inserted successfully" });
    } catch (error) {
        console.error("Error processing Excel file:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getDataSiswaSma = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM siswa_sma"
        );
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


const getDataSiswaByKelas = async (req, res) => {
    const { kelas } = req.params; // Ambil kelas dari URL parameter
    const allowedKelas = ["X_1", "X_2", "XI_IPA", "XI_IPS", "XII_IPA", "XII_IPS"];

    if (!allowedKelas.includes(kelas)) {
        return res.status(400).json({ error: "Kelas tidak valid" });
    }

    try {
        const [rows] = await pool.execute(
            "SELECT * FROM siswa_sma WHERE kelas = ?", [kelas]
        );
        return res.json(rows); // Kirim hasil query ke frontend
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// CREATE: Tambah data siswa baru berdasarkan kelas
const tambahSiswa = async (req, res) => {
    const { nama, kelas, jenis_kelamin, usia } = req.body;

    try {
        await pool.execute(
            "INSERT INTO siswa_sma (nama, kelas, jenis_kelamin, usia) VALUES (?, ?, ?, ?)",
            [nama, kelas, jenis_kelamin, usia]
        );
        return res.status(201).json({ message: "Siswa berhasil ditambahkan" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// UPDATE: Edit data siswa berdasarkan ID
const updateSiswa = async (req, res) => {
    const { id } = req.params;
    const { nama, nis, jenis_kelamin, kelas, tanggal_lahir, alamat } = req.body;

    try {
        await pool.execute(
            "UPDATE siswa_sma SET nama = ?, nis = ?, jenis_kelamin = ?, kelas = ?, tanggal_lahir = ?, alamat = ? WHERE id = ?",
            [nama, nis, jenis_kelamin, kelas, tanggal_lahir, alamat, id]
        );
        return res.json({ message: "Data siswa berhasil diperbarui" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// DELETE: Hapus data siswa berdasarkan ID
const hapusSiswa = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.execute("DELETE FROM siswa_sma WHERE id = ?", [id]);
        return res.json({ message: "Siswa berhasil dihapus" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deletelAllData = async (req, res) => {
    try {
        await pool.execute("TRUNCATE siswa_sma");
        res.status(200).json({ message: "All Data deleted successfully" });
    } catch (error) {
        console.error("Error deleting all data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    uploadExcel,
    getDataSiswaSma,
    getDataSiswaByKelas,
    tambahSiswa,
    updateSiswa,
    hapusSiswa,
    deletelAllData
};
