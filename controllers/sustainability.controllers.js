const crypto = require("crypto");
const request = require("request");
const connection = require("../config/db")
const sustainability = require("../models/sustainability.models");
const moment = require("moment-timezone");
const e = require("express");
const { Z_ASCII } = require("zlib");
const axios = require("axios");

exports.show_sustainability = async (req, rest) => {
  sustainability.show_sustainability(request, async (err, res) => {
    rest.send(res);
  });
};
exports.insert_sustainability = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  sustainability.insert_sustainability(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_sustainability = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  sustainability.update_sustainability(request, async (err, res) => {
    rest.send(res);
  });
};
exports.delete_sustainability = async (req, rest) => {
  console.log(req.params.id);
  var request = req.params.id;
  sustainability.delete_sustainability(request, async (err, res) => {
    rest.send(res);
  });
};
exports.show_sustainability_content = async (req, rest) => {
  console.log(req.params.id);
  var request = req.params.id;
  sustainability.show_sustainability_content(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_sustainability_content = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  sustainability.update_sustainability_content(request, async (err, res) => {
    rest.send(res);
  });
};
exports.insert_group_sustainability = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  sustainability.insert_group_sustainability(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_group_sustainability = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  sustainability.update_group_sustainability(request, async (err, res) => {
    rest.send(res);
  });
};
exports.delete_group_sustainability = async (req, rest) => {
  console.log(req.params.id);
  var request = req.params.id;
  sustainability.delete_group_sustainability(request, async (err, res) => {
    rest.send(res);
  });
};
exports.show_group_sustainability = async (req, rest) => {
  console.log(req.params.id);
  var request = req.params.id;
  sustainability.show_group_sustainability(request, async (err, res) => {
    rest.send(res);
  });
};