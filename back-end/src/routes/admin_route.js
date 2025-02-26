const express = require("express");
const multer = require("multer");
const adminControllers = require("../controllers/admin_controller");

const VisiMisiTujuan = require("../controllers/visi_misi_tujuan_controller");
const TotalSiswaTahunan = require("../controllers/total_siswa_tahunan_controller");
const UserAdmin = require("../controllers/user_admin_controller")
const Organization = require("../controllers/sma/data_organization")
const test = require("../controllers/test")
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
router.get("/visi", VisiMisiTujuan.getVisi)
router.put("/visi-update", VisiMisiTujuan.updateVisi)

//Untuk Misi
router.get("/misi", VisiMisiTujuan.getMisi)
router.get("/misi/:id", VisiMisiTujuan.getMisiById)
router.put("/update-misi/:id", VisiMisiTujuan.updateMisiById)

//Untuk Tujuan
router.get("/tujuan", VisiMisiTujuan.getTujuan)
router.get("/tujuan/:id", VisiMisiTujuan.getTujuanById)
router.put("/update-tujuan/:id", VisiMisiTujuan.updateTujuanById)

//Total Siswa Tahunan
router.get("/total-siswa-tahunan", TotalSiswaTahunan.getTotalSiswaTahunan)
router.post("/total-siswa-tahunan", TotalSiswaTahunan.addTotalSiswaTahunan)
router.put("/total-siswa-tahunan/:tahun", TotalSiswaTahunan.updateTotalSiswaTahunan)
router.put("/total-siswa-tahunan/toggle/:tahun", TotalSiswaTahunan.disableToogleTotalSiswaTahunan)
router.delete("/total-siswa-tahunan/:tahun", TotalSiswaTahunan.deleteTotalSiswaTahunan)


//Untuk Useradmin
router.get("/user-admin", UserAdmin.getUserAdmin)

router.get("/data-organisasi-cart", Organization.getDataOrganization)

//Untuk Testing kepala Sekolah SMA
router.get("/kepala-sekolah-sma", test.getKepalaSekolahSma)

module.exports = router;