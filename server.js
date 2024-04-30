//DEPENDENCIES
const express = require("express");
const routes = require("./routes");
const db = require("./config/connection.js");
// App-Port
const PORT = process.env.PORT || 3001;
const app = express();

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//App Start
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Express server listening on http://localhost:${PORT}`);
  });
});
