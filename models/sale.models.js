const connection = require("../config/db");
const crypto = require("crypto");
const moment = require("moment-timezone");
const randomstring = require("randomstring");
const time = require("moment");
const { table } = require("console");
// Constructor
const sale = {};

sale.show_sale_channel = (data, result) => {
  let sql = ` select * from distributor`;
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

sale.insert_sale_channel = (data, result) => {
  console.log(data);
  let obj = {
    region_id: data.region_id,
    province_id: data.province_id,
    image_logo: data.image_logo,
    name: data.name,
    address: data.address,
    map: data.map,
    phone: data.phone,
    fax: data.fax,
    email: data.email,
    website: data.website,
    facebook: data.facebook,
    line: data.line,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: "",
  };
  console.log(obj);
  connection.query(`insert into distributor set ?`, [obj], (err, res) => {
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
sale.update_sale_channel = (data, result) => {
  console.log(data);
  let obj = {
    region_id: data.region_id,
    province_id: data.province_id,
    image_logo: data.image_logo,
    name: data.name,
    address: data.address,
    map: data.map,
    phone: data.phone,
    fax: data.fax,
    email: data.email,
    website: data.website,
    facebook: data.facebook,
    line: data.line,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: "",
  };
  console.log(obj);
  connection.query(`update distributor set ? where id = ${data.id}`, [obj], (err, res) => {
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
sale.update_sale_channel = (data, result) => {
  console.log(data);
  let obj = {
    region_id: data.region_id,
    province_id: data.province_id,
    image_logo: data.image_logo,
    name: data.name,
    address: data.address,
    map: data.map,
    phone: data.phone,
    fax: data.fax,
    email: data.email,
    website: data.website,
    facebook: data.facebook,
    line: data.line,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: "",
  };
  console.log(obj);
  connection.query(`update distributor set ? where id = ${data.id}`, [obj], (err, res) => {
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
sale.update_sale_channel = (data, result) => {
  console.log(data);
  let obj = {
    region_id: data.region_id,
    province_id: data.province_id,
    image_logo: data.image_logo,
    name: data.name,
    address: data.address,
    map: data.map,
    phone: data.phone,
    fax: data.fax,
    email: data.email,
    website: data.website,
    facebook: data.facebook,
    line: data.line,
    create_by: data.create_by,
    update_by: data.update_by,
    update_date: moment
      .utc(moment.utc().format())
      .local()
      .format("YYYY-MM-DD HH:mm:ss"),
    is_active: true,
    sort: "",
  };
  console.log(obj);
  connection.query(`update distributor set ? where id = ${data.id}`, [obj], (err, res) => {
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
sale.delete_sale_channel = (data, result) => {
  console.log(data);
  connection.query(`delete from distributor where id = ${data}`, (err, res) => {
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

module.exports = sale;
