const pool = require("../../database/database_connection");
const xlsx = require("xlsx");

const uploadExcel = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "File is required" });
    }

    try {
        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        for (const row of data) {
            await pool.execute(
                "INSERT INTO siswa (no_induk_siswa, nama, kelas) VALUES (?, ?, ?)",
                [row["no_induk_siswa"], row["nama"], row["kelas"]]
            );
        }

        res.status(201).json({ message: "File uploaded and data inserted successfully" });
    } catch (error) {
        console.error("Error processing Excel file:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getExcelData = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM siswa");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching Excel data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteExcelData = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.execute("DELETE FROM siswa WHERE id = ?", [id]);
        res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { uploadExcel, getExcelData, deleteExcelData };