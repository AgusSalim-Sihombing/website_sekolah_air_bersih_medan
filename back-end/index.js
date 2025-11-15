
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
const smkRoutes = require("./src/routes/smk/smk_route")
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


app.use("/api/admin", adminRoute)
app.use("/api/admin-sma", adminSmaRoutes)
app.use("/api/public", publicRoutes)
app.use("/api/admin-unit", adminRoutes)
app.use("/api/smp", smpRoutes)
app.use("/api/smk", smkRoutes)

server.listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`)
})

