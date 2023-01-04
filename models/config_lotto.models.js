const connection = require("../config/db");
const crypto = require("crypto");
const moment = require("moment-timezone");
const randomstring = require("randomstring");
const time = require("moment");
const { table } = require("console");
// Constructor
const Config = {};
Config.lotto_work = (data, result) => {
  let sql = `select * from lotto_set where work_date = '${data.datenow}'`;
  connection.query(sql, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: "Fail",
      };
    } else {
      response = {
        code: 0,
        message: "Success",
        res: res,
      };
    }
    return result(null, response);
  });
};

Config.lotto_set_insert = (data, result) => {
  let sql = `select * from lotto_set where work_date LIKE '${data.work_set}' and dl = 0`;
  connection.query(sql, (err, rest) => {
    if (err) {
    } else {
      if (rest.length == 1) {
        response = {
          code: 1000,
          message: "Work date Duplicate",
        };
        return result(null, response);
      } else {
        let obj = {
          numberset: data.set_number,
          create_date: moment
            .utc(moment.utc().format())
            .local()
            .format("YYYY-MM-DD HH:mm:ss"),
          work_date: data.work_set,
          active: 0,
        };
        console.log(obj);
        connection.query(`insert into lotto_set set ?`, [obj], (err, res) => {
          if (err) {
            response = {
              code: 99,
              message: "Fail",
            };
          } else {
            response = {
              code: 0,
              message: "Success",
              res: res,
            };
          }
          return result(null, response);
        });
      }
    }
  });
};

Config.get_lotto_all = (data, result) => {
  let start_date = "";
  let end_date = "";
  if (data.start_date != "") {
    start_date = data.start_date;
    end_date = data.end_date;
  }

  let where = [];

  if (start_date != "") {
    where.push(
      `work_date >= '${start_date}' AND work_date <= '${end_date}'`
    );
  }

  if (data.numberset != "" && data.numberset != undefined) {
    where.push(`numberset = '${data.numberset}'`);
  }

  where.push(`dl = '0'`);

  let sql = `select * from lotto_set `;
  if (where.length > 0) {
    sql += `where ${where.join(" AND ")}`;
  }
  sql += ` order by work_date DESC`;

  connection.query(sql, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: "Fail",
      };
    } else {
      response = {
        code: 0,
        message: "Success",
        res: res,
      };
    }
    return result(null, response);
  });
};

Config.get_logs = (data, result) => {

  let start_date = "";
  let end_date = "";
  if (data.start_date != "") {
    start_date = data.start_date;
    end_date = data.end_date;
  }

  let where = [];

  if (start_date != "") {
    where.push(
      `create_date >= '${start_date}' AND create_date <= '${end_date}'`
    );
  }

  let sql = `select * from logs `;
  if (where.length > 0) {
    sql += `where ${where.join(" AND ")}`;
  }
  sql += ` order by create_date DESC`;

  connection.query(sql, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: "Fail",
      };
    } else {
      response = {
        code: 0,
        message: "Success",
        res: res,
      };
    }
    return result(null, response);
  });
};

Config.lotto_set_update = (data, result) => {
  let dateddd = moment.utc(moment.utc().format()).local().format("HH:mm:ss");

  let datetime = moment(data.date).format("YYYY-MM-DD") + ` ${dateddd}`;
  let obj = {
    numberset: data.set_number,
    update_date: moment
      .utc(moment.utc().format())
      .local()
      .format("YYYY-MM-DD HH:mm:ss"),
    active: data.status,
    dl: data.dl,
  };

  let sqlcheck = ` select * from lotto  `;
  connection.query(sqlcheck, (err, ress) => {
    if (err) {
    } else {
      var datenow = moment
        .utc(moment.utc().format())
        .local()
        .format("YYYY-MM-DD HH:mm:ss");
      var timestop =
        moment.utc(moment.utc().format()).local().format("YYYY-MM-DD") +
        ` ${ress[0].close_time}`;
      var timeanou =
        moment.utc(moment.utc().format()).local().format("YYYY-MM-DD") +
        ` ${ress[0].time_Announcement}`;
      console.log(datenow);
      console.log(timestop);
      console.log(timeanou);
      console.log(datetime);
      if (datenow >= timestop) {
        response = {
          code: 101,
          message: "cant update now",
        };
      }
      if (datenow > datetime) {
        response = {
          code: 102,
          message: "cant update now",
        };
        return result(null, response);
      } else {
        connection.query(
          `update  lotto_set set ? where id_lotto = ${data.number_id}`,
          [obj],
          (err, res) => {
            if (err) {
              response = {
                code: 99,
                message: "Fail",
              };
            } else {
              response = {
                code: 0,
                message: "Success",
                res: res,
              };
            }
            return result(null, response);
          }
        );
      }
    }
  });

  return;
};

Config.lotto_insert = (req, result) => {
  let obj = {
    name_lotto: req.name_lotto,
    close_time: req.time_close,
    time_Announcement: req.Announcement,
    create_date: moment
      .utc(moment.utc().format())
      .local()
      .format("YYYY-MM-DD HH:mm:ss"),
  };
  connection.query(`insert into  lotto set ? `, [obj], (err, res) => {
    console.log(err);
    if (err) {
      response = {
        code: 99,
        message: "Fail",
      };
    } else {
      response = {
        code: 0,
        message: "Success",
        res: res,
      };
    }
    return result(null, response);
  });
};
Config.insert_logs = (req,logs_type,logs_event,logs_table,logs_table_id,logs_api) => {
  let obj = {
    logs_user: req.create_by,
    logs_type: logs_type,
    create_date: moment
      .utc(moment.utc().format())
      .local()
      .format("YYYY-MM-DD HH:mm:ss"),
    logs_event: logs_event,
    logs_detail: JSON.stringify(req),
    logs_table: logs_table,
    logs_table_id: logs_table_id,
    logs_api: logs_api
  };
  connection.query(`insert into logs set ? `, [obj], (err, res) => {
    console.log(err);
    if (err) {
      response = {
        code: 99,
        message: "Fail",
      };
    } else {
      response = {
        code: 0,
        message: "Success",
        res: res,
      };
    }
    return console.log(response)
  });
};
Config.lotto_update = (req, result) => {
  let obj = {
    name_lotto: req.name_lotto,
    close_time: req.time_close,
    time_Announcement: req.Announcement,
    update_date: moment
      .utc(moment.utc().format())
      .local()
      .format("YYYY-MM-DD HH:mm:ss"),
    dl: req.dl,
    active: req.status,
  };
  connection.query(
    `update   lotto set ? where id = ${req.id}`,
    [obj],
    (err, res) => {
      console.log(err);
      if (err) {
        response = {
          code: 99,
          message: "Fail",
        };
      } else {
        response = {
          code: 0,
          message: "Success",
          res: res,
        };
      }
      return result(null, response);
    }
  );
};

Config.get_lotto = (data, result) => {
  let sql = ` select * from lotto  `;
  sql += `where dl = 0 order by  create_date DESC`;
  connection.query(sql, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: "Fail",
      };
    } else {
      response = {
        code: 0,
        message: "Success",
        res: res,
      };
    }
    return result(null, response);
  });
};

Config.get_show = (data, result) => {
  let sql = ` select numberset,active,status,work_date from lotto_set where active = 1  `;
  connection.query(sql, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: "Fail",
      };
    } else {
      response = {
        code: 0,
        message: "Success",
        res: res,
      };
    }
    return result(null, response);
  });
};

Config.get_annountment = (data, result) => {
  let sql = ` select close_time,time_Announcement from lotto  `;
  connection.query(sql, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: "Fail",
      };
    } else {
      response = {
        code: 0,
        message: "Success",
        res: res,
      };
    }
    return result(null, response);
  });
};

Config.get_previous = (data, result) => {
  let date = moment.utc(moment.utc().format()).local().format("YYYY-MM-DD");
  let sql = ` select numberset,work_date from lotto_set where work_date < '${date}' GROUP by work_date desc `;
  connection.query(sql, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: "Fail",
      };
    } else {
      response = {
        code: 0,
        message: "Success",
        res: res,
      };
    }
    return result(null, response);
  });
};

module.exports = Config;
