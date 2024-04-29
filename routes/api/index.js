const apiRouter = require("express").Router();
const userRouter = require("./user-routes");

apiRouter.use("/user", userRouter);

module.exports = apiRouter;
