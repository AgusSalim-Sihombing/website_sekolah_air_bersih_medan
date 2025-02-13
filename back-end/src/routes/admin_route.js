const express = require("express");
const adminControllers = require("../controllers/admin_controller");

const VisiMisiTujuan = require("../controllers/visi_misi_tujuan_controller");
const { getTotalSiswaTahunan } = require("../controllers/total_siswa_tahunan_controller");
const UserAdmin = require("../controllers/user_admin_controller")

const router = express.Router();


router.post("/login", adminControllers.loginAdmin);
router.post("/register", adminControllers.register)

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


router.get("/total-siswa-tahunan", getTotalSiswaTahunan)

//Untuk Useradmin
router.get("/user-admin", UserAdmin.getUserAdmin)


module.exports = router;