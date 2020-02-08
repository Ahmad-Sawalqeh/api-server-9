'use strict';

const mongoose = require('mongoose')
require('./products.js')

const productsSchema = mongoose.Schema({
  name: { type: String, required: true },
  display_name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }
}, { toObject: { virtuals: true }, toJson: { virtuals: true } });

productsSchema.virtual('actualCategory', {
  ref: 'categories',
  localField: 'category',
  foreignField: 'name',
  justOne: false
})

productsSchema.pre('findOne', function () {
  try {
    this.populte('actualCategory')
  } catch (err) {
    console.error(err);
  }
})

module.exports = mongoose.model('products', productsSchema)