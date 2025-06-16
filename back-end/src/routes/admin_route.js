const express = require("express");
const multer = require("multer");
const adminControllers = require("../controllers/admin_controller");

const VisiMisiTujuan = require("../controllers/visi_misi_tujuan_controller");
const TotalSiswaTahunan = require("../controllers/total_siswa_tahunan_controller");
const UserAdmin = require("../controllers/user_admin_controller");
const Organization = require("../controllers/sma/data_organization");
const test = require("../controllers/test");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/login", adminControllers.loginAdmin);
router.post("/add-admin", adminControllers.addAdmin);
router.get("/get-admin", adminControllers.getAdmin);
router.get("/get-admin/photo/:id", adminControllers.getAdminPhoto)
router.post("/post-photo/:id", upload.single("foto"), adminControllers.uploadAdminPhoto);
router.delete("/delete-photo/:id", adminControllers.deleteAdminPhoto);
router.put("/update-admin/:id", adminControllers.updateAdmin);
router.put("/toggle-status/:id", adminControllers.disableToggleStatusAdmin);
router.delete("/delete-admin/:id", adminControllers.deleteAdmin);


//Untuk visi
router.post("/add-visi", VisiMisiTujuan.addVisi);
router.get("/visi", VisiMisiTujuan.getVisi);
router.put("/update-visi", VisiMisiTujuan.updateVisi)
router.delete("/delete-visi", VisiMisiTujuan.deleteVisi);

//Untuk Misi
router.post("/add-misi", VisiMisiTujuan.addMisi);
router.get("/misi", VisiMisiTujuan.getMisi);
router.put("/update-misi", VisiMisiTujuan.updateMisi);
router.delete("/delete-misi", VisiMisiTujuan.deleteMisi);

//Untuk Tujuan
router.post("/add-tujuan", VisiMisiTujuan.addTujuan);
router.get("/tujuan", VisiMisiTujuan.getTujuan);
router.put("/update-tujuan", VisiMisiTujuan.updateTujuan);
router.delete("/delete-tujuan", VisiMisiTujuan.deleteTujuan);


//Total Siswa Tahunan
router.get("/total-siswa-tahunan", TotalSiswaTahunan.getTotalSiswaTahunan);
router.post("/total-siswa-tahunan", TotalSiswaTahunan.addTotalSiswaTahunan);
router.put("/total-siswa-tahunan/:tahun", TotalSiswaTahunan.updateTotalSiswaTahunan);
router.put("/total-siswa-tahunan/toggle/:tahun", TotalSiswaTahunan.disableToogleTotalSiswaTahunan);
router.delete("/total-siswa-tahunan/:tahun", TotalSiswaTahunan.deleteTotalSiswaTahunan);


//Untuk Useradmin
router.get("/user-admin", UserAdmin.getUserAdmin);

router.get("/data-organisasi-cart", Organization.getDataOrganization);

//Untuk Testing kepala Sekolah SMA
router.get("/kepala-sekolah-sma", test.getKepalaSekolahSma);

module.exports = router;