const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost/mvp_questions';

const db = mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = db;
