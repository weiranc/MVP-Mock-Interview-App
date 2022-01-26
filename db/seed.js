const Question = require('./Question.js');
const mongoose = require('mongoose');
const questionExamples = require('./sample.json');

const save = () => {
  Question.insertMany(questionExamples)
    .then(docs => {
      console.log('Data inserted!');
    })
    .catch(err => {
      console.error(err);
    })
}

save();