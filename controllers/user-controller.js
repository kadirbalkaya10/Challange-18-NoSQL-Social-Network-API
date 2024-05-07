//Dependencies
const { User, Thought } = require("../models"); // Importing User and Thought models from models directory

module.exports = {
  // Get all Users
  // Controller function to get all users
  getAllUser: async (req, res) => {
    try {
      const users = await User.find({}); // Finding all users
      res.json(users); // Sending JSON response with users data
    } catch (error) {
      // console.log(error); // Logging error
      res.status(500).json(error); // Sending 500 status with error message
    }
  },
  //   Get Single User
  // Controller function to get a single user by ID
  getSingleUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.userId }) // Finding user by ID
        .populate("thoughts") // Populating 'thoughts' field
        .populate("friends"); // Populating 'friends' field
      res.json(user); // Sending JSON response with user data
    } catch (error) {
      // console.log(error); // Logging error
      res.status(500).json("Could not find a user with matching ID");
    }
  },
  // Create a new User
  // Controller function to create a new user
  createNewUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body); // Creating a new user
      res.json(newUser); // Sending JSON response with newly created user data
    } catch (error) {
      res.status(500).json(error); // Sending 500 status with error message
    }
  },
  // Update User
  // Controller function to update a user by ID
  updateUser: async (req, res) => {
    try {
      // Finding and updating user by ID
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId }, // User ID to find
        { $set: req.body }, // New data to update
        { runValidators: true, new: true } // Options: run validators, return new document
      );
      res.json(updatedUser); // Sending JSON response with updated user data
    } catch (error) {
      res.status(500).json("Could not find a user with matching ID");
    }
  },
  // Delete User
  // Controller function to delete a user by ID
  deleteUser: async (req, res) => {
    try {
      // Finding and deleting user by ID
      const deletedUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });
      // Deleting thoughts associated with the deleted user
      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
      res.json(`User ${deletedUser} deleted with their thought with`);
    } catch (error) {
      res.status(500).json("Could not find a user with matching ID");
    }
  },
  // Controller function to add a friend to a user
  addFriend: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.userId }); // Finding user
      const newFriend = await User.findOne({ _id: req.body.id }); // Finding new friend
      // Check if user is trying to add themselves as a friend
      if (user === newFriend) {
        res.json("Cannot add your self as a friend");
      }
      // Check if the new friend is already in user's friend list
      if (user.friends.indexOf(newFriend._id) != -1) {
        res.json(`${newFriend.username} is your friend already !!!`);
      } else {
        // Adding new friend to user's friend list
        await User.findOneAndUpdate(
          { _id: req.params.userId }, // User ID
          { $push: { friends: newFriend._id } }, // Adding new friend ID to friends array
          { new: true } // Options: return new document
        );
        // Adding user to new friend's friend list
        await User.findOneAndUpdate(
          { _id: newFriend._id },
          {
            $push: { friends: req.params.userId }, // Adding user ID to friends array
          }
        );
      }
      // Sending JSON response with success message and new friend data
      res.json({ message: `${newFriend.username} added as a friend` });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // Controller function to delete a friend from user's friend list
  deleteFriend: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.userId }); // Finding user
      const deletedFriend = await User.findOne({ _id: req.body.id }); // Finding friend to delete

      // Checking if user or friend exists
      if (!user || !deletedFriend) {
        res.json("User or friend id doest not match with our records");
      } else {
        // Removing friend from user's friend list
        await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.body.id } }, // Removing friend ID from friends array
          { new: true } // Options: return new document
        );
        // Removing user from friend's friend list
        await User.findByIdAndUpdate(
          { _id: req.body.id },
          { $pull: { friends: req.params.userId } } // Removing user ID from friends array
        );
        // Sending JSON response with success message
        res.json({
          message: `${deletedFriend.username} is deleted from your friends list`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
