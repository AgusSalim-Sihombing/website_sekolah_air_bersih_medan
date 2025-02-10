const express = require("express")

const {getVisi, updateVisi} = require("../controllers/visi_misi_tujuan_controller")
const router = express.Router();

router.get("/visi", getVisi)
router.put("/visi/update", updateVisi )

module.exports = router;