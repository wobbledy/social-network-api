const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
  // GET all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().populate('reactions');
      res.json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // GET a single thought by its id
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // POST a new thought
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      // Push the created thought's id to the associated user's thoughts array field
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  // PUT to update a thought by its id
  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // DELETE to remove a thought by its id
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
      }
      // Remove the thought's id from the associated user's thoughts array field
      const user = await User.findByIdAndUpdate(
        thought.userId,
        { $pull: { thoughts: thought._id } },
        { new: true }
      );
      res.json({ message: 'Thought deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // POST to create a reaction stored in a single thought's reactions array field
  createReaction: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  // DELETE to pull and remove a reaction by the reaction's reactionId value
  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;