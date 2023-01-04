const connection = require("../config/db")
const axios = require("axios");
const moment = require('moment-timezone');
const crypto = require('crypto')
var qs = require('qs');

// constructor
const employee = {};
var response = {}


function sql_getemployeelist() {
    let sql_arr = [];
    sql_arr.push('AdminId');
    sql_arr.push('Username');
    sql_arr.push('IsActive');
    let slt = sql_arr.join();

    return slt;
}

employee.show_permission = (mydetail, req, res) => {
    let sqlemp = `SELECT * ,ROW_NUMBER() OVER(ORDER BY Level DESC) as id `
    sqlemp += ' FROM Permission '
    sqlemp += ` WHERE StatusActive = 1 `
    sqlemp += ` AND Level > '${mydetail['Level']}' order by Level desc`
    connection.query(sqlemp, (err, res_userlist) => {
        if (err) {
            response = {
                "code": 99,
                "message": "Fail",
                "res": []
            }
        } else {
            response = {
                "code": 0,
                "message": "Success",
                "res": res_userlist
            }
        }
        return res(null, response)
    });

}

employee.add_permission = (mydetail, req, res) => {
    let sqlemp = `SELECT PmsId,PmsName `
    sqlemp += ' FROM Permission '
    sqlemp += `WHERE StatusActive = 1 `
    sqlemp += ` AND Level > '${mydetail['Level']}'`

    connection.query(sqlemp, (err, res_userlist) => {
        if (err) {
            response = {
                "code": 99,
                "message": "Fail",
                "res": []
            }
        } else {
            response = {
                "code": 0,
                "message": "Success",
                "res": res_userlist
            }
        }
        return res(null, response)
    });

}

employee.check_employee_export = (mydetail, result) => {
    let sqlemp = `SELECT * FROM permission where PermissionId = '${mydetail['Permission']}'`
    connection.query(sqlemp, (err, res) => {
        if (err) {
            response = {
                "code": 99,
                "message": "Fail",

            }
        } else {
            response = {
                "code": 0,
                "message": "Success",
                "res": res
            }
        }
        return result(null, response)
    });
}

employee.show_employee = (mydetail, req, res) => {
    if (req == undefined) {
        response = {
            "code": 100,
            "message": "Format Invalid",
            "res": req
        }
        return res(null, response)
    }
    var sel = sql_getemployeelist();
    let sqlemp = `SELECT Permission.* , Admin.name ,Admin.email ,` + sel
    sqlemp += ' FROM Admin '
    sqlemp += 'LEFT JOIN Permission ON Permission.PmsId = Admin.PmsId '
    sqlemp += `WHERE `
    sqlemp += ` Admin.PmsId >= ${mydetail['PmsId']}`
    if (req.PmsId == undefined || req.PmsId == '') {

    } else {
        sqlemp += ` AND PmsId LIKE '${req['PmsId']}'`
    }
    if (req.search_admin != '') {
        sqlemp += ` AND (Username LIKE '${req.search_admin}' or name LIKE '${req.search_admin}')`
    } else {
    }
    if (req.id == undefined || req.id == '') {

    } else {
        sqlemp += ` AND AdminId LIKE '${req['id']}'`
    }

    if (req.status == 0 || req.status == 1 || req.status == 2) {
        sqlemp += ` AND AdminId.IsActive LIKE '${req['status']}'`
    } else {

    }

    if (req.Username == undefined || req.Username.length <= 3) {
    } else {
        sqlemp += ` AND Username LIKE '${req['Username']}'`
    }

    sqlemp += ' ORDER BY AdminId '

    if (req.limit == '' || req.limit == undefined) {

    } else {
        sqlemp += ` limit ${req['limit']}`
    }
    connection.query(sqlemp, (err, res_userlist) => {
        if (err) {
            response = {
                "code": 99,
                "message": "Fail",
                "res": []
            }
        } else {
            response = {
                "code": 0,
                "message": "Success",
                "res": res_userlist
            }
        }
        return res(null, response)
    });

}

employee.add_employee = (req, body, token_detail, result) => {
    var today_datetime = moment.utc(moment.utc().format()).local().format('YYYY-MM-DD HH:mm:ss')
    let sqlinsert = "INSERT IGNORE INTO Admin set ? ";
    connection.query(sqlinsert, req, (error, rs, fields) => {
        if (error) {
            response = {
                "code": 99,
                "message": "Fail",
                "res": [],
            }
        } else {
            req['id'] = rs['insertId']
            response = {
                "code": 0,
                "message": "Success",
                "res": rs,
            }
        }
        return result(null, response)
    })
}

employee.update_employee = (req, body, token_detail, result) => {
    if (req == undefined) {
        let response = {
            "code": '100',
            "message": "Format Invalid",
            "res": req
        }
        return result(null, response)
    }
    let id = body.AdminId;
    connection.query('UPDATE Admin SET ? WHERE AdminId = ?', [req, id], (error, res) => {
        if (error) {
            response = {
                "code": 99,
                "message": "Fail edit",
                "res": [],
            }
        } else {
            response = {
                "code": 0,
                "message": "Success",
                "res": [],
            }
        }
        return result(null, response)
    });
}

function sel_user_detail(type = 0) {
    let sql_arr = [];
    sql_arr.push('AdminId');
    sql_arr.push('Username');
    sql_arr.push('name');
    sql_arr.push('LastLogin');
    sql_arr.push('LastLogin');
    if (type == 1) {
        sql_arr.push('Salt');
        sql_arr.push('Hash');
    }
    let slt = sql_arr.join();

    return slt;
}


employee.update_password = (req, token_detail, result) => {

    let sql = `UPDATE Admin SET `;
    sql += ` Hash = '${req.newpassword}' , `
    sql += ` Salt = '${req.salt}'`
    sql += ` WHERE AdminId = ${token_detail['AdminId']}`

    connection.query(sql, (err, res_userlist) => {
        if (err) {
            let response = {
                "code": 9900,
                "message": "TOKEN INVALID",
                "res": res_userlist
            }
            return result(null, response);
        } else {
            let response = {
                "code": 0,
                "message": "Success",
                "res": []
            }
            return result(null, response);
        }
    });
}



employee.checkusername = (req, res) => {

    if (req == undefined) {
        let response = {
            "code": '100',
            "message": "Format Invalid",
            "res": req
        }
        return res(null, response)
    }

    let sql = `SELECT AdminId,Username,Level `
    sql += ' FROM Admin '
    sql += ' JOIN Permission ON Permission.PmsId = Admin.PmsId '
    sql += `WHERE `

    if (req['Username'] == undefined) {
    } else {
        sql += ` Username LIKE '${req['Username']}'`
    }

    if (req['AdminId'] == undefined) {
    } else {
        sql += ` AdminId = '${req['AdminId']}'`
    }

    connection.query(sql, (err, res_userlist) => {
        if (err) {
            response = {
                "code": 99,
                "message": "Failed",
                "res": []
            }
        } else {
            if (res_userlist.length > 0) {
                response = {
                    "code": 1000,
                    "message": "Username Duplicated",
                    "res": res_userlist
                }
            } else {
                response = {
                    "code": 0,
                    "message": "Success",
                    "res": []
                }
            }
            return res(null, response);
        }
    });

}

//---- ---- ---- ---- 
// Author: Big 
// Date: 2021-05-21 
//---- ---- ---- ----

employee.findOne = (data, result) => {
    connection.query(`SELECT * FROM employee WHERE Token = '${data}'`, (err, res) => {
        if (err) {
            return result(null, err)
        } else {
            return result(null, res)
        }
    });
}

employee.ValidPassword = (Password, EmployeeId, Hash, Salt, result) => {
    var hash = crypto.pbkdf2Sync(Password, Salt, 1000, 64, `sha512`).toString(`hex`);
    var Token = crypto.randomBytes(64).toString('hex');
    if (Hash === hash) {
        return result(null, Hash === hash);
    } else {
        return result(null, 0);
    }

}


module.exports = employee;
