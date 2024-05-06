module.exports = {
  // Get All thoughts
  getAllThoughts: async (req, res) => {
    res.send("All Thoughts");
  },
  // Get Single thought
  getThought: async (req, res) => {
    res.send("Get single thought");
  },
  // Create a new Thought
  createNewThought: async (req, res) => {
    res.send("Create a new thought");
  },
  // Update Thought
  updateThought: async (req, res) => {
    res.send("Update thought");
  },
  // Delete Thought
  deleteThought: async (req, res) => {
    res.send("Delete thought");
  },
};
