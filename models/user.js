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
  headerName: {
    type: String,
    required: true
  },
  templateId: {
    type: Number,
    required: true
  },
  products: {
    type: Array,
    required: false
  }
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
}
