/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';

const express = require('express');
const router = express.Router();

const categories = require('../models/categories/categories.js');
const products = require('../models/products/products.js');

/**
 * Model must be a proper model, found in /models folder
 * @param {object} req
 * @param {object} res
 * @param {MM} next
 * @returns instance of specific model
 */
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

/**
 * param route to find a proper model
 * Evaluates req.params.model /api/v1/:model
 */
router.param('model', getModel);

/**
 * routs /api/v1/:model
 * @param {model} model categories/products model must be one of models in /models folder
 */
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

/**
 * retrieve all data
 * @param {object} req
 * @param {object} res
 * @param {MM} next
 * @returns {object} 200 - Count of results and an array of results
 * @returns {Error}  500 - Unexpected error
 */
function getAllModel(req, res, next) {
  req.model.get()
    .then(results => {
      let count = results.length;
      res.status(200).json({ count, results });
    })
    .catch(next);
}

/**
 * retreive one item
 * @param {object} req
 * @param {object} res
 * @param {MM} next
 * @returns {object} 200 - results
 * @returns {Error}  500 - Unexpected error
 */
function getOneModel(req, res, next) {
  let _id = req.params.id;
  req.model.get(_id)
    .then(results => {
      res.status(200).json(results);
    })
    .catch(next);
}

/**
 * create new item
 * @param {object} req
 * @param {object} res
 * @param {MM} next
 * @returns {object} 201 - results
 * @returns {Error}  500 - Unexpected error
 */
function createModel(req, res, next) {
  req.model.create(req.body)
    .then(results => {
      res.status(201).json(results);
    })
    .catch(next);
}

/**
 * update item
 * @param {object} req
 * @param {object} res
 * @param {MM} next
 * @returns {object} 201 - results
 * @returns {Error}  500 - Unexpected error
 */
function updateModel(req, res, next) {
  let _id = req.params.id;
  req.model.update(_id, req.body)
    .then(results => {
      res.status(201).json(results);
    })
    .catch(next);
}

/**
 * delete item
 * @param {object} req
 * @param {object} res
 * @param {MM} next
 * @returns {object} 201 - { confirm: deleted }
 * @returns {Error}  500 - Unexpected error
 */
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
