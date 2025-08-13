const express = require("express");
const router = express.Router();
const adminController = require("../controllers/login_admin_unit/admin_unit_controller");
const { verifyToken, checkSuperAdmin, checkAdminOwnership, allowUnit } = require("../middleware/auth");

// LOGIN semua unit (tidak perlu token)
router.post("/login", adminController.loginAdminUnit);

// Tambah admin - hanya superadmin
router.post("/admin", verifyToken, checkSuperAdmin, adminController.addAdminUnit);

// Ambil semua admin - hanya superadmin
router.get("/admin", verifyToken, checkSuperAdmin, adminController.getAdminUnit);

// Update admin - bisa oleh admin itu sendiri atau superadmin
router.put("/admin/:id", verifyToken, adminController.updateAdminUnit);

// Hapus admin - hanya superadmin
router.delete("/admin/:id", verifyToken, checkSuperAdmin, adminController.deleteAdminUnit);

// Aktif/Nonaktif admin - hanya superadmin
router.patch("/admin/status/:id", verifyToken, checkSuperAdmin, adminController.toggleStatusAdminUnit);


// Contoh akses spesifik per unit (contohnya untuk halaman dashboard admin masing-masing unit)
router.get("/admin-sma/dashboard-sma", verifyToken, allowUnit("SMA"), (req, res) => {
    res.json({ message: "Akses dashboard admin SMA berhasil" });
});


router.get("/dashboard/smp", verifyToken, allowUnit("SMP"), (req, res) => {
    res.json({ message: "Akses dashboard admin SMP berhasil" });
});

router.get("/dashboard/smk", verifyToken, allowUnit("SMK"), (req, res) => {
    res.json({ message: "Akses dashboard admin SMK berhasil" });
});

router.get("/dashboard/yayasan", verifyToken, allowUnit("YAYASAN"), (req, res) => {
    res.json({ message: "Akses dashboard admin Yayasan berhasil" });
});

module.exports = router;
