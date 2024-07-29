const mongoose = require('mongoose');

const connect = (mongoURL) => {
  mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully'))
    .catch((error) => console.error('Database connection error:', error));
};

module.exports = { connect };
