const mongoose = require('mongoose');

// Define the Menu schema
const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
}, { timestamps: true });

// Create and export the Menu model
const Menu = mongoose.model('Menu', menuSchema);

module.exports = {Menu};