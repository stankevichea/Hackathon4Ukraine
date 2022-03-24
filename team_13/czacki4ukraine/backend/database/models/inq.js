const mongoose = require('mongoose');

const InqSchema = new mongoose.Schema({
  organizationid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  startquantity: {
    type: Number,
    required: true,
  },
  actquantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
  },
  description: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
});

const Inq = mongoose.model('Inq', InqSchema);

module.exports = Inq;