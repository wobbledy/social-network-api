const { connect, connection } = require('mongoose');

// Connect to the Mongo DB
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetworkDB';

connect(connectionString);

module.exports = connection;
