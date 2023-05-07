const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create the Thought model using the ThoughtSchema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => createdAtVal.toISOString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reaction',
    },
  ],
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

// Virtual to retrieve the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;