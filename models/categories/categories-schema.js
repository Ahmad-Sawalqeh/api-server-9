/* eslint-disable strict */
/* eslint-disable new-cap */
/* eslint-disable camelcase */
'use strict';

const mongoose = require('mongoose');
require('./categories.js');

const categoriesSchema = mongoose.Schema({
  name: { type: String, required: true },
  display_name: { type: String, required: true },
  description: { type: String, required: true },
}, { toObject: { virtuals: true }, toJson: { virtuals: true } });

categoriesSchema.virtual('actualProducts', {
  ref: 'products',
  localField: 'name',
  foreignField: 'category',
  justOne: false,
});

categoriesSchema.pre('findOne', function () {
  try {
    this.populate('actualProducts');
  } catch (err) {
    console.error(err);
  }
});

module.exports = mongoose.model('categories', categoriesSchema);