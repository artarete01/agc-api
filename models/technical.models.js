const connection = require("../config/db");
const crypto = require("crypto");
const moment = require("moment-timezone");
const randomstring = require("randomstring");
const time = require("moment");
const { table } = require("console");
// Constructor
const technical = {};

technical.show_technical = (data, result) => {
  let sql = ` select * from technical`;
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
technical.insert_technical = (data, result) => {
  let obj = {
    name_th: data.name_th,
    name_en: data.name_en,
    file_download: data.file_download,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  connection.query(`insert into technical set ?`, [obj], (err, res) => {
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
technical.update_technical = (data, result) => {
  console.log(data);
  let obj = {
    name_th: data.name_th,
    name_en: data.name_en,
    file_download: data.file_download,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  console.log(obj);
  connection.query(`update technical set ? where id = ${data.id}`, [obj], (err, res) => {
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
technical.delete_technical = (data, result) => {
  console.log(data);
  connection.query(`delete from technical where id = ${data}`, (err, res) => {
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
technical.show_group_technical = (data, result) => {
  let sql = ` select * from technical_group`;
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

technical.insert_group_technical = (data, result) => {
  let obj = {
    ref_technical_image_1: data.ref_technical_image_1,
    ref_technical_image_2: data.ref_technical_image_2,
    ref_technical_image_3: data.ref_technical_image_3,
    ref_technical_image_4: data.ref_technical_image_4,
    ref_technical_image_5: data.ref_technical_image_5,
    ref_technical_image_6: data.ref_technical_image_6,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  connection.query(`insert into technical_group set ?`, [obj], (err, res) => {
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
technical.update_group_technical = (data, result) => {
  console.log(data);
  let obj = {
    ref_technical_image_1: data.ref_technical_image_1,
    ref_technical_image_2: data.ref_technical_image_2,
    ref_technical_image_3: data.ref_technical_image_3,
    ref_technical_image_4: data.ref_technical_image_4,
    ref_technical_image_5: data.ref_technical_image_5,
    ref_technical_image_6: data.ref_technical_image_6,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  console.log(obj);
  connection.query(`update technical_group set ? where id = ${data.id}`, [obj], (err, res) => {
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
technical.delete_group_technical = (data, result) => {
  console.log(data);
  connection.query(`delete from technical_group where id = ${data}`, (err, res) => {
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
technical.show_technical_law = (data, result) => {
  console.log(data);
  connection.query(`select * from technical_law`, (err, res) => {
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
technical.update_technical_law = (data, result) => {
  let obj = {
    name_th: data.name_th,
    name_en: data.name_en,
    file_download: data.file_download,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  console.log(obj);
  connection.query(`update technical_law set ? where id = ${data.id}`, [obj], (err, res) => {
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

module.exports = technical;
