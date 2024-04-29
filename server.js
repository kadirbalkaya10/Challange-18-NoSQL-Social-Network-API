//DEPENDENCIES
const express = require("express");
const router = require("./routes");
// App-Port
const PORT = process.env.PORT || 3001;
const app = express();

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

//App Start

app.listen(PORT, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});
