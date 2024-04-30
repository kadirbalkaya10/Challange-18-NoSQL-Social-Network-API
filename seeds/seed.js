const connection = require("../config/connection.js");
const { Thought, User } = require("../models");
const { thoughts, users } = require("../seeds/data.js");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("Connected");

  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("thoughts");
  }

  await User.insertMany(users);
  await Thought.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  // Ends db connection
  process.exit(0);
});
