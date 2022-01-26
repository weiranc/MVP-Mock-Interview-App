import React, { Component } from 'react';
import Webcam from 'react-webcam';

export default class Video extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className='logo'>
          <h1 className='title'>Mock Interviews</h1>
          <img className='logo_img' src={`img/logo.png`}></img>
        </div>
        <Webcam />
        {/* <video id="video" width="720" height="560" autoPlay></video> */}
      </div>
    )
  }
}


