//Dependencies
const mongoose = require("mongoose"); // Importing mongoose library
const Schema = mongoose.Schema; // Extracting Schema class from mongoose

// Sub Document
// Defining a schema for reactions associated with a thought
const reactionSchema = new mongoose.Schema(
  {
    // Unique identifier for the reaction
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    // Text content of the reaction
    reactionBody: {
      type: String,
      required: true,
      max: 280,
    },
    // Username of the user who posted the reaction
    username: {
      type: String,
      required: true,
    },
    // Timestamp for when the reaction was created
    createdAt: {
      type: Date,
      default: Date.now,
      // Getter function to format createdAt when retrieving
      get: function (createdAt) {
        return new Date(createdAt).toLocaleString; // Returning createdAt in a localized string format
      },
    },
  },
  // Disabling generation of default '_id' field for reaction sub-documents
  { _id: false }
);

// Set up Thoughts Collection Data Structure
const thoughtScheme = new mongoose.Schema(
  {
    // Text content of the thought
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },
    // Timestamp for when the thought was created
    createdAt: {
      type: Date,
      default: Date.now,
      // Getter function to format createdAt when retrieving
      get: function (createdAt) {
        return new Date(createdAt).toLocaleString(); // Returning createdAt in a localized string format
      },
    },
    // Username of the user who posted the thought
    username: {
      type: String,
      required: true,
    },
    // Array of reaction sub-documents associated with the thought
    reactions: [reactionSchema],
  },
  {
    // Configuring toJSON option
    toJSON: {
      getters: true, // Including getters when converting document to JSON
    },
  }
);

//Virtual to retrieve the length of the thought`s reactions
thoughtScheme.virtual("reactionCount").get(function () {
  // Defining a virtual property 'reactionCount' to get the length of reactions array
  return this.reactions.length; // Returning the length of the 'reactions' array
});

//Create thoughts collection
const Thought = mongoose.model("Thought", thoughtScheme); // Creating a model named 'Thought' using the thoughtScheme schema

//Export Thoughts model
module.exports = Thought;
