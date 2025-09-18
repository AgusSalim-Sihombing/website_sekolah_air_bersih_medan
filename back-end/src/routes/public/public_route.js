const express = require("express");
const router = express.Router();
const multer = require("multer");
const arsipController = require("../../controllers/arsip_controller");
const informasiController = require("../../controllers/informasi_pendaftaran");
const eventsController = require("../../controllers/event_controller");
const { verifyToken, checkSuperAdmin, allowUnit } = require("../../middleware/auth");
const guruTendikController = require("../../controllers/guru_tendik_controller");
const dataSiswaSma = require("../../controllers/sma/data_siswa_sma_controller");
const allSiswa = require("../../controllers/siswa_controller");
const waliKelas = require("../../controllers/wali_kelas_controller");
const statistik404 = require("../../controllers/statistik_404_controller");
// Konfigurasi multer untuk upload gambar (disimpan di memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ===== Arsip Tahun =====
router.get("/arsip-tahun", arsipController.getAllTahun);
router.get("/arsip-tahun/:id", arsipController.getTahunById);
router.post("/arsip-tahun", verifyToken, arsipController.createTahun);
router.put("/arsip-tahun/:id", verifyToken, arsipController.updateTahun);
router.delete("/arsip-tahun/:id", verifyToken, arsipController.deleteTahun);

// ===== Arsip Alumni =====
router.get("/arsip-alumni/:id_arsip_tahun", arsipController.getAlumniByTahun);
router.post("/arsip-alumni", verifyToken, arsipController.addAlumni);
router.put("/arsip-alumni/:id", verifyToken, arsipController.updateAlumni);
router.delete("/arsip-alumni/:id", verifyToken, arsipController.deleteAlumni);

// ===== Informasi Pendaftaran =====
// GET (Publik)
router.get("/informasi-pendaftaran", informasiController.getInformasiPendaftaran);

// POST, PUT, DELETE (Admin only)
router.post("/informasi-pendaftaran", verifyToken, upload.single("gambar"), informasiController.createInformasiPendaftaran);
router.put("/informasi-pendaftaran/:id", verifyToken, upload.single("gambar"), informasiController.updateInformasiPendaftaran);
router.delete("/informasi-pendaftaran/:id", verifyToken, informasiController.deleteInformasiPendaftaran);


//event


// Endpoint evenet publik
router.get('/events', eventsController.getAllEvents);
router.get('/events/:id', eventsController.getEventById);
router.get('/events/flyer/:id', eventsController.getEventFlyer);

router.post('/events', verifyToken, upload.single("flyer"), eventsController.createEvent);
router.put('/edit-events/:id', verifyToken, upload.single("flyer"), eventsController.updateEvent);
router.delete('/events/:id', verifyToken, eventsController.deleteEvent);


// Guru-tendik
router.get("/guru-tendik", guruTendikController.getAllGuruTendik);
router.get("/guru-tendik/:id", guruTendikController.getGuruTendikById);
router.get('/guru-tendik/foto/:id', guruTendikController.getFotoGuruTendik);
router.post("/guru-tendik", verifyToken, upload.single("foto"), guruTendikController.createGuruTendik);
router.put("/guru-tendik/:id", verifyToken, upload.single("foto"), guruTendikController.updateGuruTendik);
router.delete("/guru-tendik/:id", verifyToken, guruTendikController.deleteGuruTendik);

// Siswa 
router.get("/siswa", allSiswa.getAllSiswa);
router.post("/siswa", verifyToken, upload.single("file"), dataSiswaSma.uploadExcel)
router.delete("/siswa", verifyToken, dataSiswaSma.deletelAllDataSiswa)

//wali kelas
router.get("/wali-kelas", waliKelas.getAllWaliKelas);
router.post("/wali-kelas", verifyToken, checkSuperAdmin, waliKelas.tambahWaliKelas);
router.put("/wali-kelas/:id",verifyToken, checkSuperAdmin, waliKelas.editWaliKelas);
router.delete("/wali-kelas/:id", verifyToken, checkSuperAdmin, waliKelas.hapusWaliKelas);


//statistik 404 
router.post("/404", statistik404.catat404);
router.get("/404", statistik404.getStatistik404);
router.get("/404/total", statistik404.getTotalStatistik404);
router.get("/404/rekap", statistik404.getStatistikRekap404);
module.exports = router;
