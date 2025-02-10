
// const fs = require('fs');
// const xlsx = require('xlsx');
// const adminRoutes = require("./routes/admin_route.js");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const adminRoutes = require("./src/routes/admin_route");
const PORT = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:3006",
}))

// //akses data
// const path_data = "./data/data.json";
// const readData = () => {
//     const data = fs.readFileSync(path_data);
//     return JSON.parse(data);
// }

// // Fungsi untuk menulis data ke file JSON
// const writeDataToFile = (data) => {
//     fs.writeFileSync(path_data, JSON.stringify(data, null, 2));
// };

// // Create (POST)
// app.post('/items', (req, res) => {
//     const newItem = req.body;
//     const data = readData();
//     newItem.id = data.length + 1; // Menambahkan ID baru
//     data.push(newItem);
//     writeDataToFile(data);
//     res.status(201).json(newItem);
// });

// app.get("/items", (req, res) => {
//     const data = readData();
//     res.json(data);
// });

// //data excel
// const pathDataSiswa = ("./data/data_siswa.xlsx")

// //read data excel
// const readDataExcel = () => {
//     const workbook = xlsx.readFile(pathDataSiswa);
//     const sheetName = workbook.SheetNames[2];
//     const sheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(sheet);
//     return data;
// }

// // Fungsi untuk menulis data ke file Excel
// const writeDataToExcel = (data) => {
//     const worksheet = xlsx.utils.json_to_sheet(data);
//     const workbook = xlsx.utils.book_new();
//     xlsx.utils.book_append_sheet(workbook, worksheet, 'Students');
//     xlsx.writeFile(workbook, filePath);
// };

app.use('/api/admin', adminRoutes)

app.listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`)
})

