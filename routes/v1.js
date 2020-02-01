'use strict';

const express = require('express');
const router = express.Router();

const categories = require('../models/categories/categories.js');
const products = require('../models/products/products.js');

function getModel(req, res, next) {
  let model = req.params.model;

  switch (model) {
  case "categories":
    req.model = categories;
    return;
  case "products":
    req.model = products;
    return;
  default:
    next('invalid');
    return;
  }
}

router.param('model', getModel)

router.get('api/v1/:model', getAllModel)
router.get('api/v1/:model/:id', getOneModel)
router.post('api/v1/:model', createModel)
router.put('api/v1/:model/:id', updateModel)
router.delete('api/v1/:model/:id', deleteModel)

function getAllModel(req, res, next) {
  req.model.get()
    .then(results => {
      let count = results.length;
      res.json({ count, results })
    })
    .catch(next);
}

function getOneModel(req, res, next) {
  let _id = req.params.id
  req.model
    .get(_id)
    .then(results => {
      res.json(results)
    })
    .catch(next)
}

function createModel(req, res, next) {
  let record = req.body
  req.model
    .post(record)
    .then(results => {
      res.json(results)
    })
    .catch(next)
}

function updateModel(req, res, next) {
  let record = req.body
  let _id = req.params.id
  req.model.put(_id, record)
    .then(results => {
      res.json(results);
    })
    .catch(next)
}

function deleteModel(req, res, next) {
  let _id = req.params.id
  req.model.delete(_id)
    .then(results => {
      res.json(results)
    })
    .catch(next)
}

module.exports = router