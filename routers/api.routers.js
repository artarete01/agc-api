const express = require("express");
const fileUpload = require('express-fileupload');
const router = express.Router();

router.use(fileUpload());

//new
const sale = require("../controllers/sale.controllers");
router.get("/show/sale_channel", sale.show_sale_channel)
router.post("/insert/sale_channel", sale.insert_sale_channel)
router.put("/update/sale_channel", sale.update_sale_channel)
router.delete("/delete/sale_channel/:id", sale.delete_sale_channel)

//master data
const master = require("../controllers/master.controllers");
router.get("/master/region", master.show_master_region)
router.get("/master/province", master.show_master_province)

//upload file
const helper = require("../controllers/helper.controllers");
router.post("/upload_file", helper.upload_file)



module.exports = router;