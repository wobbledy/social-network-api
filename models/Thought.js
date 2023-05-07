const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create the Reaction Schema within the Thought Model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function () {
        return this._doc.createdAt.toLocaleDateString('en-US');; // Format the date as "MM/DD/YYYY"
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Create the Thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function () {
        return this._doc.createdAt.toLocaleDateString('en-US'); // Format the date as "MM/DD/YYYY"
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual to get the length of the thought's reactions array
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;