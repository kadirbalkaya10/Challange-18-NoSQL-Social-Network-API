//Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Sub Document

const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (createdAt) {
        return new Date(createdAt).toLocaleString;
      },
    },
  },
  { _id: false }
);

// Set up Thoughts Collection Data Structure
const thoughtScheme = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    min: 1,
    max: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (createdAt) {
      return new Date(createdAt).toLocaleString();
    },
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

//Virtual to retrieve the length of the thought`s reactions
thoughtScheme.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//Create thoughts collection
const Thought = mongoose.model("Thought", thoughtScheme);

//Export Thoughts model
module.exports = Thought;
