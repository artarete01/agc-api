const crypto = require("crypto");
const request = require("request");
const connection = require("../config/db")
const news = require("../models/news.models");
const moment = require("moment-timezone");
const e = require("express");
const { Z_ASCII } = require("zlib");
const axios = require("axios");

exports.show_news = async (req, rest) => {
  news.show_news(request, async (err, res) => {
    rest.send(res);
  });
};
exports.insert_news = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  news.insert_news(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_news = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  news.update_news(request, async (err, res) => {
    rest.send(res);
  });
};
exports.delete_news = async (req, rest) => {
  console.log(req.params.id);
  var request = req.params.id;
  news.delete_news(request, async (err, res) => {
    rest.send(res);
  });
};
exports.show_news_content = async (req, rest) => {
  console.log(req.params.id);
  var request = req.params.id;
  news.show_news_content(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_news_content = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  news.update_news_content(request, async (err, res) => {
    rest.send(res);
  });
};