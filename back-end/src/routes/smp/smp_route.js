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

router.post("/login-admin-smp", adminControllers.loginAdminUnit);
router.get("/get-admin-smp", verifyToken, allowUnit("SMP"), adminControllers.getAdminUnit);
router.post("/add-admin-smp", verifyToken, checkSuperAdmin, allowUnit("SMP"), adminControllers.addAdminUnit);
router.put("/update-admin-smp/:id", verifyToken, checkSuperAdmin, allowUnit("SMP"), adminControllers.updateAdminUnit);
router.put("/toggle-status-admin-smp/:id", verifyToken, allowUnit("SMP"), adminControllers.toggleStatusAdminUnit);
router.delete("/delete-admin-smp/:id", verifyToken, checkSuperAdmin, allowUnit("SMP"), adminControllers.deleteAdminUnit);


module.exports = router;