const pool = require("../database/database_connection");

// Get all guru tendik (ringkasan data)
const getAllGuruTendik = async (req, res) => {
    try {
        // const [rows] = await pool.execute(
        //     "SELECT id, nama, tempat_lahir, tanggal_lahir, gender, jabatan, status, tmt, masa_kerja, mapel_dampu, jumlah_jam, ijazah, jurusan , tamat_tahun FROM guru_tendik ORDER BY nama"
        // );

        // res.json(rows);
        const [rows] = await pool.execute("SELECT * FROM guru_tendik ORDER BY nama");

        const data = rows.map(row => ({
            id: row.id,
            nama: row.nama,
            email: row.email,
            no_hp: row.no_hp,
            alamat: row.alamat,
            mata_pelajaran: row.mata_pelajaran,
            foto: row.foto ? `data:image/jpeg;base64,${row.foto.toString("base64")}` : null
        }))

        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Gagal mengambil data", error: err });
    }
};

const getFotoGuruTendik = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute("SELECT foto FROM guru_tendik WHERE id = ?", [id]);
        if (rows.length === 0 || !rows[0].foto) {
            return res.status(404).json({ message: "Foto tidak ditemukan" });
        }

        res.setHeader("Content-Type", "image/jpeg");
        res.send(rows[0].foto);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil foto", error });
    }
}

// Get detail by ID
const getGuruTendikById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute("SELECT * FROM guru_tendik WHERE id = ?", [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Data tidak ditemukan" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: "Gagal mengambil detail", error: err });
    }
};

// Create new guru tendik
const createGuruTendik = async (req, res) => {
    try {
        const {
            nama, tempat_lahir, tanggal_lahir, gender,
            jabatan, status, tmt, masa_kerja,
            mapel_dampu, jumlah_jam, ijazah, jurusan, tamat_tahun
        } = req.body;

        const foto = req.file ? req.file.buffer : null;

        await pool.execute(
            `INSERT INTO guru_tendik 
            (nama, tempat_lahir, tanggal_lahir, gender, jabatan, status, tmt, masa_kerja, mapel_dampu, jumlah_jam, ijazah, jurusan, tamat_tahun, foto)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nama, tempat_lahir, tanggal_lahir, gender, jabatan, status, tmt, masa_kerja, mapel_dampu, jumlah_jam, ijazah, jurusan, tamat_tahun, foto]
        );

        res.status(201).json({ message: "Data guru/tendik berhasil ditambahkan" });
    } catch (err) {
        res.status(500).json({ message: "Gagal menambah data", error: err });
    }
};

// Update guru tendik
const updateGuruTendik = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nama, tempat_lahir, tanggal_lahir, gender,
            jabatan, status, tmt, masa_kerja,
            mapel_dampu, jumlah_jam, ijazah, jurusan, tamat_tahun
        } = req.body;

        const foto = req.file ? req.file.buffer : null;

        if (foto) {
            await pool.execute(
                `UPDATE guru_tendik SET nama=?, tempat_lahir=?, tanggal_lahir=?, gender=?, jabatan=?, status=?, tmt=?, masa_kerja=?, mapel_dampu=?, jumlah_jam=?, ijazah=?, jurusan=?, tamat_tahun=?, foto=?
                WHERE id = ?`,
                [nama, tempat_lahir, tanggal_lahir, gender, jabatan, status, tmt, masa_kerja, mapel_dampu, jumlah_jam, ijazah, jurusan, tamat_tahun, foto, id]
            );
        } else {
            await pool.execute(
                `UPDATE guru_tendik SET nama=?, tempat_lahir=?, tanggal_lahir=?, gender=?, jabatan=?, status=?, tmt=?, masa_kerja=?, mapel_dampu=?, jumlah_jam=?, ijazah=?, jurusan=?, tamat_tahun=?
                WHERE id = ?`,
                [nama, tempat_lahir, tanggal_lahir, gender, jabatan, status, tmt, masa_kerja, mapel_dampu, jumlah_jam, ijazah, jurusan, tamat_tahun, id]
            );
        }

        res.json({ message: "Data berhasil diperbarui" });
    } catch (err) {
        res.status(500).json({ message: "Gagal memperbarui data", error: err });
    }
};

// Delete guru tendik
const deleteGuruTendik = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.execute("DELETE FROM guru_tendik WHERE id = ?", [id]);
        res.json({ message: "Data berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ message: "Gagal menghapus data", error: err });
    }
};

module.exports = {
    getAllGuruTendik,
    getGuruTendikById,
    getFotoGuruTendik,
    createGuruTendik,
    updateGuruTendik,
    deleteGuruTendik
};
