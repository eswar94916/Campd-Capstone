import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

/* This component allows an admin to download all the projects as a csv */
class ExportProjects extends Component {

    /* To download data as a csv, the request must expect a 'blob' response */
    downloadProjects = () => {
        axios("export", {
            responseType: 'blob',
          }).then((response) => {
              //the requested 'blob' data must then be turned into a URL form that will be clicked on to download
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', 'research_projects.csv');

             //once the url object is created, programmatically click it to download the file
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