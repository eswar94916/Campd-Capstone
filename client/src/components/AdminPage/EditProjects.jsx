/* a site administrator should be able to batch edit projects. 
 * This edit will be able to:
 * - added and remove tags,
 * - update the projects' statuses
 * - delete multiple projects
 */
import React, { Component } from "react";
import { connect } from 'react-redux';
import ProjectSearch from '../ProjectsPage/ProjectSearch';
import { fetchAllProjects } from '../../actions';
import ProjectList from '../ProjectsPage/ProjectListContainer.jsx';
import Project from './EditProjectListing';

class EditProjects extends Component {
  constructor (props) {
    super(props);
    this.state = {
      idArray: []
    };
  };

  updateEditProjectList = (event) => {
    this.state.idArray.push(event);
    console.log(`event: ${id}`);
  };

  test = (event) =>{
    console.log("testing")
  }
  
  render(){
      return (
          <div id="Dashboard-Content">
              <h1 name="ex" id="Content-Title">Edit Projects</h1>
              <ProjectSearch />
              <table>
                <thead>
                  <th>Title</th>
                  <th>Owner(s)</th>
                  <th>Tags</th>
                </thead>
                <tbody>
                  {this.props.projects.map((project) => <tr onClick={this.updateEditProjectList(project.id)} className={this.state.idArray.includes(project.id) ?"Selected-Row Table-Row" : "Unselected-Row Table-Row"} ><td>{project.name}</td><td>{project.owner}</td><td>{project.tags}</td></tr>)}
                </tbody>
              </table>
              <button id="Edit-Projects-Button">Edit Selected Projects</button>   
          </div>
      )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};


export default connect(
    mapStateToProps
)(EditProjects);