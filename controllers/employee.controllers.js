const express = require("express");
const axios = require("axios");
const moment = require("moment");
const authenmodel = require("../models/authen.models");
const employee_model = require("../models/employee.models");
const randomstring = require("randomstring");
const crypto = require("crypto");
const Config = require("../models/config_lotto.models");
var response = {};

exports.show_employee = async (req, res) => {
  var mydetail = await authen_get_token(req.body);

  if (mydetail.code != 0) {
    return mydetail;
  }
  let token_detail = mydetail["res"];
  console.log(token_detail)
  employee_model.show_employee(
    token_detail,
    req.body.request,
    async (err, res_show_employee) => {
      res.send(res_show_employee);
    }
  );
};

exports.checktoken = async (req, res) => {
  var mydetail = await authen_get_token(req.body);
  let token_detail = mydetail;
  res.send(token_detail)
};


exports.add_employee = async (req, res) => {
  // Check Balance Lastest
  let chk_token_detail = await authen_get_token(req.body);

  if (chk_token_detail["code"] != 0) {
    return res.send(chk_token_detail);
  }

  let chk_emp = await authen_chk_password(req.body);
  if (chk_emp["code"] != 0) {
    return res.send(chk_emp);
  }

  let method = "be/employee/add_employee";
  let token_detail = chk_token_detail["res"];

  var request = req.body.request;
  let today_datetime = moment
    .utc(moment.utc().format())
    .local()
    .format("YYYY-MM-DD HH:mm:ss");

  request.Username = request.Username.trim();
  request.Username = request.Username.toLowerCase();

  let chk_username = await checkusername(request);
 
  if (chk_username["res"].length != 0) {
    response = {
      code: 1000,
      message: "Username Duplicated",
      res: {
        username: req.body.Username,
      },
    };
    res.send(response);
    return;
  }

  if (chk_username.code != 0) {
    response = {
      code: 1000,
      message: "Username Duplicated",
      res: {
        username: req.body.Username,
      },
    };
    res.send(response);
    return;
  }

  var Token = randomstring.generate(100);
  var data = {
    name: request.Name,
    email: request.Email,
    Username: request.Username,
    IsActive: request.IsActive,
    PmsId: request.PmsId,
    CreateDate: today_datetime,
    Token: Token,

  };
  if (request.Password) {
    var password = request.Password.trim();
    if (password.length > 0) {
      data.Salt = crypto.randomBytes(16).toString("hex");
      data.Hash = crypto
        .pbkdf2Sync(password, data.Salt, 1000, 64, `sha512`)
        .toString(`hex`);
    }
  }
  employee_model.add_employee(
    data,
    request,
    token_detail,
    async (err, res_add_employee) => {
      res.send(res_add_employee);
      id_table = res_add_employee.res.insertId
      Config.insert_logs(request,'INSERT','กดเพิ่มผู้ใช้งาน '+request.Name+' หน้าเพิ่มผู้ใช้งาน','Admin',id_table,'employee/add_employee');
      return;
    }
  );
};
exports.update_employee = async (req, res) => {
  let chk_token_detail = await authen_get_token(req.body);

  if (chk_token_detail["code"] != 0) {
    return res.send(chk_token_detail);
  }

  let chk_emp = await authen_chk_password(req.body);
  if (chk_emp["code"] != 0) {
    return res.send(chk_emp);
  }

  let method = "be/employee/update_employee";
  let token_detail = chk_token_detail["res"];
  let log_id = await insert_log(method, token_detail, req.body);

  var request = req.body.request;
  let today_datetime = moment
    .utc(moment.utc().format())
    .local()
    .format("YYYY-MM-DD HH:mm:ss");

  if (!request.AdminId) {
    response = {
      code: 0,
      message: "Format id Invalid",
      res: [],
    };
    res.send(response);
    return;
  }

  let chk_username = await checkusername(request);

  if (chk_username.code == 0) {
    response = {
      code: 1000,
      message: "Username Not Found",
      res: {
        username: req.body.Username,
      },
    };
    res.send(response);
    return;
  }

  let chk_level = await checklevel(request);

  if (chk_level.code != 0) {
    response = chk_level;
    res.send(response);
    return;
  }

  if (request.PmsId < 2) {
    response = {
      code: 1000,
      message: "Permission Invalid",
      res: [],
    };
    res.send(response);
    return;
  }

  if (chk_level["res"].Level < token_detail.Level) {
    response = {
      code: 1000,
      message: "Level lower than update",
      res: [],
    };
    res.send(response);
    return;
  }

  if (request.Password) {
    var password = request.Password.trim();
    if (password.length > 0) {
      var salt = crypto.randomBytes(16).toString("hex");
      var Hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
        .toString(`hex`);
    }
  }
  if (request.Password == "") {
    var data = {
      email: request.Email,
      name: request.Name,
      IsActive: request.IsActive,
      PmsId: request.PmsId,
      lastupdate: today_datetime,
    };
  } else {
    var data = {
      email: request.Email,
      name: request.Name,
      IsActive: request.IsActive,
      PmsId: request.PmsId,
      lastupdate: today_datetime,
      Hash: Hash,
      Salt: salt,
    };
  }

  employee_model.update_employee(
    data,
    request,
    token_detail,
    async (err, resUserList) => {
      res.send(resUserList);
      if(request.Password == "" || request.Password == undefined){
        Config.insert_logs(request,'UPDATE','กดแก้ไขผู้ใช้งาน '+request.Name+' หน้าแก้ไขข้อมูลผู้ใช้งาน','Admin',request.AdminId,'employee/update_employee');
      } else {
        Config.insert_logs(request,'UPDATE','กดแก้ไขรหัสผ่าน '+request.Name+' หน้าเปลี่ยนแปลงรหัสผ่าน','Admin',request.AdminId,'employee/update_employee');
      }
    }
  );
};

exports.update_password = async (req, res) => {
  let chk_token_detail = await authen_get_token(req.body);

  if (chk_token_detail["code"] != 0) {
    return res.send(chk_token_detail);
  }

  var request = req.body.request;
  let method = "be/employee/update_password";
  let token_detail = chk_token_detail["res"];
  let log_id = await insert_log(method, token_detail, req.body);

  if (!request) {
    response = {
      code: 1011,
      message: "Format Invalid",
      res: [],
    };
    return res.send(response);
  }

  var newpassword = request.newpassword.trim();
  var oldpassword = request.oldpassword.trim();
  if (newpassword.length < 4 || newpassword.length > 20) {
    response = {
      code: 2011,
      message: "character minimum or maximum is wrong",
      res: [],
    };
    return res.send(response);
  }
  var oldsalt = token_detail["Salt"];
  oldpassword = crypto
    .pbkdf2Sync(oldpassword, oldsalt, 1000, 64, `sha512`)
    .toString(`hex`);

  if (token_detail["Hash"] != oldpassword) {
    response = {
      code: 1011,
      message: "old Password is wrong",
      res: [],
    };
    return res.send(response);
  }
  var newsalt = crypto.randomBytes(16).toString("hex");
  newpassword = crypto
    .pbkdf2Sync(newpassword, newsalt, 1000, 64, `sha512`)
    .toString(`hex`);
  var data = {
    newpassword: newpassword,
    salt: newsalt,
  };
  employee_model.update_password(
    data,
    token_detail,
    async (err, resUserList) => {
      res.send(resUserList);
    }
  );
};

//---- ---- ---- ----
// Author: Big
// Date: 2021-05-21
//---- ---- ---- ----
exports.CheckPassword = async (req, res) => {
  let DataBody = req.body;
  employee_model.findOne(DataBody.token, (err, user) => {
    if (user.length <= 0) {
      res.send({
        code: 1001,
        result: {
          message: "User not found.",
        },
      });
    } else {
      employee_model.ValidPassword(
        DataBody.data.Password,
        user[0].EmployeeId,
        user[0].Hash,
        user[0].Salt,
        (err, ResAuth) => {
          if (ResAuth) {
            res.send({
              code: 1000,
              result: {
                message: "Success",
              },
            });
          } else {
            res.send({
              code: 1002,
              result: {
                message: "Wrong Password",
              },
            });
          }
        }
      );
    }
  });
};

async function checkusername(Username) {
  return new Promise(function (resolve, reject) {
    employee_model.checkusername(Username, (err, responUser) => {
      resolve(responUser);
    });
  });
}

async function checklevel(request) {
  return new Promise(function (resolve, reject) {
    authenmodel.checklevel(request, (err, responLog) => {
      resolve(responLog);
    });
  });
}

async function insert_log(method, token_detail, request) {
  return new Promise(function (resolve, reject) {
    authenmodel.insert_log(method, token_detail, request, (err, responLog) => {
      resolve(responLog);
    });
  });
}

async function authen_get_token(req) {
  return new Promise(function (resolve, reject) {
    authenmodel.get_tokendetail(req, (err, result) => {
      resolve(result);
    });
  });
}

async function authen_chk_password(my_detail) {
  return new Promise(function (resolve, reject) {
    authenmodel.chk_password(my_detail, (err, result) => {
      resolve(result);
    });
  });
}
