const express = require("express");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const adminSmaControllers = require("../../controllers/sma/admin_sma/admin_sma_controller")
const excelControllers = require("../../controllers/sma/excel_controllers");
const dataGuru = require("../../controllers/sma/data_guru_controllers");
const kepsekSmaControllers = require("../../controllers/sma/kata_sambutan");
const eventSmaControllers = require("../../controllers/sma/event_sma_controllers");
const pengumumanSmaControllers = require("../../controllers/sma/pengumuan_controllers");
const totatalSiswaSmaBulanan = require("../../controllers/sma/total_siswa_sma_bulanan_controllers");
const dataSiswaSma = require("../../controllers/sma/data_siswa_sma_controllers")
const dokumentasiController = require("../../controllers/sma/admin_dokumentasi_kegiatan")
const FasilitasController = require("../../controllers/sma/fasilitas_controller")
const { verifyToken, checkAdminOwnership, checkSuperAdmin } = require("../../middleware/auth.js")
const router = express.Router();

//admin
router.post("/login-admin-sma", adminSmaControllers.loginAdminSma);
router.post("/add-admin-sma", verifyToken, checkSuperAdmin, adminSmaControllers.addAdminSma);
router.get("/get-admin-sma", verifyToken, adminSmaControllers.getAdminSma);
router.put("/update-admin-sma/:id", verifyToken, checkSuperAdmin, adminSmaControllers.updateAdminSma);
router.put("/toogle-status-admin-sma/:id", verifyToken, adminSmaControllers.disableToggleStatusAdminSma);
router.delete("/delete-admin-sma/:id", verifyToken, checkSuperAdmin, adminSmaControllers.deleteAdminSma);

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

router.post("/upload-excel-guru", verifyToken, upload.single("file"), dataGuru.uploadExcelGuru);
router.get("/get-data-guru",  dataGuru.getDataGuru);
router.get("/get-data-guru/:id", dataGuru.getDataGuruById);
router.post("/data-guru", verifyToken, dataGuru.addGuru);
router.put("/data-guru/:id", verifyToken, dataGuru.upload.single("foto"), dataGuru.updateGuru);
router.delete("/delete-all-guru", verifyToken, dataGuru.deleteAllDataGuru);
router.delete("/delete-data-guru/:id", verifyToken, dataGuru.deleteDataGuruById);

//kepala sekolah
router.get("/get-kata-sambutan-kepsek-sma", kepsekSmaControllers.getKataSambutan)
router.get("/getfoto-kepsek-sma", kepsekSmaControllers.getFotoKepalaSekolahSma)

//event-sma
router.get("/events-sma", eventSmaControllers.getAllEvents)
router.get("/events-sma/:id", eventSmaControllers.getEventById);
router.get("/events-sma/flyer/:id", eventSmaControllers.getFlyerById);
router.put("/events-sma/:id", eventSmaControllers.updateEvent);
router.put("/events-sma/:id/status", eventSmaControllers.updateStatus)
router.put("/events-sma/:id/flyer", upload.single("flyer"), eventSmaControllers.updateFlyerById);
router.post("/events-sma", eventSmaControllers.addEvent);
router.delete("/events-sma/:id", eventSmaControllers.deleteEvent);

//Dokumentasi Kegiatan
router.get("/dokumentasi", dokumentasiController.getAllDokumentasi);
router.post("/dokumentasi", dokumentasiController.addDokumentasi);
router.put("/dokumentasi/:id", dokumentasiController.upload.single("gambar"), dokumentasiController.updateDokumentasi);
router.delete("/dokumentasi/:id", dokumentasiController.deleteDokumentasi);

//Fasilitas
router.get("/fasilitas", FasilitasController.getAllFasilitas);
router.post("/fasilitas", FasilitasController.addFasilitas);
router.put("fasilitas/:id", FasilitasController.upload.single("gambar_fasilitas"), FasilitasController.updateFasilitas);
router.delete("/fasilitas/:id", FasilitasController.deleteFasilitas);


// Routes for announcements
router.get("/pengumuman-sma", pengumumanSmaControllers.getAllPengumuman);
router.get("/pengumuman-sma-admin", pengumumanSmaControllers.getAllPengumumanAdmin);
router.get("/pengumuman-sma/:id", pengumumanSmaControllers.getPengumumanById);
router.post("/pengumuman-sma", pengumumanSmaControllers.addPengumuman);
router.put("/pengumuman-sma/:id", pengumumanSmaControllers.updatePengumuman);
router.delete("/pengumuman-sma/:id", pengumumanSmaControllers.deletePengumuman);

//Routes 
router.get("/total-sma-bulanan", totatalSiswaSmaBulanan.getTotalSiswaBulanan);


//Data Siswa Kelas X
router.post("/upload-excel-sma", upload.single("file"), dataSiswaSma.uploadExcel);
router.get("/get-siswa-sma", dataSiswaSma.getDataSiswaSma);
router.get("/siswa-sma/:kelas", dataSiswaSma.getDataSiswaByKelas);
router.post('/siswa-sma', dataSiswaSma.tambahSiswa);
router.put('/siswa-sma/:id',  dataSiswaSma.updateSiswa);
router.delete('/siswa-sma/:id', dataSiswaSma.hapusSiswa);
router.delete("/delete-all-data-siswa", dataSiswaSma.deletelAllData);


module.exports = router;