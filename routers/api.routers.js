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


// type product
const product = require("../controllers/product.controllers");
router.get("/show/type_product", product.show_type_product)
router.post("/insert/type_product", product.insert_type_product)
router.put("/update/type_product", product.update_type_product)
router.delete("/delete/type_product/:id", product.delete_type_product)
router.get("/show/type_product_content/:id", product.show_type_product_content)
router.put("/update/type_product_content", product.update_type_product_content)
router.get("/show/category_product", product.show_category_product)
router.post("/insert/category_product", product.insert_category_product)
router.put("/update/category_product", product.update_category_product)
router.delete("/delete/category_product/:id", product.delete_category_product)
router.get("/show/findyourglass", product.show_findyourglass)
router.post("/insert/findyourglass", product.insert_findyourglass)
router.put("/update/findyourglass", product.update_findyourglass)
router.delete("/delete/findyourglass/:id", product.delete_findyourglass)

// type footprint
const footprint = require("../controllers/footprint.controllers");
router.get("/show/footprint", footprint.show_footprint)
router.post("/insert/footprint", footprint.insert_footprint)
router.put("/update/footprint", footprint.update_footprint)
router.delete("/delete/footprint/:id", footprint.delete_footprint)

//master data
const master = require("../controllers/master.controllers");
router.get("/master/region", master.show_master_region)
router.get("/master/province", master.show_master_province)

//upload file
const helper = require("../controllers/helper.controllers");
router.post("/upload_file", helper.upload_file)



module.exports = router;