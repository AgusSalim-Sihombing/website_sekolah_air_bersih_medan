
// const fs = require('fs');
// const xlsx = require('xlsx');
// const adminRoutes = require("./routes/admin_route.js");


const express = require("express");
const socketIo = require("socket.io");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const adminRoute = require("./src/routes/admin_route");
const adminRoutes = require("./src/routes/admin_routes")
const adminSmaRoutes = require("./src/routes/sma/sma_route")
const publicRoutes = require("./src/routes/public/public_route")
const smpRoutes = require("./src/routes/smp/smp_route")
const http = require("http");
const db = require("./src/database/database_connection")
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors({
//     origin: "http://localhost:3006",
// }))

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3006",
        methods: ["GET", "POST", "PUT"]
    }
});

//Total Siswa Tahunan
let lastDataTotalSiswaTahunan = [];
let lastDataTotalSiswaSmaBulanan = [];

setInterval(async () => {
    try {
        const [rows] = await db.query("SELECT * FROM total_siswa_tahunan");

        if (JSON.stringify(rows) !== JSON.stringify(lastDataTotalSiswaTahunan)) {
            lastDataTotalSiswaTahunan = rows;
            io.emit("updateData", rows); // Kirim data baru ke frontend
        }
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}, 1000); // Cek setiap 1 detik

setInterval(async () => {
    try {
        const [rows] = await db.query("SELECT * FROM total_siswa_sma_bulanan");

        if (JSON.stringify(rows) !== JSON.stringify(lastDataTotalSiswaTahunan)) {
            lastDataTotalSiswaSmaBulanan = rows;
            io.emit("updateDataSma", rows); // Kirim data baru ke frontend
        }
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}, 2000); // Cek setiap 2 detik



// WebSocket Connection
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

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

app.use("/api/admin", adminRoute)
app.use("/api/admin-sma", adminSmaRoutes)
app.use("/api/public", publicRoutes)
app.use("/api/admin-unit", adminRoutes)
app.use("/api/smp", smpRoutes)

server.listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`)
})

