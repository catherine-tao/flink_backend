const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: false
  },
  username: {
    type: String,
    required: true
  },
  backgroundImage: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("User", userSchema);
