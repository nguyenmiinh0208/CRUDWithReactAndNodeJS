const businessModel = require('mongoose');
const Schema  = businessModel.Schema;

// Define collection and schema for Business
let Person = new Schema({
  name: {
    type: String
  },
  company: {
      type: String
  },
  age: {
      type: Number
  }
}, {
  collection: 'persons'
});

module.exports = businessModel.model('Persons', Person);