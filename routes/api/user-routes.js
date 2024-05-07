// Dependencies
const userRouter = require("express").Router();
const {
  getAllUser,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
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

userRouter.post("/friends/:userId", addFriend);

userRouter.delete("/friends/:userId", deleteFriend);

// Export User Routes
module.exports = userRouter;
