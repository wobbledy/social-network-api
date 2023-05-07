const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');
const data = require('./seedData/data');

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert users
    const users = await User.insertMany(data.users);

    // Insert thoughts and update user's thoughts array
    const thoughts = await Thought.insertMany(
      data.thoughts.map((thought) => ({
        ...thought,
        userId: users.find((user) => user.username === thought.username)._id,
      }))
    );

    // Update user's thoughts array
    for (const user of users) {
      user.thoughts = thoughts
        .filter((thought) => thought.username === user.username)
        .map((thought) => thought._id);
      await user.save();
    }

    console.log('Seed data inserted successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
};

// Seed the database
seedDatabase();