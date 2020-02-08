/* eslint-disable strict */
'use strict';

class ModelCRUD {
  constructor(schema) {
    this.schema = schema;
  }

  get(_id) {
    if (_id) {
      return this.schema.find(_id);
    } else {
      return this.schema.find({});
    }
  }

  create(obj) {
    // eslint-disable-next-line new-cap
    let newObject = new this.schema(obj);
    return newObject.save();
  }

  update(_id, updatedObj) {
    return this.schema.findByIdAndUpdate(_id, updatedObj);
  }

  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = ModelCRUD;
