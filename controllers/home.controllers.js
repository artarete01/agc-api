const crypto = require("crypto");
const request = require("request");
const connection = require("../config/db")
const home = require("../models/home.models");
const moment = require("moment-timezone");
const e = require("express");
const { Z_ASCII } = require("zlib");
const axios = require("axios");

exports.show_home_banner = async (req, rest) => {
  home.show_home_banner(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_home_banner = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  home.update_home_banner(request, async (err, res) => {
    rest.send(res);
  });
};
exports.show_home_group_product = async (req, rest) => {
  home.show_home_group_product(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_home_group_product = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  home.update_home_group_product(request, async (err, res) => {
    rest.send(res);
  });
};