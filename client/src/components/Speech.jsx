import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { getTokenOrRefresh } from './Token.jsx';
import { ResultReason, SpeechConfig, AudioConfig, SpeechRecognizer} from 'microsoft-cognitiveservices-speech-sdk';
import regeneratorRuntime from 'regenerator-runtime';

export default class Speech extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayText: 'INITIALIZED: ready to test speech...'
        }
    }

    async sttFromMic() {
        const tokenObj = await getTokenOrRefresh();
        const speechConfig = SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = 'en-US';

        const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

        this.setState({
            displayText: 'speak into your microphone...'
        });

        recognizer.recognizeOnceAsync(result => {
            let displayText;
            if (result.reason === ResultReason.RecognizedSpeech) {
                displayText = `RECOGNIZED: Text=${result.text}`
            } else {
                displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
            }

            this.setState({
                displayText: displayText
            });
        });
    }

    async fileChange(event) {
        const audioFile = event.target.files[0];
        const fileInfo = audioFile.name + ` size=${audioFile.size} bytes `;

        this.setState({
            displayText: fileInfo
        });

        const tokenObj = await getTokenOrRefresh();
        const speechConfig = SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = 'en-US';

        const audioConfig = AudioConfig.fromWavFileInput(audioFile);
        const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizeOnceAsync(result => {
            let displayText;
            if (result.reason === ResultReason.RecognizedSpeech) {
                displayText = `RECOGNIZED: Text=${result.text}`
            } else {
                displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
            }

            this.setState({
                displayText: fileInfo + displayText
            });
        });
    }

    render() {
        return (
            <Container className='app-container'>
                <div className='row main-container'>
                    <div className='col-6'>
                        <i className='fas fa-microphone fa-lg mr-2' onClick={() => this.sttFromMic()}></i>
                        Convert speech to text from your mic.

                        <div className='mt-2'>
                            <label htmlFor='audio-file'><i className='fas fa-file-audio fa-lg mr-2'></i></label>
                            <input
                                type='file'
                                id='audio-file'
                                onChange={(e) => this.fileChange(e)}
                                style={{display: 'none'}}
                            />
                            Convert speech to text from an audio file.
                        </div>
                    </div>
                    <div className='col-6 output-display rounded'>
                        <code>{this.state.displayText}</code>
                    </div>
                </div>
            </Container>
        );
    }
}