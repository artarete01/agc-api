const connection = require("../config/db");
const crypto = require("crypto");
const moment = require("moment-timezone");
const randomstring = require("randomstring");
const time = require("moment");
const { table } = require("console");
// Constructor
const sustainability = {};

sustainability.show_sustainability = (data, result) => {
  let sql = ` select * from sustainability`;
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
sustainability.insert_sustainability = (data, result) => {
  let obj = {
    name_th: data.name_th,
    name_en: data.name_en,
    image: data.image,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  connection.query(`insert into sustainability set ?`, [obj], (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      console.log(res.insertId);
      let obj2 = {
        ref_sustainability_id: res.insertId,
        name_th: "",
        name_en: "",
        image_banner: "",
        image_text: "",
        content: "",
        create_by: data.create_by,
        update_by: data.update_by,
        is_active: true,
        sort: 0,
      };
      connection.query(`insert into sustainability_content set ?`, [obj2], (err2, res2) => {
        if (err2) {
          response = {
            code: 99,
            message: err2,
          };
        } else {
          response = {
            code: 200,
            message: "Success",
            data: res,
            data2: res2,
          };
          return result(null, response);
        }
      });
    }
  });
};
sustainability.update_sustainability = (data, result) => {
  console.log(data);
  let obj = {
    name_th: data.name_th,
    name_en: data.name_en,
    image: data.image,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  console.log(obj);
  connection.query(`update sustainability set ? where id = ${data.id}`, [obj], (err, res) => {
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
sustainability.delete_sustainability = (data, result) => {
  console.log(data);
  connection.query(`delete from sustainability where id = ${data}`, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      connection.query(`delete from sustainability_content where ref_sustainability_id = ${data}`, (err2, res2) => {
        console.log(err2);
        if (err2) {
          response = {
            code: 99,
            message: err2,
          };
        } else {
          response = {
            code: 200,
            message: "Success",
            data: res,
            data2: res2,
          };
          return result(null, response);
        }
      });
    }
  });
};
sustainability.show_sustainability_content = (data, result) => {
  console.log(data);
  connection.query(`select * from sustainability_content where ref_sustainability_id = ${data}`, (err, res) => {
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
sustainability.update_sustainability_content = (data, result) => {
  console.log(data);
  let obj = {
    name_th: data.name_th,
    name_en: data.name_en,
    image_banner: data.image_banner,
    image_text: data.image_text,
    content: data.content,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  console.log(obj);
  connection.query(`update sustainability_content set ? where id = ${data.id}`, [obj], (err, res) => {
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

sustainability.show_group_sustainability = (data, result) => {
  let sql = ` select * from sustainability_group`;
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

sustainability.insert_group_sustainability = (data, result) => {
  let obj = {
    ref_sustainability_image_1: data.ref_sustainability_image_1,
    ref_sustainability_image_2: data.ref_sustainability_image_2,
    ref_sustainability_image_3: data.ref_sustainability_image_3,
    ref_sustainability_image_4: data.ref_sustainability_image_4,
    ref_sustainability_image_5: data.ref_sustainability_image_5,
    ref_sustainability_image_6: data.ref_sustainability_image_6,
    ref_sustainability_image_7: data.ref_sustainability_image_7,
    ref_sustainability_image_8: data.ref_sustainability_image_8,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  connection.query(`insert into sustainability_group set ?`, [obj], (err, res) => {
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
sustainability.update_group_sustainability = (data, result) => {
  console.log(data);
  let obj = {
    ref_sustainability_image_1: data.ref_sustainability_image_1,
    ref_sustainability_image_2: data.ref_sustainability_image_2,
    ref_sustainability_image_3: data.ref_sustainability_image_3,
    ref_sustainability_image_4: data.ref_sustainability_image_4,
    ref_sustainability_image_5: data.ref_sustainability_image_5,
    ref_sustainability_image_6: data.ref_sustainability_image_6,
    ref_sustainability_image_7: data.ref_sustainability_image_7,
    ref_sustainability_image_8: data.ref_sustainability_image_8,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  console.log(obj);
  connection.query(`update sustainability_group set ? where id = ${data.id}`, [obj], (err, res) => {
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
sustainability.delete_group_sustainability = (data, result) => {
  console.log(data);
  connection.query(`delete from sustainability_group where id = ${data}`, (err, res) => {
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

module.exports = sustainability;
