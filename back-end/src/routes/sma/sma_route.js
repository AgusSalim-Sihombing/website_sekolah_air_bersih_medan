const express = require("express");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 10 * 1024 * 1024, // 10 mb
        fileSize: 10 * 1024 * 1024
    }
});

const adminSmaControllers = require("../../controllers/sma/admin_sma/admin_sma_controller")
const excelControllers = require("../../controllers/sma/excel_controllers");
const dataGuru = require("../../controllers/sma/data_guru_controllers");
const kepsekSmaControllers = require("../../controllers/sma/kata_sambutan_sma");
const carouselController = require("../../controllers/sma/carousel_sma_controller");
const eventSmaControllers = require("../../controllers/sma/event_sma_controllers");
const pengumumanSmaControllers = require("../../controllers/sma/pengumuan_controllers");
const totatalSiswaSmaBulanan = require("../../controllers/sma/total_siswa_sma_bulanan_controllers");
const dataSiswaSma = require("../../controllers/sma/data_siswa_sma_controllers")
const dokumentasiController = require("../../controllers/sma/admin_dokumentasi_kegiatan")
const FasilitasController = require("../../controllers/sma/fasilitas_controller")
const { verifyToken, checkSuperAdmin, allowUnit } = require("../../middleware/auth.js")
const profileController = require("../../controllers/sma/profil_sekolah_sma_controllers.js");
const scheduleAdminSma = require("../../controllers/sma/schedule_admin_controller.js")
const siswaAdminSmaController = require("../../controllers/sma/data_siswa_sma_controller.js");

const router = express.Router();

//admin
router.post("/login-admin-sma", adminSmaControllers.loginAdminSma);
router.get("/get-admin-sma", verifyToken, allowUnit("SMA"), adminSmaControllers.getAdminSma);
router.post("/add-admin-sma", verifyToken, checkSuperAdmin, allowUnit("SMA"), adminSmaControllers.addAdminSma);
router.put("/update-admin-sma/:id", verifyToken, checkSuperAdmin, allowUnit("SMA"), adminSmaControllers.updateAdminSma);
router.put("/toggle-status-admin-sma/:id", verifyToken, allowUnit("SMA"), adminSmaControllers.disableToggleStatusAdminSma);
router.delete("/delete-admin-sma/:id", verifyToken, checkSuperAdmin, allowUnit("SMA"), adminSmaControllers.deleteAdminSma);

//schedule_admin_sma
router.get('/schedule-admin-sma', verifyToken, allowUnit("SMA"), scheduleAdminSma.getAllSchedule);
router.get('/schedule-admin-sma/:id', verifyToken, allowUnit("SMA"), scheduleAdminSma.getScheduleById);
router.post('/schedule-admin-sma', verifyToken, allowUnit("SMA"), scheduleAdminSma.createSchedule);
router.put('/schedule-admin-sma/:id', verifyToken, checkSuperAdmin, allowUnit("SMA"), scheduleAdminSma.updateSchedule);
router.delete('/schedule-admin-sma/:id', verifyToken, checkSuperAdmin, allowUnit("SMA"), scheduleAdminSma.deleteSchedule);

//data-excel-siswa
router.post("/upload-excel", verifyToken, upload.single("file"), excelControllers.uploadExcel);
router.get("/get-excel-data", verifyToken, excelControllers.getExcelData);
router.put("/update-data-siswa-sma/:id", verifyToken, excelControllers.updateDataSiswaSma)
router.delete("/delete-excel-data/:id", verifyToken, excelControllers.deleteExcelData);


//data-guru
// router.post("/upload-excel-guru", upload.single("file"), dataGuru.uploadExcelGuru);
// router.get("/get-data-guru", dataGuru.getDataGuru);
// router.get("/get-data-guru/:id", dataGuru.getDataGuruById)
// router.post("data-guru",  dataGuru.addGuru)
// router.put("/data-guru/:id", dataGuru.upload.single("foto"), dataGuru.updateGuru)
// router.delete("/delete-all-guru",  dataGuru.deleteAllDataGuru);
// router.delete("/delete-data-guru/:id", dataGuru.deleteDataGuruById);

router.post("/upload-excel-guru", verifyToken, allowUnit("SMA"), upload.single("file"), dataGuru.uploadExcelGuru);
router.get("/get-data-guru", dataGuru.getDataGuru);
router.get("/get-data-guru/:id", dataGuru.getDataGuruById);
router.post("/data-guru", verifyToken, allowUnit("SMA"), dataGuru.addGuru);
router.put("/data-guru/:id", verifyToken, allowUnit("SMA"), dataGuru.upload.single("foto"), dataGuru.updateGuru);
router.delete("/delete-all-guru", verifyToken, allowUnit("SMA"), dataGuru.deleteAllDataGuru);
router.delete("/delete-data-guru/:id", verifyToken, allowUnit("SMA"), dataGuru.deleteDataGuruById);


// // Carousel-sma
// router.get("/carousel-sma", carouselController.getAllCarousel);
// router.post("/carousel-sma", upload.single("gambar"), carouselController.addCarousel);
// router.put("/carousel-sma/:id", upload.single("gambar"), carouselController.updateCarousel);
// router.delete("/carousel-sma/:id", carouselController.deleteCarousel);

// //Sambutan kepala sekolah
// router.get("/get-kata-sambutan-sma", kepsekSmaControllers.getKataSambutan);
// router.post("/kata-sambutan-sma", upload.single("foto_kepala"), kepsekSmaControllers.createKataSambutan);
// router.put("/kata-sambutan-sma/:id", upload.single("foto_kepala"), kepsekSmaControllers.updateKataSambutan);
// router.delete("/kata-sambutan-sma/:id", kepsekSmaControllers.deleteKataSambutan);

// //Profil Sekolah Sma
// router.get("/profil-sma", profileController.getProfileSma);
// router.post("/profil-sma", upload.single("gambar_denah"), profileController.createProfileSma);
// router.put("/profil-sma/:id", upload.single("gambar_denah"), profileController.updateProfileSma);
// router.delete("/profil-sma/:id", profileController.deleteProfileSma);

// //event-sma
// router.get("/events-sma", eventSmaControllers.getAllEvents)
// router.get("/events-sma/:id", eventSmaControllers.getEventById);
// router.get("/events-sma/flyer/:id", eventSmaControllers.getFlyerById);
// router.put("/events-sma/:id", eventSmaControllers.updateEvent);
// router.put("/events-sma/:id/status", eventSmaControllers.updateStatus)
// router.put("/events-sma/:id/flyer", upload.single("flyer"), eventSmaControllers.updateFlyerById);
// router.post("/events-sma", eventSmaControllers.addEvent);
// router.delete("/events-sma/:id", eventSmaControllers.deleteEvent);

// //Dokumentasi Kegiatan
// router.get("/dokumentasi", dokumentasiController.getAllDokumentasi);
// router.post("/dokumentasi", dokumentasiController.addDokumentasi);
// router.put("/dokumentasi/:id", dokumentasiController.upload.single("gambar"), dokumentasiController.updateDokumentasi);
// router.delete("/dokumentasi/:id", dokumentasiController.deleteDokumentasi);

// //Fasilitas
// router.get("/fasilitas", FasilitasController.getAllFasilitas);
// router.post("/fasilitas", FasilitasController.addFasilitas);
// router.put("fasilitas/:id", FasilitasController.upload.single("gambar_fasilitas"), FasilitasController.updateFasilitas);
// router.delete("/fasilitas/:id", FasilitasController.deleteFasilitas);


// // Routes for announcements
// router.get("/pengumuman-sma", pengumumanSmaControllers.getAllPengumuman);
// router.get("/pengumuman-sma-admin", pengumumanSmaControllers.getAllPengumumanAdmin);
// router.get("/pengumuman-sma/:id", pengumumanSmaControllers.getPengumumanById);
// router.post("/pengumuman-sma", pengumumanSmaControllers.addPengumuman);
// router.put("/pengumuman-sma/:id", pengumumanSmaControllers.updatePengumuman);
// router.delete("/pengumuman-sma/:id", pengumumanSmaControllers.deletePengumuman);

// //Routes 
// router.get("/total-sma-bulanan", totatalSiswaSmaBulanan.getTotalSiswaBulanan);


// //Data Siswa Kelas X
// router.post("/upload-excel-sma", upload.single("file"), dataSiswaSma.uploadExcel);
// router.get("/get-siswa-sma", dataSiswaSma.getDataSiswaSma);
// router.get("/siswa-sma/:kelas", dataSiswaSma.getDataSiswaByKelas);
// router.post('/siswa-sma', dataSiswaSma.tambahSiswa);
// router.put('/siswa-sma/:id', dataSiswaSma.updateSiswa);
// router.delete('/siswa-sma/:id', dataSiswaSma.hapusSiswa);
// router.delete("/delete-all-data-siswa", dataSiswaSma.deletelAllData);

// //data siswa
// router.get("/admin-siswa-sma", verifyToken, siswaAdminSmaController.getAllSiswa);
// router.get("/admin-siswa-sma/:kelas", verifyToken, siswaAdminSmaController.getDataSiswaByKelas);
// router.post("/admin-siswa-sma", verifyToken, siswaAdminSmaController.createSiswa);
// router.put("/admin-siswa-sma/:id", verifyToken, siswaAdminSmaController.updateSiswa);
// router.delete("/admin-siswa-sma/:id", verifyToken, siswaAdminSmaController.deleteSiswa);

// === Carousel SMA ===
router.get("/carousel-sma", carouselController.getAllCarousel);
router.post("/carousel-sma", verifyToken, allowUnit("SMA"), upload.single("gambar"), carouselController.addCarousel);
router.put("/carousel-sma/:id", verifyToken, allowUnit("SMA"), upload.single("gambar"), carouselController.updateCarousel);
router.delete("/carousel-sma/:id", verifyToken, allowUnit("SMA"), carouselController.deleteCarousel);

// === Sambutan Kepala Sekolah ===
router.get("/get-kata-sambutan-sma", kepsekSmaControllers.getKataSambutan);
router.post("/kata-sambutan-sma", verifyToken, allowUnit("SMA"), upload.single("foto_kepala"), kepsekSmaControllers.createKataSambutan);
router.put("/kata-sambutan-sma/:id", verifyToken, allowUnit("SMA"), upload.single("foto_kepala"), kepsekSmaControllers.updateKataSambutan);
router.delete("/kata-sambutan-sma/:id", verifyToken, allowUnit("SMA"), kepsekSmaControllers.deleteKataSambutan);

// === Profil Sekolah SMA ===
router.get("/profil-sma", profileController.getProfileSma);
router.post("/profil-sma", verifyToken, allowUnit("SMA"), upload.single("gambar_denah"), profileController.createProfileSma);
router.put("/profil-sma/:id", verifyToken, allowUnit("SMA"), upload.single("gambar_denah"), profileController.updateProfileSma);
router.delete("/profil-sma/:id", verifyToken, allowUnit("SMA"), profileController.deleteProfileSma);

// === Event Sekolah ===
router.get("/events-sma", eventSmaControllers.getAllEvents);
router.get("/events-sma/:id", eventSmaControllers.getEventById);
router.get("/events-sma/flyer/:id", eventSmaControllers.getFlyerById);
router.post("/events-sma", verifyToken, allowUnit("SMA"), eventSmaControllers.addEvent);
router.put("/events-sma/:id", verifyToken, allowUnit("SMA"), eventSmaControllers.updateEvent);
router.put("/events-sma/:id/status", verifyToken, allowUnit("SMA"), eventSmaControllers.updateStatus);
router.put("/events-sma/:id/flyer", verifyToken, allowUnit("SMA"), upload.single("flyer"), eventSmaControllers.updateFlyerById);
router.delete("/events-sma/:id", verifyToken, allowUnit("SMA"), eventSmaControllers.deleteEvent);

// === Dokumentasi Kegiatan ===
router.get("/dokumentasi", dokumentasiController.getAllDokumentasi);
router.post("/dokumentasi", verifyToken, allowUnit("SMA"), dokumentasiController.addDokumentasi);
router.put("/dokumentasi/:id", verifyToken, allowUnit("SMA"), dokumentasiController.upload.single("gambar"), dokumentasiController.updateDokumentasi);
router.delete("/dokumentasi/:id", verifyToken, allowUnit("SMA"), dokumentasiController.deleteDokumentasi);

// === Fasilitas Sekolah ===
router.get("/fasilitas", FasilitasController.getAllFasilitas);
router.post("/fasilitas", verifyToken, allowUnit("SMA"), FasilitasController.addFasilitas);
router.put("/fasilitas/:id", verifyToken, allowUnit("SMA"), FasilitasController.upload.single("gambar_fasilitas"), FasilitasController.updateFasilitas);
router.delete("/fasilitas/:id", verifyToken, allowUnit("SMA"), FasilitasController.deleteFasilitas);

// === Pengumuman ===
router.get("/pengumuman-sma", pengumumanSmaControllers.getAllPengumuman);
router.get("/pengumuman-sma-admin", verifyToken, allowUnit("SMA"), pengumumanSmaControllers.getAllPengumumanAdmin);
router.get("/pengumuman-sma/:id", pengumumanSmaControllers.getPengumumanById);
router.post("/pengumuman-sma", verifyToken, allowUnit("SMA"), pengumumanSmaControllers.addPengumuman);
router.put("/pengumuman-sma/:id", verifyToken, allowUnit("SMA"), pengumumanSmaControllers.updatePengumuman);
router.delete("/pengumuman-sma/:id", verifyToken, allowUnit("SMA"), pengumumanSmaControllers.deletePengumuman);

// === Statistik Total Siswa Bulanan ===
router.get("/total-sma-bulanan", totatalSiswaSmaBulanan.getTotalSiswaBulanan);

// === Data Siswa Publik ===
router.post("/upload-excel-sma", verifyToken, allowUnit("SMA"), upload.single("file"), dataSiswaSma.uploadExcel);
router.get("/get-siswa-sma", dataSiswaSma.getDataSiswaSma);
router.get("/siswa-sma/:kelas", dataSiswaSma.getDataSiswaByKelas);
router.post('/siswa-sma', verifyToken, allowUnit("SMA"), dataSiswaSma.tambahSiswa);
router.put('/siswa-sma/:id', verifyToken, allowUnit("SMA"), dataSiswaSma.updateSiswa);
router.delete('/siswa-sma/:id', verifyToken, allowUnit("SMA"), dataSiswaSma.hapusSiswa);
router.delete("/delete-all-data-siswa", verifyToken, allowUnit("SMA"), dataSiswaSma.deletelAllData);

// === Data Siswa Admin ===

router.get("/admin-siswa-sma", verifyToken, allowUnit("SMA"), siswaAdminSmaController.getAllSiswa);
router.get("/admin-siswa-sma/:kelas", verifyToken, allowUnit("SMA"), siswaAdminSmaController.getDataSiswaByKelas);
router.post("/admin-siswa-sma", verifyToken, allowUnit("SMA"), siswaAdminSmaController.createSiswa);
router.put("/admin-siswa-sma/:id", verifyToken, allowUnit("SMA"), siswaAdminSmaController.updateSiswa);
router.delete("/admin-siswa-sma/:id", verifyToken, allowUnit("SMA"), siswaAdminSmaController.deleteSiswa);

module.exports = router;