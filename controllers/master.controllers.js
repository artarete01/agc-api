const crypto = require("crypto");
const request = require("request");
const authenmodel = require("../models/authen.models");
const connection = require("../config/db")
const master = require("../models/master.models");
const moment = require("moment-timezone");
const e = require("express");
const { Z_ASCII } = require("zlib");
const axios = require("axios");

exports.show_master_region = async (req, rest) => {
  master.show_master_region(request, async (err, res) => {
    rest.send(res);
  });
};

exports.show_master_province = async (req, rest) => {
  master.show_master_province(request, async (err, res) => {
    rest.send(res);
  });
};