// Dependencies

const thoughtsRouter = require("express").Router();

const {
  getAllThoughts,
  getThought,
  createNewThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thought-controller");

// Get All Thoughts
// api/thoughts
thoughtsRouter.get("/", getAllThoughts);

// Get Single thought
// api/thought/thoughtId
thoughtsRouter.get("/:thoughtId", getThought);

// Create a new Thought
// api/thought
thoughtsRouter.post("/", createNewThought);
// Update Thought
// api/thought/thoughtId
thoughtsRouter.put("/:thoughtId", updateThought);
// Delete Thought
// api/thought/thoughtId

thoughtsRouter.delete("/:thoughtId", deleteThought);

// Export User Routes
module.exports = thoughtsRouter;
