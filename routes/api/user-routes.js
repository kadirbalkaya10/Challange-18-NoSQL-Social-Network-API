// Dependencies
const userRouter = require("express").Router();
const {
  getAllUser,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

// Get All Users
// api/user
userRouter.get("/", getAllUser);

// Get Single User
// api/user:userId
userRouter.get("/:userId", getSingleUser);

// Create a new User
// api/user
userRouter.post("/", createNewUser);
// Update User
// api/user/userId
userRouter.put("/:userId", updateUser);
// Delete User
// api/user/userId
userRouter.delete("/:userId", deleteUser);

// Export User Routes
module.exports = userRouter;
