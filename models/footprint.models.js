const connection = require("../config/db");
const crypto = require("crypto");
const moment = require("moment-timezone");
const randomstring = require("randomstring");
const time = require("moment");
const { table } = require("console");
// Constructor
const footprint = {};

footprint.show_footprint = (data, result) => {
  let sql = ` select * from footprint`;
  // sql += `where dl = 0 order by  create_date DESC`;
  connection.query(sql, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: "Fail",
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
    }
    return result(null, response);
  });
};

footprint.insert_footprint = (data, result) => {
  let obj = {
    name_th: data.name_th,
    name_en: data.name_en,
    image_logo: data.image_logo,
    image_banner: data.image_banner,
    image_detail: data.image_detail,
    name_build: data.name_build,
    type_build: data.type_build,
    province_build: data.province_build,
    country_build: data.country_build,
    list_detail: data.list_detail,
    architect_detail: data.architect_detail,
    installer_detail: data.installer_detail,
    video_preview: data.video_preview,
    footer_image_1: data.footer_image_1,
    footer_image_2: data.footer_image_2,
    footer_image_3: data.footer_image_3,
    footer_image_4: data.footer_image_4,
    footer_image_5: data.footer_image_5,
    footer_image_6: data.footer_image_6,
    footer_image_7: data.footer_image_7,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: "",
  };
  connection.query(`insert into footprint set ?`, [obj], (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
      return result(null, response);
    }
  });
};
footprint.update_footprint = (data, result) => {
  console.log(data);
  let obj = {
    name_th: data.name_th,
    name_en: data.name_en,
    image_logo: data.image_logo,
    image_banner: data.image_banner,
    image_detail: data.image_detail,
    name_build: data.name_build,
    type_build: data.type_build,
    province_build: data.province_build,
    country_build: data.country_build,
    list_detail: data.list_detail,
    architect_detail: data.architect_detail,
    installer_detail: data.installer_detail,
    video_preview: data.video_preview,
    footer_image_1: data.footer_image_1,
    footer_image_2: data.footer_image_2,
    footer_image_3: data.footer_image_3,
    footer_image_4: data.footer_image_4,
    footer_image_5: data.footer_image_5,
    footer_image_6: data.footer_image_6,
    footer_image_7: data.footer_image_7,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: "",
  };
  console.log(obj);
  connection.query(`update footprint set ? where id = ${data.id}`, [obj], (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
    }
    return result(null, response);
  });
};
footprint.delete_footprint = (data, result) => {
  console.log(data);
  connection.query(`delete from footprint where id = ${data}`, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
    }
    return result(null, response);
  });
};

module.exports = footprint;
