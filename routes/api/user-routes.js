const userRouter = require("express").Router();

userRouter.get("/", async (req, res) => {
  res.send("All users");
});

userRouter.get("/:userId", async (req, res) => {
  res.send("Get single user");
});

userRouter.post("/", async (req, res) => {
  res.send("Create a new user");
});

userRouter.put("/:userId", async (req, res) => {
  res.send("Update user info");
});

userRouter.delete("/:userId", async (req, res) => {
  res.send("Delete a user");
});

module.exports = userRouter;
