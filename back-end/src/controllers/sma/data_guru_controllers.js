const pool = require("../../database/database_connection");
const xlsx = require("xlsx");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//Untuk Guru
const uploadExcelGuru = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "File is required" });
    }

    try {
        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        for (const row of data) {
            await pool.execute(
                "INSERT INTO guru (data) VALUES (values data)",
                [row["data"], row["data"], row["data"]]
            );
        }

        res.status(201).json({ message: "File uploaded and data inserted successfully" });
    } catch (error) {
        console.error("Error processing Excel file:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getDataGuru = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM guru");

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

    } catch (error) {
        console.error("Error get data Guru:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getDataGuruById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.execute("SELECT * FROM guru WHERE id = ?", [id]);

        const data = rows.map(row => ({
            id: row.id,
            nama: row.nama,
            email: row.email,
            no_hp: row.no_hp,
            alamat: row.alamat,
            mata_pelajaran: row.mata_pelajaran,
            foto: row.foto ? `data:image/jpeg;base64,${row.foto.toString("base64")}` : null
        }))
        if (data.length === 0) {
            return res.status(404).json({ message: "Pengumuman tidak ditemukan" });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error Get Data :", error })
    }
}

const addGuru = async (req, res) => {
    const { nama, email, no_hp, alamat, mata_pelajaran } = req.body;

    try {
        await pool.execute(
            "INSERT INTO guru (nama, email, no_hp, alamat, mata_pelajaran) VALUES (?,?,?,?,?)",
            [nama, email, no_hp, alamat, mata_pelajaran]
        )
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// const updateGuru = async (req, res) => {

//     try {
//         const { id } = req.params;
//         const { nama, email, no_hp, alamat, mata_pelajaran } = req.body;
//         const foto = req.file ? req.file.buffer : null;

//         //ambil gambar lama
//         const [rows] = await pool.execute("SELECT foto FROM guru WHERE id = ?", [id]);
//         if (rows.length === 0) {
//             return res.status(404).json({ error: "Dokumentasi tidak ditemukan!" });
//         }

//         const fotoLama = rows[0].foto; // Ambil gambar lama dari database
//         const fotoFinal = foto || fotoLama; // Gunakan gambar baru jika ada, jika tidak tetap pakai gambar lama

//         await pool.execute(
//             "UPDATE guru SET nama = ?, email = ?, no_hp = ?, alamat = ?, mata_pelajaran = ?, foto = ? WHERE id = ?",
//             [nama, email, no_hp, alamat, mata_pelajaran, fotoFinal, id]
//         );
//         return res.json({ message: "Data guru berhasil diperbarui" });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// };

// Perbaikan fungsi updateGuru
const updateGuru = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, email, no_hp, alamat, mata_pelajaran } = req.body;
        const foto = req.file ? req.file.buffer : null;

        // Ambil data lama
        const [rows] = await pool.execute("SELECT foto FROM guru WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Data guru tidak ditemukan!" });
        }

        const fotoLama = rows[0].foto;
        const fotoFinal = foto || fotoLama;

        await pool.execute(
            "UPDATE guru SET nama = ?, email = ?, no_hp = ?, alamat = ?, mata_pelajaran = ?, foto = ? WHERE id = ?",
            [nama, email, no_hp, alamat, mata_pelajaran, fotoFinal, id]
        );

        return res.status(200).json({ message: "Data guru berhasil diperbarui" });
    } catch (error) {
        console.error("Error updating guru:", error);
        return res.status(500).json({ error: "Gagal memperbarui data guru" });
    }
};

// Perbaikan fungsi deleteDataGuruById
const deleteDataGuruById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.execute("DELETE FROM guru WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        res.status(200).json({ message: "Data berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ message: "Gagal menghapus data" });
    }
};

const deleteAllDataGuru = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.execute("DELETE * FROM guru ");
        res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// const deleteDataGuruById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await pool.execute("DELETE FROM guru WHERE id = ?", [id]);
//         res.status(200).json({ message: "Data deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting data:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };


module.exports = {
    //untuk guru
    uploadExcelGuru,
    getDataGuru,
    getDataGuruById,
    addGuru,
    updateGuru,
    deleteAllDataGuru,
    deleteDataGuruById,
    upload
}


