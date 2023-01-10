const crypto = require("crypto");
const request = require("request");
const authenmodel = require("../models/authen.models");
const connection = require("../config/db")
const product = require("../models/product.models");
const moment = require("moment-timezone");
const e = require("express");
const { Z_ASCII } = require("zlib");
const axios = require("axios");

exports.show_type_product = async (req, rest) => {
  product.show_type_product(request, async (err, res) => {
    rest.send(res);
  });
};
exports.insert_type_product = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  product.insert_type_product(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_type_product = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  product.update_type_product(request, async (err, res) => {
    rest.send(res);
  });
};
exports.delete_type_product = async (req, rest) => {
  console.log(req.params.id);
  var request = req.params.id;
  product.delete_type_product(request, async (err, res) => {
    rest.send(res);
  });
};
exports.show_type_product_content = async (req, rest) => {
  console.log(req.params.id);
  var request = req.params.id;
  product.show_type_product_content(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_type_product_content = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  product.update_type_product_content(request, async (err, res) => {
    rest.send(res);
  });
};
exports.show_category_product = async (req, rest) => {
  product.show_category_product(request, async (err, res) => {
    rest.send(res);
  });
};
exports.insert_category_product = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  product.insert_category_product(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_category_product = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  product.update_category_product(request, async (err, res) => {
    rest.send(res);
  });
};
exports.delete_category_product = async (req, rest) => {
  console.log(req.params.id);
  var request = req.params.id;
  product.delete_category_product(request, async (err, res) => {
    rest.send(res);
  });
};
exports.show_findyourglass = async (req, rest) => {
  product.show_findyourglass(request, async (err, res) => {
    rest.send(res);
  });
};
exports.insert_findyourglass = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  product.insert_findyourglass(request, async (err, res) => {
    rest.send(res);
  });
};
exports.update_findyourglass = async (req, rest) => {
  console.log(req.body);
  var request = req.body.request;
  product.update_findyourglass(request, async (err, res) => {
    rest.send(res);
  });
};
exports.delete_findyourglass = async (req, rest) => {
  console.log(req.params.id);
  var request = req.params.id;
  product.delete_findyourglass(request, async (err, res) => {
    rest.send(res);
  });
};