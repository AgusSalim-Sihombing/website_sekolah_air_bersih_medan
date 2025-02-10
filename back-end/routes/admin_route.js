// const express = require ("express")
// const router = express.Router();
// const AdminController = require ("../controllers/admin_controller");

// router.get('/admin', AdminController.adminController );

// module.exports = {
//     router
// }

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller');

router.get('/admin',adminController.authenticateToken, adminController.getAllAdmins );
router.post('/login', adminController.loginAdmin);

module.exports = router;
