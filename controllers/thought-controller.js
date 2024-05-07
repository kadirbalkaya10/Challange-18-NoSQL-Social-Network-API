const { Thought, User } = require("../models"); // Importing Thought and User models from models directory

module.exports = {
  // Get All thoughts
  // Controller function to get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const allThoughts = await Thought.find({}); // Finding all thoughts
      res.json(allThoughts); // Sending JSON response with all thoughts
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Get Single thought
  // Controller function to get a single thought by ID
  getThought: async (req, res) => {
    try {
      // Finding a thought by ID
      const getThought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).populate("reactions"); // Populating 'reactions' field
      res.json(getThought); // Sending JSON response with the found thought
    } catch (error) {
      res.status(500).json("Could not find a thought with matching ID"); // Sending 500 status with error message if an error occurs
    }
  },
  // Create a new Thought
  // Controller function to create a new thought
  createNewThought: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.id }); // Finding the user who is creating the thought
      // If user exists
      if (user) {
        // Creating a new thought
        const thought = await Thought.create({
          thoughtText: req.body.thoughtText, // Text of the thought
          username: user.username, // Username of the user who created the thought
        });
        // Adding the thought ID to user's thoughts array
        await User.findOneAndUpdate(
          { _id: req.body.id },
          {
            $push: { thoughts: thought._id }, // Adding thought ID to thoughts array
          }
        );
        res.json({ thought }); // Sending JSON response with the created thought
      } else {
        res.status(404).json({ message: "Invalid username!" }); // Sending 404 status with error message if user is not found
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Update Thought
  // Controller function to update a thought by ID
  updateThought: async (req, res) => {
    try {
      // Finding and updating thought by ID
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body }, // New data to update
        { runValidators: true, new: true } // Options: run validators, return new document
      );
      res.json(updatedThought); // Sending JSON response with updated thought
    } catch (error) {
      console.log(error);
      res.status(500).json("Could not find a thought with matching ID");
    }
  },
  // Delete Thought
  // Controller function to delete a thought by ID
  deleteThought: async (req, res) => {
    try {
      // Finding and deleting thought by ID
      const deletedThought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId, // Thought ID to delete
      });
      await User.deleteOne({ _id: { $in: User.thoughts } }); // Deleting the thought from user's thoughts array
      res.json(deletedThought); // Sending JSON response with the deleted thought
    } catch (error) {
      console.log(error);
      res.status(500).json("Could not find a thought with matching ID"); // Sending 500 status with error message if an error occurs
    }
  },
};
