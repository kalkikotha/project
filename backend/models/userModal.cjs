// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  credits: {
    type: Number,
    required: true,
  },
  subscriptionActive: {
    type: Boolean,
    required: true,
  },
  referralCode: {
    type: String,
    required: true,
  },
  referrerCode: {
    type: String,
  },
});
module.exports = mongoose.model("USERS", userSchema);
