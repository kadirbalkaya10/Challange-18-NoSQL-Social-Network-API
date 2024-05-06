// Dependencies

const thoughtsRouter = require("express").Router();

// Get All Thoughts
// api/thoughts
thoughtsRouter.get("/", async (req, res) => {
  res.send("All Thoughts");
});

// Get Single thought
// api/thought/thoughtId
thoughtsRouter.get("/:thoughtId", async (req, res) => {
  res.send("Get single thoughts");
});

// Create a new Thought
// api/thought
thoughtsRouter.post("/", async (req, res) => {
  res.send("Get single thoughts");
});
// Update Thought
// api/thought/thoughtId
thoughtsRouter.put("/:thoughtId", async (req, res) => {
  res.send("Get single thoughts");
});
// Delete Thought
// api/thought/thoughtId

thoughtsRouter.delete("/:thoughtId", async (req, res) => {
  res.send("Get single thoughts");
});

// Export User Routes
module.exports = thoughtsRouter;
