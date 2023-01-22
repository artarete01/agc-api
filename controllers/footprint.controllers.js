const crypto = require("crypto");
const request = require("request");
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
exports.show_group_footprint = async (req, rest) => {
  footprint.show_group_footprint(request, async (err, res) => {
    rest.send(res);
  });
};
exports.insert_group_footprint = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  footprint.insert_group_footprint(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_group_footprint = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  footprint.update_group_footprint(request, async (err, res) => {
    rest.send(res);
  });
};
exports.delete_group_footprint = async (req, rest) => {
  console.log(req.params.id);
  var request = req.params.id;
  footprint.delete_group_footprint(request, async (err, res) => {
    rest.send(res);
  });
};
exports.show_footprint_detail = async (req, rest) => {
  console.log(req.params.id);
  var request = req.params.id;
  footprint.show_footprint_detail(request, async (err, res) => {
    rest.send(res);
  });
};