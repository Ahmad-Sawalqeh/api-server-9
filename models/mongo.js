'use strict';

class ModelCRUD {
  constructor(schema) {
    this.schema
  }

  get(id) {
    if (id) {
      return this.schema.find(id)
    } else {
      return this.schema.find({})
    }
  }

  create(obj) {
    let newObject = new this.schema(obj)
    return newObject.save()
  }

  update(id, updatedObj) {
    return this.schema.findByIdAndUpdate(id, updatedObj)
  }

  delete(id) {
    return this.schema.findByIdAndDelete(id)
  }
}

module.exports = ModelCRUD;