//Dependencies
const mongoose = require("mongoose");
const { Thoughts } = require(".");
const Schema = mongoose.Schema;

// Set up Thoughts Collection Data Structure
const thoughtsScheme = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    max: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (createdAt) {
      return new Date(createdAt).toLocaleString;
    },
  },
  username: {
    type: String,
    required: true,
    reactions: [reactionSchema],
  },
});

//Create thoughts collection
const Thoughts = mongoose.model("thought", thoughtsScheme);

//Export Thoughts model
module.exports = Thoughts;
