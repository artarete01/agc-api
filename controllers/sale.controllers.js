const crypto = require("crypto");
const request = require("request");
const connection = require("../config/db")
const sale = require("../models/sale.models");
const moment = require("moment-timezone");
const e = require("express");
const { Z_ASCII } = require("zlib");
const axios = require("axios");

exports.show_sale_channel = async (req, rest) => {
  sale.show_sale_channel(request, async (err, res) => {
    rest.send(res);
  });
};

exports.insert_sale_channel = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  sale.insert_sale_channel(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_sale_channel = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  sale.update_sale_channel(request, async (err, res) => {
    rest.send(res);
  });
};
exports.delete_sale_channel = async (req, rest) => {
  console.log(req.params.id);
  var request = req.params.id;
  sale.delete_sale_channel(request, async (err, res) => {
    rest.send(res);
  });
};