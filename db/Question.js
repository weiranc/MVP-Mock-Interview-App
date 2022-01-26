const mongoose = require('mongoose');
const db = require('./index.js');

const questionSchema = new mongoose.Schema({
  content: String,
  type: String
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;