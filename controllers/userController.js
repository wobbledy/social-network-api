const User = require('../models/User');
const Thought = require('../models/Thought');

const userController = {
  // GET all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // GET a single user by its id and populated thought and friend data
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // POST a new user
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  // PUT to update a user by its id
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // DELETE to remove user by its id
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json({ message: 'User deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // POST to add a friend to a user's friend list
  addFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $push: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // DELETE to remove a friend from a user's friend list
  removeFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;