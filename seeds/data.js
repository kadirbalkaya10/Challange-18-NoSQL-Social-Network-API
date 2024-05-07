const users = [
  {
    username: "aragorn",
    email: "aragorn@gmail.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "legolas",
    email: "legolas@gmail.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "gimli",
    email: "gimli@gmail.com",
    thoughts: [],
    friends: [],
  },
];

const thoughts = [
  {
    thoughtText: "I am king of Gondor",
    username: "aragorn",
    reactions: [{ reactionBody: "⚔️", username: "aragorn" }],
  },
  {
    thoughtText: "They are taking hobbits to Isengard",
    username: "legolas",
    reactions: [{ reactionBody: "🏹", username: "legolas" }],
  },
  {
    thoughtText: "Arhhhhhggggg!!!",
    username: "gimli",
    reactions: [{ reactionBody: "𐃈", username: "gimli" }],
  },
];

module.exports = { users, thoughts };
