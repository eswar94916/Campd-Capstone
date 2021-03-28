/* a site administrator should be able to batch edit projects. 
 * This edit will be able to:
 * - added and remove tags,
 * - update the projects' statuses
 * - delete multiple projects
 */
import React, { Component } from "react";
import { connect } from 'react-redux';
import ProjectSearch from '../ProjectsPage/ProjectSearch';

class EditProjects extends Component {
  constructor (props) {
    super(props);
    this.state = {
      idArray: []
    };
  };

  // This function updates the class the state array that contains which projects are selected
  updateEditProjectList(projectID) {
    if(this.state.idArray.includes(projectID)){
      this.setState( state => {
        const idArray = state.idArray.filter(id => id !== projectID);
        return {
          idArray
        }
      })
    } else {
      this.setState( state => {
        const idArray = state.idArray.concat(projectID);
        return{
          idArray
        }
      })
    }
  };

  render(){
      return (
          <div id="Dashboard-Content">
              <h1 name="ex" id="Content-Title">Edit Projects</h1>
              <ProjectSearch />
              <div id="Scrollable-div">
                <table id="Batch-Edit-Table">
                  <thead>
                    <th>Title</th>
                    <th>Owner(s)</th>
                    <th>Tags</th>
                    <th>Status</th>
                  </thead>
                  <tbody>
                    {this.props.projects.map((project) => 
                    <tr onClick={() => this.updateEditProjectList(project._id)} className={this.state.idArray.includes(project._id) ?"Selected-Row Table-Row" : "Unselected-Row Table-Row"} >
                      <td>{project.name}</td>
                      <td>{project.owner}</td>
                      <td>{project.tags}</td>
                      <td></td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
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