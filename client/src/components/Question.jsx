import React, { Component } from 'react';
import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';
import sampleData from '../../../db/sample.json';

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      type: '',
      questions: []
    };
    this.getAll = this.getAll.bind(this);
    this.getAllByType = this.getAllByType.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.selectType = this.selectType.bind(this);
    this.sampleQuestion = this.sampleQuestion.bind(this);
    this.addSampleQuestion = this.addSampleQuestion.bind(this);
  }

  componentDidMount() {
    // this.getAll();
    this.sampleQuestion();
  }

  getAll() {
    axios.get('/question')
      .then(res => {
        this.setState({questions: res.data})
      })
      .catch(err => {
        console.error(err);
      })
  }

  getAllByType() {
    const type = this.state.type;
    axios.get(`/question/${type}`)
      .then(res => {
        this.setState({questions: res.data})
      })
      .then()
      .catch(err => {
        console.error(err);
      })
  }

  addQuestion() {
    const data = {
      content: this.state.content,
      type: this.state.type
    }
    axios.post('/question', data)
      .then(res => {
        console.log('Added new question')
      })
      .catch(err => {
        console.error(err);
      })
  }

  handleInsert(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSelect(e) {
    this.setState({ type: e.target.value });
  }

  selectType(e) {
    this.setState({ type: e.target.value }, () => this.sampleQuestion());
  }

  sampleQuestion() {
    if (!this.state.type || this.state.type === 'Type') {
      this.setState({questions: sampleData})
    } else {
      const filterQuestion = sampleData.filter(question => question.type === this.state.type);
      this.setState({questions: filterQuestion})
    }
  }

  addSampleQuestion(e) {
    e.preventDefault();
    const data = {content: this.state.content, type: this.state.type};
    this.setState(prevState => ({questions: [...prevState.questions, data]}));
  }

  render() {
    return (
      <div className='questions'>
        <select onChange={this.selectType} value={this.state.type} className='select_question'>
          <option>Type</option>
          <option>Git</option>
          <option>HTML</option>
          <option>CSS</option>
          <option>JavaScript</option>
          <option>React</option>
          <option>Behavioral</option>
        </select>
        <select className='select_question'>
          <option>Question</option>
          {this.state.questions.map((question, index) => (<option key={index}>{question.content}</option>))}
        </select>
        <div>
          <span>New Question: </span><input name='content' value={this.state.content} onChange={this.handleInsert} className='input'></input>
          <span className='type'>Type: </span>
          <select onChange={this.handleSelect} >
            <option>Type</option>
            <option>Git</option>
            <option>HTML</option>
            <option>CSS</option>
            <option>JavaScript</option>
            <option>React</option>
            <option>Behavioral</option>
          </select>
          <button onClick={this.addSampleQuestion} className='submit'>Submit</button>
        </div>
      </div>
    )
  }
}