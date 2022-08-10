import React, {Component} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import {configureAmplify} from "./services";
import AWS from "aws-sdk";

class App extends Component {
    state = {
        imageName: "",
        imageFile: "",
        response: ""
    };

    uploadImage = () => {
        var upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: process.env.REACT_APP_bucket_name,
                Key: this.upload.files[0].name,
                Body: this.upload.files[0]
            }
        })

        var promise = upload.promise();

        promise.then(
            (data) => {
                this.upload = null;
                this.setState({response: "Success uploading file!"});
            },
            (err) => {
                this.setState({response: `Cannot uploading file: ${err}`});
            }
        )
    };

    render() {
        return (
            <div className="App">
                <h2>S3 Upload example...</h2>
                <input
                    type="file"
                    style={{display: "none"}}
                    ref={ref => (this.upload = ref)}
                    onChange={e =>
                        this.setState({
                            imageFile: this.upload.files[0],
                            imageName: this.upload.files[0].name
                        })
                    }
                />
                <input value={this.state.imageName} placeholder="Select file"/>
                <button
                    onClick={e => {
                        this.upload.value = null;
                        this.upload.click();
                    }}
                    loading={this.state.uploading}
                >
                    Browse
                </button>

                <button onClick={this.uploadImage}> Upload File</button>

                {!!this.state.response && <div>{this.state.response}</div>}
            </div>
        );
    }
}


configureAmplify();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
