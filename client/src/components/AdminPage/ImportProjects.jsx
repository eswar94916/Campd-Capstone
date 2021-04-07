import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./ImportProjects.scss";

class ImportProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            success: false
        }
    }

    handleFile = (event) => {
        event.preventDefault();
        this.setState({file: event.target.files[0]});
        console.log(event.target.files[0]);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append("csvFile", this.state.file);
        axios.post("/import/", formData, {
            headers: {
                "Content-type": "multipart/form-data",
            },
        }).then((res) => {
            if(res.status === 200) {
                this.setState({success: true})
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    render(){
        return (
            <div id="Dashboard-Content">
                <h1 id="Content-Title">Import Projects</h1>
                {this.state.success ? 
                    <h2>Success!</h2> :
                    <div className="import-container">
                        <div className="import-template-container">
                            <h3>Click the link below to download an import template</h3>
                            <a href="import-template.csv" download="import-template.csv">Download</a>
                        </div>
                        <div className="import-upload-container">
                            <h3>Upload your import file here</h3>
                            <input type="file" title="Input File" onChange={this.handleFile}/>
                            <Button onClick={this.handleSubmit}>Submit</Button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default (ImportProjects);