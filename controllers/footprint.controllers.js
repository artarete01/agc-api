const crypto = require("crypto");
const request = require("request");
const authenmodel = require("../models/authen.models");
const connection = require("../config/db")
const footprint = require("../models/footprint.models");
const moment = require("moment-timezone");
const e = require("express");
const { Z_ASCII } = require("zlib");
const axios = require("axios");

exports.show_footprint = async (req, rest) => {
  footprint.show_footprint(request, async (err, res) => {
    rest.send(res);
  });
};

exports.insert_footprint = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  footprint.insert_footprint(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_footprint = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  footprint.update_footprint(request, async (err, res) => {
    rest.send(res);
  });
};
exports.delete_footprint = async (req, rest) => {
  console.log(req.params.id);
  var request = req.params.id;
  footprint.delete_footprint(request, async (err, res) => {
    rest.send(res);
  });
};