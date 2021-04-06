import React, { Component } from "react";
import { Button } from "react-bootstrap";

class ImportProjects extends Component {

    render(){
        return (
            <div id="Dashboard-Content">
                <h1 id="Content-Title">Import Projects</h1>
                <div className="import-template-container">
                    <h2>Click the link below to download an import template</h2>
                    <a href="import-template.csv" download="import-template.csv">Download</a>
                </div>
                <div className="import-upload-container">
                    <h2>Upload your import file here</h2>
                    <input type="file">Select File</input>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                </div>
            </div>
        )
    }
}

export default (ImportProjects);