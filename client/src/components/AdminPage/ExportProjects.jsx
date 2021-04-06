import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

class ExportProjects extends Component {

    downloadProjects = () => {
        axios("export", {
            responseType: 'blob',
          }).then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', 'research_projects.csv');
             document.body.appendChild(link);
             link.click();
          });
    }

    render(){
        return (
            <div id="Dashboard-Content">
                <h1 id="Content-Title">Export Projects</h1>
                <div>
                    <h2>Download All Projects as CSV</h2>
                    <Button onClick={this.downloadProjects}>Download</Button>
                </div>
            </div>
        )
    }
}

export default (ExportProjects);