const crypto = require('crypto');
const request = require('request');
const Auth = require("../models/auth.models");
const authenmodel = require("../models/authen.models");
const Config = require("../models/config_lotto.models");
const moment = require('moment-timezone');


exports.show_layout = async (req, resultres) => {
    let chk_token_detail = await checktokenadmin_aff(req.body)
    if (chk_token_detail['code'] != 0) {
        return resultres.send(chk_token_detail)
    }
    var data = chk_token_detail
    return resultres.send(data)
}
async function checktokenadmin_aff(req) {
    return new Promise(function (resolve, reject) {
        authenmodel.checktokenadmin_aff(req, (err, result) => {
            resolve(result);
        })
    })
}

exports.adminCheckLogin = async (req, ressend) => {
    Auth.adminfindOne(req.body, (err, user) => {
        if (user.length <= 0) {
            ressend.send({
                code: 100,
                res: {
                    message: "User not found."
                }
            });
        } else {
            if (user[0].IsActive == 0 || user[0].IsActive == '0') {
                ressend.send({
                    code: 0,
                    res: {
                        message: "User Suspend",
                        // Token : ResAuth[0].Token
                    }
                });
            }
            var data = {
                'password': req.body.password,
                'hash': user[0].Hash,
                'Salt': user[0].Salt,
            }
            Auth.ValidPassword(data, (err, Res) => {
                if (Res.code == 0) {
                    ressend.send({
                        code: 0,
                        res: {
                            message: "User Logged In",
                            Token: user[0].Token,
                            user:'admin',

                        }
                    });
                } else {
                    ressend.send({
                        code: 101,
                        res: {
                            message: "Wrong Password"
                        }
                    });
                }
            });
        }
    })

}
exports.CheckLogin = async (req, ressend) => {
   
    Auth.findOne(req.body, (err, user) => {
        if (user.length <= 0) {
            ressend.send({
                code: 100,
                res: {
                    message: "User not found."
                }
            });
        } else {
            if (user[0].IsActive == 0 || user[0].IsActive == '0') {
                ressend.send({
                    code: 0,
                    res: {
                        message: "User Suspend",
                        // Token : ResAuth[0].Token
                    }
                });
            }
            var data = {
                'password': req.body.password,
                'hash': user[0].Hash,
                'Salt': user[0].Salt,
            }
            Auth.ValidPassword(data, (err, Res) => {
                if (Res.code == 0) {
                    ressend.send({
                        code: 0,
                        res: {
                            message: "User Aff Logged In",
                            Token: user[0].Token
                        }
                    });
                } else {
                    ressend.send({
                        code: 101,
                        res: {
                            message: "Wrong Password"
                        }
                    });
                }
            });
        }
    })

}


exports.CheckLogin_admin = async (req, ressend) => {
    Auth.findOne_admin(req.body, (err, user) => {
        if (user.length <= 0) {
            ressend.send({
                code: 100,
                res: {
                    message: "User not found."
                }
            });
        } else {
            if (user[0].IsActive == 0 || user[0].IsActive == '0') {
                ressend.send({
                    code: 0,
                    res: {
                        message: "User Suspend",
                        // Token : ResAuth[0].Token
                    }
                });
            }
            var data = {
                'password': req.body.password,
                'hash': user[0].Hash,
                'Salt': user[0].Salt,
            }
            Auth.ValidPassword_admin(data, (err, Res) => {
                if (Res.code == 0) {
                    ressend.send({
                        code: 0,
                        res: {
                            message: "User Admin Login",
                            Token: Res.res[0].Token
                        }
                    });
                    var request = {
                        Username: Res.res[0].Username,
                        create_by : Res.res[0].Username,
                    }
                    Config.insert_logs(request,'POST',Res.res[0].Username+' เข้าสู่ระบบ เวลา '+moment.utc(moment.utc().format()).local().format('YYYY-MM-DD HH:mm:ss'),'Admin',Res.res[0].AdminId,'Auth/CheckLogin_admin');
                } else {
                    ressend.send({
                        code: 101,
                        res: {
                            message: "Wrong Password"
                        }
                    });
                }
            });
        }
    })

}

exports.logout = async (req, rest) => {
    let chk_token_detail = await authen_get_token(req.body);

    if (chk_token_detail["code"] != 0) {
      return rest.send(chk_token_detail);
    }
  
    var request = req.body.request;

    Config.insert_logs(request,'POST',request.create_by+' ออกจากระบบ เวลา '+moment.utc(moment.utc().format()).local().format('YYYY-MM-DD HH:mm:ss'),'Admin',request.AdminId,'employee/logout')
};

// exports.CheckAuth = async (req, res) => {
//   Auth.findToken(req.body.Token, (err, resToken) => {
//     if(resToken.length > 0) {
//       res.send({
//         code : 0,
//         message : "Aviable Token"
//       })
//     } else {
//       res.send({
//         code : 100,
//         message : "Not Aviable Token"
//       })
//     }
//   })
// }

exports.CheckAuth = async (req, res) => {
    Auth.findToken(req.body.Token, (err, resToken) => {
        if (resToken.length > 0) {
            res.send({
                code: 0,
                message: "Aviable Token"
            })
        } else {
            res.send({
                code: 100,
                message: "Not Aviable Token"
            })
        }
    })
}

async function authen_get_token(req) {
    return new Promise(function (resolve, reject) {
      authenmodel.get_tokendetail(req, (err, result) => {
        resolve(result);
      });
    });
  }

