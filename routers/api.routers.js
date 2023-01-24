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
router.get("/show/type_product_content", product.show_type_product_content_all)
router.get("/show/type_product_content/:id", product.show_type_product_content)
router.put("/update/type_product_content", product.update_type_product_content)
router.get("/show/category_product", product.show_category_product)
router.post("/insert/category_product", product.insert_category_product)
router.put("/update/category_product", product.update_category_product)
router.delete("/delete/category_product/:id", product.delete_category_product)
router.get("/show/product", product.show_product)
router.post("/insert/product", product.insert_product)
router.put("/update/product", product.update_product)
router.delete("/delete/product/:id", product.delete_product)

// type footprint
const footprint = require("../controllers/footprint.controllers");
router.get("/show/footprint", footprint.show_footprint)
router.post("/insert/footprint", footprint.insert_footprint)
router.put("/update/footprint", footprint.update_footprint)
router.delete("/delete/footprint/:id", footprint.delete_footprint)
router.get("/show/group_footprint", footprint.show_group_footprint)
router.post("/insert/group_footprint", footprint.insert_group_footprint)
router.put("/update/group_footprint", footprint.update_group_footprint)
router.delete("/delete/group_footprint/:id", footprint.delete_group_footprint)
router.get("/show/footprint_detail/:id", footprint.show_footprint_detail)

//new
const home = require("../controllers/home.controllers");
router.get("/show/home_banner", home.show_home_banner)
router.put("/update/home_banner", home.update_home_banner)
router.get("/show/home_group_product", home.show_home_group_product)
router.put("/update/home_group_product", home.update_home_group_product)

//master data
const master = require("../controllers/master.controllers");
router.get("/master/region", master.show_master_region)
router.get("/master/province", master.show_master_province)

//upload file
const helper = require("../controllers/helper.controllers");
router.post("/upload_file", helper.upload_file)



module.exports = router;