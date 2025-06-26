const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'USERS',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // this is the duration of the session in seconds, adjust as needed
  }
});

module.exports = mongoose.model('Session', sessionSchema);