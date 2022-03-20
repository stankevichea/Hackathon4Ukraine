const mongoose = require('mongoose');

const DeclarationSchema = new mongoose.Schema({
  inqid: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  kontakt: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Declaration = mongoose.model('Declaration', DeclarationSchema);

module.exports = Declaration;