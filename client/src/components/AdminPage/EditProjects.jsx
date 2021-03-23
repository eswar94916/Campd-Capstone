import React, { Component } from "react";
import ProjectSearch from '../ProjectsPage/ProjectSearch';

class EditProjects extends Component {

    render(){
        return (
            <div id="Dashboard-Content">
                <h1 id="Content-Title">Edit Projects</h1>
                <ProjectSearch />
            </div>
        )
    }
}

export default (EditProjects);