
const connection = require("../config/db");
const crypto = require('crypto');
const moment = require('moment-timezone');
const randomstring = require("randomstring")
// Constructor
const Auth = {};



Auth.adminfindOne = (data, result) => {
  connection.query(`select * from Admin where Username LIKE '${data.username}'`, (err, res) => {
    if (err) {
      return result(null, err);
    } else {
      return result(null, res);
    }
  });
}

// Examlple
Auth.findOne = (data, result) => {
  connection.query(`select * from Affiliate where UsernameRef LIKE '${data.username}'`, (err, res) => {
    if (err) {
      return result(null, err);
    } else {
      return result(null, res);
    }
  });
}

Auth.ValidPassword = (data, result) => {
  var salt = data['Salt'];
  password = crypto.pbkdf2Sync(data.password, salt,
    1000, 64, `sha512`).toString(`hex`);
  if (data.hash != password) {
    response = {
      "code": 1013,
      "message": "Password is False",
      "res": []
    }
    return result(null, response)
  }
  connection.query(`select * from Affiliate where hash = '${password}'`, (err, res) => {
    if (err) {
      return result(null, err);
    } else {
      if (res[0].Token == null || res[0].Token == "" ) {
        let Token = randomstring.generate(100)
        connection.query(`UPDATE Affiliate SET Token = '${Token}', LastLogin = '${moment.utc(moment.utc().format()).local().format('YYYY-MM-DD HH:mm:ss')}' WHERE AffId = '${res[0].AffId}'`, (err, res) => {
          if (err) {
            return result(null, response = { "code": 9001, "message": "not success", "res": [] });
          } else {
           
           
            connection.query(`select * from Affiliate where hash = '${password}'`, (err, rea) => {
              return result(null, response = { "code": 0, "message": "Success Password", "res": rea });
            });

          }

        });
        
      }

      else {
        connection.query(`UPDATE Affiliate SET  LastLogin = '${moment.utc(moment.utc().format()).local().format('YYYY-MM-DD HH:mm:ss')}' WHERE AffId = '${res[0].AffId}'`, (err, res) => { });
        response = {
          "code": 0,
          "message": "Success Password",
          "res": res
        }
        return result(null, response)
      }

    }
  });

}

Auth.findOne_admin = (data, result) => {
  connection.query(`select * from Admin where Username LIKE '${data.username}'`, (err, res) => {
    if (err) {
      return result(null, err);
    } else {
      return result(null, res);
    }
  });
}

Auth.ValidPassword_admin = (data, result) => {
  var salt = data['Salt'];
  password = crypto.pbkdf2Sync(data.password, salt,
    1000, 64, `sha512`).toString(`hex`);
  if (data.hash != password) {
    response = {
      "code": 1013,
      "message": "Password is False",
      "res": []
    }
    return result(null, response)
  }
  connection.query(`select * from Admin where Hash = '${password}'`, (err, res) => {
    if (err) {
      return result(null, err);
    } else {
      if (res[0].Token == null || res[0].Token == "" ) {
        let Token = randomstring.generate(100)
        connection.query(`UPDATE Admin SET Token = '${Token}', LastLogin = '${moment.utc(moment.utc().format()).local().format('YYYY-MM-DD HH:mm:ss')}' WHERE AdminId = '${res[0].AffId}'`, (err, res) => {
          if (err) {
            return result(null, response = { "code": 9001, "message": "not success", "res": [] });
          } else {
          
            connection.query(`select * from Admin where Hash = '${password}'`, (err, rea) => {
              return result(null, response = { "code": 0, "message": "Success Password", "res": rea });
            });

          }

        });
        
      }

      else {
        connection.query(`UPDATE Admin SET  LastLogin = '${moment.utc(moment.utc().format()).local().format('YYYY-MM-DD HH:mm:ss')}' WHERE AdminId = '${res[0].AffId}'`, (err, res) => { });
        response = {
          "code": 0,
          "message": "Success Password",
          "res": res
        }
        return result(null, response)
      }

    }
  });

}
module.exports = Auth;



