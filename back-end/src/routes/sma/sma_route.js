const express = require("express");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const adminSmaControllers = require("../../controllers/sma/admin_sma/admin_sma_controller")
const excelControllers = require("../../controllers/sma/excel_controllers")
const router = express.Router();

//admin
router.post("/login-admin-sma", adminSmaControllers.loginAdminSma);
router.post("/add-admin-sma", adminSmaControllers.addAdminSma);
router.get("/get-admin-sma", adminSmaControllers.getAdminSma);
router.put("/update-admin-sma/:id", adminSmaControllers.updateAdminSma);
router.put("/toogle-status-admin-sma/:id", adminSmaControllers.disableToggleStatusAdminSma);
router.delete("/delete-admin-sma/:id", adminSmaControllers.deleteAdminSma);

router.post("/upload-excel", upload.single("file"), excelControllers.uploadExcel);
router.get("/get-excel-data", excelControllers.getExcelData);
router.delete("/delete-excel-data/:id", excelControllers.deleteExcelData);

module.exports = router;