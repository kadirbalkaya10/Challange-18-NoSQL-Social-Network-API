//Dependencies
const mongoose = require("mongoose"); // Importing mongoose library
const Schema = mongoose.Schema; // Extracting Schema class from mongoose

// Email Validation with Regular expression
var validateEmail = function (email) {
  var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Regular expression for email validation
  return reg.test(email); // Checking if email matches the regular expression
};

// Set up User Collection Data Structure
const userScheme = new mongoose.Schema(
  {
    username: {
      // Defining username field
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      // Defining email field
      type: String,
      required: "Email address is required",
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validateEmail, "Please fill a valid email address"],
    },
    // Defining thoughts field as an array of ObjectIds referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId, // Field type is ObjectId
        ref: "Thought", // Referencing the Thought model
      },
    ],
    // Defining friends field as an array of ObjectIds referencing the User model
    friends: [
      {
        type: Schema.Types.ObjectId, // Field type is ObjectId
        ref: "User", // Referencing the User model
      },
    ],
  },
  {
    // Configuring toJSON option
    toJSON: {
      // Including virtual properties when converting document to JSON
      virtuals: true,
    },
    // Disabling generation of default '_id' field
    id: false,
  }
);

// Virtual to retrieve friendCount
userScheme.virtual("friendCount").get(function () {
  return this.friends.length;
});

//Create User Collection on database
const User = mongoose.model("User", userScheme);

// Export Model
module.exports = User;
