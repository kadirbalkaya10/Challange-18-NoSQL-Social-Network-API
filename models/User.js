//Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Email Validation with Regular expression
var validateEmail = function (email) {
  var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email);
};

// Set up User Collection Data Structure
const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: "Email address is required",
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

//Create User Collection on database
const User = mongoose.model("User", userScheme);

// Export Model
module.exports = User;
