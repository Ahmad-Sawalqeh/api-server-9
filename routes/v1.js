/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';

const express = require('express');
const router = express.Router();

const categories = require('../models/categories/categories.js');
const products = require('../models/products/products.js');

function getModel(req, res, next) {
  let model = req.params.model;

  switch (model) {
  case 'categories':
    req.model = categories;
    next();
    return;
  case 'products':
    req.model = products;
    next();
    return;
  default:
    next('invalid');
    return;
  }
}

router.param('model', getModel);

router.get('/:model', getAllModel);
router.get('/:model/:id', getOneModel);
router.post('/:model', createModel);
router.put('/:model/:id', updateModel);
router.delete('/:model/:id', deleteModel);

// data to be store in categories schema
// {
//   "name": "cellphone",
//   "display_name": "M20",
//   "description": "has 2 cameras"
// }

// data to be store in products schema
// {
//   "name": "cellphone",
//   "display_name": "M20",
//   "description": "has 2 cameras",
//   "category": "phones"
// }
// {
//   "name": "blue phone",
//   "display_name": "S10",
//   "description": "super cameras",
//   "category": "phones"
// }

function getAllModel(req, res, next) {
  req.model.get()
    .then(results => {
      let count = results.length;
      res.json({ count, results });
    })
    .catch(next);
}

function getOneModel(req, res, next) {
  let _id = req.params.id;
  req.model.get(_id)
    .then(results => {
      res.status(200).json(results);
    })
    .catch(next);
}

function createModel(req, res, next) {
  req.model.create(req.body)
    .then(results => {
      res.status(201).json(results);
    })
    .catch(next);
}

function updateModel(req, res, next) {
  let _id = req.params.id;
  req.model.update(_id, req.body)
    .then(results => {
      res.status(201).json(results);
    })
    .catch(next);
}

function deleteModel(req, res, next) {
  let message = 'deleted';
  let _id = req.params.id;
  req.model.delete(_id)
    .then(() => {
      res.status(201).json({ confirm: message });
    })
    .catch(next);
}

module.exports = router;
