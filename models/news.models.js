const connection = require("../config/db");
const crypto = require("crypto");
const moment = require("moment-timezone");
const randomstring = require("randomstring");
const time = require("moment");
const { table } = require("console");
// Constructor
const news = {};

news.show_news = (data, result) => {
  let sql = ` select * from news`;
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
news.insert_news = (data, result) => {
  let obj = {
    name_th: data.name_th,
    name_en: data.name_en,
    image: data.image,
    header_news_th: data.header_news_th,
    header_news_en: data.header_news_en,
    hit: data.hit,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  connection.query(`insert into news set ?`, [obj], (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      console.log(res.insertId);
      let obj2 = {
        ref_news_id: res.insertId,
        name_th: "",
        name_en: "",
        image_banner: "",
        content: "",
        footer_video: "",
        footer_image: "",
        create_by: data.create_by,
        update_by: data.update_by,
        is_active: true,
        sort: 0,
      };
      connection.query(`insert into news_content set ?`, [obj2], (err2, res2) => {
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
news.update_news = (data, result) => {
  console.log(data);
  let obj = {
    name_th: data.name_th,
    name_en: data.name_en,
    image: data.image,
    header_news_th: data.header_news_th,
    header_news_en: data.header_news_en,
    hit: data.hit,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  console.log(obj);
  connection.query(`update news set ? where id = ${data.id}`, [obj], (err, res) => {
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
news.delete_news = (data, result) => {
  console.log(data);
  connection.query(`delete from news where id = ${data}`, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      connection.query(`delete from news_content where ref_news_id = ${data}`, (err2, res2) => {
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
news.show_news_content = (data, result) => {
  console.log(data);
  connection.query(`select * from news_content where ref_news_id = ${data}`, (err, res) => {
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
news.update_news_content = (data, result) => {
  console.log(data);
  let obj = {
    name_th: data.name_th,
    name_en: data.name_en,
    image_banner: data.image_banner,
    content: data.content,
    footer_video: data.footer_video,
    footer_image: data.footer_image,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  console.log(obj);
  connection.query(`update news_content set ? where id = ${data.id}`, [obj], (err, res) => {
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

module.exports = news;
