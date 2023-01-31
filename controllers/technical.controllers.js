const crypto = require("crypto");
const request = require("request");
const connection = require("../config/db")
const technical = require("../models/technical.models");
const moment = require("moment-timezone");
const e = require("express");
const { Z_ASCII } = require("zlib");
const axios = require("axios");

exports.show_technical = async (req, rest) => {
  technical.show_technical(request, async (err, res) => {
    rest.send(res);
  });
};
exports.insert_technical = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  technical.insert_technical(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_technical = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  technical.update_technical(request, async (err, res) => {
    rest.send(res);
  });
};
exports.delete_technical = async (req, rest) => {
  console.log(req.params.id);
  var request = req.params.id;
  technical.delete_technical(request, async (err, res) => {
    rest.send(res);
  });
};
exports.show_group_technical = async (req, rest) => {
  technical.show_group_technical(request, async (err, res) => {
    rest.send(res);
  });
};
exports.insert_group_technical = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  technical.insert_group_technical(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_group_technical = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  technical.update_group_technical(request, async (err, res) => {
    rest.send(res);
  });
};
exports.delete_group_technical = async (req, rest) => {
  console.log(req.params.id);
  var request = req.params.id;
  technical.delete_group_technical(request, async (err, res) => {
    rest.send(res);
  });
};
exports.show_technical_law = async (req, rest) => {
  technical.show_technical_law(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_technical_law = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  technical.update_technical_law(request, async (err, res) => {
    rest.send(res);
  });
};