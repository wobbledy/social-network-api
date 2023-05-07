const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create the User model using the UserSchema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

// Virtual to retrieve the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;