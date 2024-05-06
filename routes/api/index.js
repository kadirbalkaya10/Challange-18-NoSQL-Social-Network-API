const apiRouter = require("express").Router();
const userRouter = require("./user-routes");
const thoughtRouter = require("./thoughts-routes");

apiRouter.use("/user", userRouter);
apiRouter.use("/thought", thoughtRouter);

module.exports = apiRouter;
