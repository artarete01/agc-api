const connection = require("../config/db");
const axios = require("axios");
const crypto = require("crypto");
const moment = require("moment-timezone");

// constructor
const authen = {};
var response = {};

authen.get_tokendetail = (req, result) => {
  if (!req.token) {
    response = {
      code: 9000,
      message: "Token Invalid",
      res: [],
    };
    return result(null, response);
  }

  let sql_select = `SELECT * `;
  sql_select += "FROM Admin ";
  sql_select += ` LEFT JOIN Permission ON Permission.PmsId = Admin.PmsId `;
  sql_select += `WHERE Token LIKE '${req.token}' `;
  connection.query(sql_select, (error, res) => {
    if (error) {
      response = {
        code: 99,
        message: "Failed",
        res: [],
      };
      return result(null, response);
    } else {
      if (res.length == 0) {
        response = {
          code: 9000,
          message: "Session Expried",
          res: [],
        };
        return result(null, response);
      } else {
        response = {
          code: 0,
          message: "success",
          res: res[0],
        };
        return result(null, response);
      }
    }
  });
};
authen.checktokenadmin_aff = (req, result) => {
  if (!req.token) {
    response = {
      code: 9000,
      message: "Token Invalid",
      res: [],
    };
    return result(null, response);
  }

  let sql_select = `SELECT * `;
  sql_select += "FROM Admin ";
  sql_select += ` LEFT JOIN Permission ON Permission.PmsId = Admin.PmsId `;
  sql_select += `WHERE Token LIKE '${req.token}' `;
  connection.query(sql_select, (error, res) => {
    if (error) {
      response = {
        code: 99,
        message: "Failed",
        res: [],
      };
      return result(null, response);
    } else {
      if (res.length == 0) {
        let sql = `SELECT * `;
        sql += "FROM Affiliate ";
        sql += ` LEFT JOIN Permission ON Permission.PmsId = Affiliate.PmsId `;
        sql += `WHERE Token LIKE '${req.token}' `;
        connection.query(sql, (error, res) => {
          if (error) {
            response = {
              code: 99,
              message: "Failed",
              res: [],
            };
            return result(null, response);
          } else {
            response = {
              code: 0,
              message: "success",
              res: res[0],
            };
            return result(null, response);
          }
        });
      } else {
        response = {
          code: 0,
          message: "success",
          res: res[0],
        };
        return result(null, response);
      }
    }
  });
};

authen.authen_get_token_aff = (req, result) => {
  if (!req.token) {
    response = {
      code: 9000,
      message: "Token Invalid",
      res: [],
    };
    return result(null, response);
  }

  let sql_select = `SELECT * `;
  sql_select += "FROM Affiliate ";
  sql_select += ` LEFT JOIN Permission ON Permission.PmsId = Affiliate.PmsId `;
  sql_select += `WHERE Token LIKE '${req.token}' `;
  connection.query(sql_select, (error, res) => {
    if (error) {
      response = {
        code: 99,
        message: "Failed",
        res: [],
      };
      return result(null, response);
    } else {
      if (res.length == 0) {
        response = {
          code: 9000,
          message: "Session Expried",
          res: [],
        };
        return result(null, response);
      } else {
        response = {
          code: 0,
          message: "success",
          res: res[0],
        };
        return result(null, response);
      }
    }
  });
};

authen.get_tokendetail_aff = (req, result) => {
  if (!req.token) {
    response = {
      code: 9000,
      message: "Token Invalid",
      res: [],
    };
    return result(null, response);
  }

  let sql_select = `SELECT * `;
  sql_select += "FROM Affiliate ";
  sql_select += ` LEFT JOIN Permission ON Permission.PmsId = Affiliate.PmsId `;
  sql_select += `WHERE Token LIKE '${req.token}' `;
  connection.query(sql_select, (error, res) => {
    if (error) {
      response = {
        code: 99,
        message: "Failed",
        res: [],
      };
      return result(null, response);
    } else {
      if (res.length == 0) {
        var sql = "SELECT * FROM Admin ";
        sql += ` LEFT JOIN Permission ON Permission.PmsId = Admin.PmsId `;
        sql += `WHERE Token LIKE '%${req.token}%' `;
        connection.query(sql, (error, res) => {
          console.log(error);
          if (error) {
          } else {
            response = {
              code: 0,
              message: "success",
              res: res[0],
            };
            return result(null, response);
          }
        });
      } else {
        response = {
          code: 0,
          message: "success",
          res: res[0],
        };
        return result(null, response);
      }
    }
  });
};
authen.checklevel = (request, result) => {
  if (!request.PmsId) {
    response = {
      code: 1000,
      message: "Format Invalid",
      res: [],
    };
    return result(null, response);
  }

  let sql_select = `SELECT * `;
  sql_select += "FROM Permission ";
  sql_select += `WHERE PmsId = '${request.PmsId}' `;

  connection.query(sql_select, (error, res) => {
    if (error) {
      response = {
        code: 99,
        message: "Failed",
        res: [],
      };
      return result(null, response);
    } else {
      if (res.length == 0) {
        response = {
          code: 9000,
          message: "No Permission",
          res: [],
        };
        return result(null, response);
      } else {
        response = {
          code: 0,
          message: "No Permission",
          res: res[0],
        };
        return result(null, response);
      }
    }
  });
};

authen.chk_password = (req, result) => {
  if (!req.Password) {
    response = {
      code: 1000,
      message: "Format Invalid",
      res: [],
    };
    return result(null, response);
  }

  let sql_select = `SELECT AdminId , Username , Hash , Salt , PmsId , IsActive `;
  sql_select += "FROM Admin ";
  sql_select += `WHERE token LIKE '${req.token}' `;

  connection.query(sql_select, (error, res) => {
    if (error) {
      response = {
        code: 99,
        message: "Failed",
        res: [],
      };
      return result(null, response);
    } else {
      if (res.length == 0) {
        response = {
          code: 9000,
          message: "Session Expried",
          res: [],
        };
        return result(null, response);
      }
      res = check_password(req, res[0]);
      return result(null, res);
    }
  });
};

authen.insertlogupdate = (
  token_detail,
  user_id = 0,
  username = "",
  method,
  data_update,
  ipaddress,
  result
) => {
  let today_datetime = moment
    .utc(moment.utc().format())
    .local()
    .format("YYYY-MM-DD HH:mm:ss");
  let sql = `INSERT IGNORE INTO zlogupdate (`;
  sql += `emp_id,emp_username,member_id,member_username , `;
  sql += `method,data_update , `;
  sql += `ip , create_datetime , status `;
  sql += `) VALUES (?,?,?,?,?,?,?,?,?)`;
  connection.query(
    sql,
    [
      token_detail["EmployeeId"],
      token_detail["Username"],
      user_id,
      username,
      method,
      JSON.stringify(data_update),
      ipaddress,
      today_datetime,
      1,
    ],
    (err, res) => {
      return result(null, res["insertId"]);
    }
  );
};

authen.insert_log = (method, token_detail, request, result) => {
  if (request == undefined) {
    let response = {
      code: "100",
      message: "Format Invalid",
      res: request,
    };
    return result(null, response);
  }

  let today_date = moment
    .utc(moment.utc().format())
    .local()
    .format("YYYY-MM-DD HH:mm:ss");
  let sql = `INSERT IGNORE INTO zlogupdate (method,`;
  if (
    token_detail["AdminId"] != undefined &&
    token_detail["Username"] != undefined
  ) {
    sql += ` emp_id,emp_username ,`;
  }
  sql += ` data_update, `;
  sql += ` Create_datetime , `;
  sql += ` site_type) `;
  sql += ` VALUES `;
  sql += ` ( `;
  sql += ` '${method}', `;
  if (
    token_detail["AdminId"] != undefined &&
    token_detail["Username"] != undefined
  ) {
    sql += ` ${token_detail["AdminId"]}  ,'${token_detail["Username"]}' , `;
  }

  sql += ` '${JSON.stringify(request)}' , `;
  sql += ` '${today_date}' ,`;
  sql += ` 1 `;
  sql += ` ) `;

  connection.query(sql, (err, res_log) => {
    return result(null, 's');
  });
};

function check_password(req, res) {
  let inp_password = req["Password"];
  let my_password = res["Hash"];
  let my_salt = res["Salt"];
  let response = {};

  let inp_password_hash = crypto
    .pbkdf2Sync(inp_password, my_salt, 1000, 64, `sha512`)
    .toString(`hex`);

  if (my_password != inp_password_hash) {
    response = {
      code: 1010,
      message: "Password Wrong",
      res: [],
    };
    return response;
  }

  response = {
    code: 0,
    message: "success",
    res: [],
  };
  return response;
}

function show_hash_password(req, res) {
  let inp_password = req["password"];
  let my_password = res["Password"];
  let my_salt = res["salt"];
  let response = {};

  let inp_password_hash = crypto
    .pbkdf2Sync(inp_password, my_salt, 1000, 64, `sha512`)
    .toString(`hex`);

  if (my_password != inp_password_hash) {
    response = {
      code: 1010,
      message: "Password Wrong",
      res: [],
    };
    return response;
  }

  response = {
    code: 0,
    message: "success",
    res: [],
  };
  return response;
}

module.exports = authen;
