const db = require("../../database/database_connection");

// Get profile
const getProfileSma = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM profile_sekolah_sma LIMIT 1");

        if (rows.length > 0 && rows[0].gambar_denah) {
            rows[0].gambar_denah = Buffer.from(rows[0].gambar_denah).toString('base64');
        }

        res.json(rows[0] || {});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal mengambil data profil sekolah" });
    }
};

// Create profile
const createProfileSma = async (req, res) => {
    try {
        const {
            unit,
            kepala_sekolah,
            nama_sekolah,
            status_sekolah,
            status_kepemilikan,
            nss,
            alamat,
            kelurahan,
            kecamatan,
            kota,
            provinsi,
            bentuk_pendidikan,
            telepon,
            email,
            website
        } = req.body;

        const gambar_denah = req.file?.buffer || null;

        const [result] = await db.execute(
            `INSERT INTO profile_sekolah_sma 
            (unit, kepala_sekolah, nama_sekolah, status_sekolah, status_kepemilikan, nss, alamat,
            kelurahan, kecamatan, kota, provinsi, bentuk_pendidikan, telepon, email, website, gambar_denah)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                unit, kepala_sekolah, nama_sekolah, status_sekolah, status_kepemilikan, nss, alamat,
                kelurahan, kecamatan, kota, provinsi, bentuk_pendidikan, telepon, email, website, gambar_denah
            ]
        );

        res.status(201).json({ message: "Profil sekolah berhasil ditambahkan", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal menambahkan profil sekolah" });
    }
};

// Update profile
const updateProfileSma = async (req, res) => {
    try {
        const id = req.params.id;

        // Ambil data lama dari database
        const [oldRows] = await db.execute("SELECT * FROM profile_sekolah_sma WHERE id = ?", [id]);
        if (oldRows.length === 0) {
            return res.status(404).json({ message: "Profil tidak ditemukan" });
        }
        const oldData = oldRows[0];

        // Ambil data baru dari req.body
        const newData = {
            unit: req.body.unit ?? oldData.unit,
            kepala_sekolah: req.body.kepala_sekolah ?? oldData.kepala_sekolah,
            nama_sekolah: req.body.nama_sekolah ?? oldData.nama_sekolah,
            status_sekolah: req.body.status_sekolah ?? oldData.status_sekolah,
            status_kepemilikan: req.body.status_kepemilikan ?? oldData.status_kepemilikan,
            nss: req.body.nss ?? oldData.nss,
            alamat: req.body.alamat ?? oldData.alamat,
            kelurahan: req.body.kelurahan ?? oldData.kelurahan,
            kecamatan: req.body.kecamatan ?? oldData.kecamatan,
            kota: req.body.kota ?? oldData.kota,
            provinsi: req.body.provinsi ?? oldData.provinsi,
            bentuk_pendidikan: req.body.bentuk_pendidikan ?? oldData.bentuk_pendidikan,
            telepon: req.body.telepon ?? oldData.telepon,
            email: req.body.email ?? oldData.email,
            website: req.body.website ?? oldData.website,
            gambar_denah: req.file ? req.file.buffer : oldData.gambar_denah
        };

        // Update database
        await db.execute(`
            UPDATE profile_sekolah_sma 
            SET unit=?, kepala_sekolah=?, nama_sekolah=?, status_sekolah=?, status_kepemilikan=?, 
                nss=?, alamat=?, kelurahan=?, kecamatan=?, kota=?, provinsi=?, 
                bentuk_pendidikan=?, telepon=?, email=?, website=?, gambar_denah=?
            WHERE id=?
        `, [
            newData.unit,
            newData.kepala_sekolah,
            newData.nama_sekolah,
            newData.status_sekolah,
            newData.status_kepemilikan,
            newData.nss,
            newData.alamat,
            newData.kelurahan,
            newData.kecamatan,
            newData.kota,
            newData.provinsi,
            newData.bentuk_pendidikan,
            newData.telepon,
            newData.email,
            newData.website,
            newData.gambar_denah,
            id
        ]);

        res.status(200).json({ message: "Profil berhasil diperbarui" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan saat memperbarui profil" });
    }
};


// Delete profile
const deleteProfileSma = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute("DELETE FROM profile_sekolah_sma WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Profil tidak ditemukan" });
        }

        res.json({ message: "Profil berhasil dihapus" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal menghapus profil sekolah" });
    }
};

module.exports = {
    getProfileSma,
    createProfileSma,
    updateProfileSma,
    deleteProfileSma
};
