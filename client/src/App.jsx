import React, { Component } from 'react';
import Video from './components/Video.jsx';
import Question from './components/Question.jsx';
import Speech from './components/Speech.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Video />
        <Question />
        <Speech />
      </div>
    )
  }
}
