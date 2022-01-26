const mongoose = require('mongoose');
const Question = require('../db/Question.js');
const axios = require('axios');

const controller = {
  getAll: function(req, res) {
    Question.find({})
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.error(err);
      })
  },
  getAllByType: function(req, res) {
    Question.find({type: req.params.type})
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.error(err);
      })
  },
  addQuestion: function(req, res) {
    Question.create({content: req.body.content, type: req.body.type})
      .then(response => {
        res.status(201).send(response);
      })
      .catch(err => {
        console.error(err);
      })
  }
};

module.exports = controller;