const crypto = require("crypto");
const request = require("request");
const authenmodel = require("../models/authen.models");
const connection = require("../config/db")
const Config = require("../models/config_lotto.models");
const moment = require("moment-timezone");
const e = require("express");
const { Z_ASCII } = require("zlib");
const axios = require("axios");


exports.lotto_work = async (req, rest) => {
    let chk_token_detail = await authen_get_token(req.body);

    if (chk_token_detail["code"] != 0) {
      return rest.send(chk_token_detail);
    }
  
    var request = req.body.request;
  Config.lotto_work(request, async (err, res) => {
    rest.send(res);
  });
};

exports.lotto_set_insert = async (req, rest) => {
    let chk_token_detail = await authen_get_token(req.body);

    if (chk_token_detail["code"] != 0) {
      return rest.send(chk_token_detail);
    }
  
    var request = req.body.request;
  var id_table = "";
  Config.lotto_set_insert(request, async (err, res) => {
    rest.send(res);
    id_table = res.res.insertId
    Config.insert_logs(request,'INSERT','กดเพิ่มหวยล็อควันที่ '+request.work_set+' หน้าผลหวยล็อคทั้งหมด','lotto_set',id_table,'insert/lotto_set_insert');
  });
};


exports.lotto_set_update = async (req, rest) => {
    let chk_token_detail = await authen_get_token(req.body);

    if (chk_token_detail["code"] != 0) {
      return rest.send(chk_token_detail);
    }
  
    var request = req.body.request;
  
  Config.lotto_set_update(request, async (err, res) => {
    rest.send(res);
    if(request.dl == 0){
      Config.insert_logs(request,'UPDATE','กดแก้ไขหวยล็อควันที่ '+moment(request.date).format('YYYY-MM-DD')+' หน้าผลหวยล็อคทั้งหมด','lotto_set',request.number_id,'update/lotto_set_update');
    } else {
      Config.insert_logs(request,'DELETE','กดลบหวยล็อควันที่ '+moment(request.date).format('YYYY-MM-DD')+' หน้าผลหวยล็อคทั้งหมด','lotto_set',request.number_id,'update/lotto_set_update');
    }
    
  });
  
};
exports.get_lotto_all = async (req, rest) => {
    let chk_token_detail = await authen_get_token(req.body);

    if (chk_token_detail["code"] != 0) {
      return rest.send(chk_token_detail);
    }
  
    var request = req.body.request;
  Config.get_lotto_all(request, async (err, res) => {
    rest.send(res);
  });
};

exports.get_logs = async (req, rest) => {
  let chk_token_detail = await authen_get_token(req.body);

  if (chk_token_detail["code"] != 0) {
    return rest.send(chk_token_detail);
  }

  var request = req.body.request;
Config.get_logs(request, async (err, res) => {
  rest.send(res);
});
};

exports.lotto_insert = async (req, rest) => {
    let chk_token_detail = await authen_get_token(req.body);

    if (chk_token_detail["code"] != 0) {
      return rest.send(chk_token_detail);
    }
  
    var request = req.body.request;
  Config.lotto_insert(request, async (err, res) => {
    rest.send(res);
  });
};

exports.lotto_update = async (req, rest) => {
    let chk_token_detail = await authen_get_token(req.body);

    if (chk_token_detail["code"] != 0) {
      return rest.send(chk_token_detail);
    }
  
    var request = req.body.request;
  
  Config.lotto_update(request ,async (err, res) => {
    rest.send(res);
    Config.insert_logs(request,'UPDATE','กดแก้ไขการตั้งค่าหวย เวลาประกาศหวย '+request.Announcement+'น. และเวลาปิดหวย/เปิดการแก้ไข '+request.time_close+'น. หน้าตั้งค่าหวย','lotto',request.id,'update/lotto_update');
  });
};

exports.get_lotto = async (req, rest) => {
    let chk_token_detail = await authen_get_token(req.body);

    if (chk_token_detail["code"] != 0) {
      return rest.send(chk_token_detail);
    }
  
    var request = req.body.request;
  Config.get_lotto(request ,async (err, res) => {
    rest.send(res);
  });
};

exports.get_show = async (req, rest) => {
    // let chk_token_detail = await authen_get_token(req.body);

    // if (chk_token_detail["code"] != 0) {
    //   return res.send(chk_token_detail);
    // }
  
    // var request = req.body.request;
  Config.get_show(request ,async (err, res) => {
    rest.send(res);
  });
};

exports.get_annountment_r= async (req, rest) => {
  // let chk_token_detail = await authen_get_token(req.body);

  // if (chk_token_detail["code"] != 0) {
  //   return res.send(chk_token_detail);
  // }

  // var request = req.body.request;
Config.get_annountment(request ,async (err, res) => {
  rest.send(res);
});
};

exports.get_previous = async (req, rest) => {
  // let chk_token_detail = await authen_get_token(req.body);

  // if (chk_token_detail["code"] != 0) {
  //   return res.send(chk_token_detail);
  // }

  // var request = req.body.request;
Config.get_previous(request ,async (err, res) => {
  rest.send(res);
});
};

async function authen_get_token(req) {
    return new Promise(function (resolve, reject) {
      authenmodel.get_tokendetail(req, (err, result) => {
        resolve(result);
      });
    });
  }