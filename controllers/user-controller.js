module.exports = {
  // Get all Users
  getAllUser: async (req, res) => {
    res.send("All users");
  },
  //   Get Single User
  getSingleUser: async (req, res) => {
    res.send("Get single user");
  },
  // Create a new User
  createNewUser: async (req, res) => {
    res.send("Create a new user");
  },
  // Update User
  updateUser: async (req, res) => {
    res.send("Update user info");
  },
  // Delete User
  deleteUser: async (req, res) => {
    res.send("Delete a user");
  },
};
