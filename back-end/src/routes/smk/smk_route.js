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
const router = express.Router();
const { verifyToken, checkSuperAdmin, allowUnit } = require("../../middleware/auth.js")
const carouselControllers = require("../../controllers/carousel_controller");
const adminControllers = require("../../controllers/login_admin_unit/admin_unit_controller.js");
const kataSambutanControllers = require("../../controllers/smk/kata_sambutan_smk.js");

router.post("/login-admin-smk", adminControllers.loginAdminUnit);
router.get("/get-admin-smk", verifyToken, allowUnit("SMK"), adminControllers.getAdminUnit);
router.post("/add-admin-smk", verifyToken, checkSuperAdmin, allowUnit("SMK"), adminControllers.addAdminUnit);
router.put("/update-admin-smk/:id", verifyToken, checkSuperAdmin, allowUnit("SMK"), adminControllers.updateAdminUnit);
router.put("/toggle-status-admin-smk/:id", verifyToken, allowUnit("SMK"), adminControllers.toggleStatusAdminUnit);
router.delete("/delete-admin-smk/:id", verifyToken, checkSuperAdmin, allowUnit("SMK"), adminControllers.deleteAdminUnit);

router.get("/get-kata-sambutan-smK", kataSambutanControllers.getKataSambutan);

module.exports = router;