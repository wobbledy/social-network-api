const data = {
    users: [
      {
        username: "user1",
        email: "user1@example.com",
        thoughts: [],
        friends: [],
      },
      {
        username: "user2",
        email: "user2@example.com",
        thoughts: [],
        friends: [],
      },
      {
        username: "user3",
        email: "user3@example.com",
        thoughts: [],
        friends: [],
      },
    ],
    thoughts: [
      {
        thoughtText: "Thought 1",
        createdAt: new Date(),
        username: "user1",
        reactions: [],
      },
      {
        thoughtText: "Thought 2",
        createdAt: new Date(),
        username: "user2",
        reactions: [],
      },
      {
        thoughtText: "Thought 3",
        createdAt: new Date(),
        username: "user1",
        reactions: [],
      },
    ],
  };
  
  module.exports = data;