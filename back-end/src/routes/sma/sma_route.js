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
const router = express.Router();

//admin
router.post("/login-admin-sma", adminSmaControllers.loginAdminSma);
router.post("/add-admin-sma", adminSmaControllers.addAdminSma);
router.get("/get-admin-sma", adminSmaControllers.getAdminSma);
router.put("/update-admin-sma/:id", adminSmaControllers.updateAdminSma);
router.put("/toogle-status-admin-sma/:id", adminSmaControllers.disableToggleStatusAdminSma);
router.delete("/delete-admin-sma/:id", adminSmaControllers.deleteAdminSma);

//data-excel-siswa
router.post("/upload-excel", upload.single("file"), excelControllers.uploadExcel);
router.get("/get-excel-data", excelControllers.getExcelData);
router.put("/update-data-siswa-sma/:id", excelControllers.updateDataSiswaSma)
router.delete("/delete-excel-data/:id", excelControllers.deleteExcelData);
router.delete("/delete-all-data-siswa", excelControllers.deletelAllData);

//data-guru
router.post("/upload-excel-guru", upload.single("file"), dataGuru.uploadExcelGuru);
router.get("/get-data-guru", dataGuru.getDataGuru);
router.get("/get-data-guru/:id", dataGuru.getDataGuruById)
router.post("data-guru", dataGuru.addGuru)
router.put("/data-guru/:id", dataGuru.updateGuru)
router.delete("/delete-all-guru", dataGuru.deleteAllDataGuru);
router.delete("/delete-data-guru/:id", dataGuru.deleteDataGuruById);

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
// router.post("/events-sma", upload.single("flyer"), eventSmaControllers.addEvent);
router.post("/events-sma", eventSmaControllers.addEvent);
router.delete("/events-sma/:id", eventSmaControllers.deleteEvent);

//Dokumentasi Kegiatan
// router.get("/dokumentasi-kegiatan", dokumentasiKegiatan.getAllDokumentasi);
// router.get("/dokumentasi-kegiatan/:id", dokumentasiKegiatan.getDokumentasiById);
// router.post("/dokumentasi-kegiatan", dokumentasiKegiatan.addDokumentasi); // Fix method from PUT to POST
// router.put("/dokumentasi-kegiatan/:id", dokumentasiKegiatan.updateDokumentasi);
// router.delete("/dokumentasi-kegiatan/:id", dokumentasiKegiatan.deleteDokumentasi);
router.get("/dokumentasi", dokumentasiController.getAllDokumentasi);
router.post("/dokumentasi", dokumentasiController.addDokumentasi);
router.put("/dokumentasi/:id", dokumentasiController.upload.single("gambar"), dokumentasiController.updateDokumentasi);
router.delete("/dokumentasi/:id", dokumentasiController.deleteDokumentasi);



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
router.get("/siswa-sma/:kelas", dataSiswaSma.getDataSiswaByKelas);
router.post('/siswa-sma', dataSiswaSma.tambahSiswa);
router.put('/siswa-sma/:id', dataSiswaSma.updateSiswa);
router.delete('/siswa-sma/:id', dataSiswaSma.hapusSiswa);


module.exports = router;