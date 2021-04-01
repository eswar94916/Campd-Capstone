/* a site administrator should be able to batch edit projects. 
 * This edit will be able to:
 * - added and remove tags,
 * - update the projects' statuses
 * - delete multiple projects
 */
import React, { Component } from "react";
import { connect } from 'react-redux';
import ProjectSearch from '../ProjectsPage/ProjectSearch';
import { deleteProject } from '../../actions';
import { Row, Col, Table } from 'react-bootstrap'


class EditProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idArray: [],
      isEditing: false,
      isApproved: false,
      isNew: false,
      isActive: false,
      isRecruiting: false,
      isPaused: false,
      isStopped: false,
      isArchived: false,
      isProposal: false,
      statusGroup1: true,
      statusGroup2: true,
      statusGroup3: true,
      addTags: [],
      removeTags: []
    };
  };

  // This function updates the class the state array that contains which projects are selected
  updateEditProjectList(projectID) {
    if (this.state.idArray.includes(projectID)) {
      this.setState(state => {
        const idArray = state.idArray.filter(id => id !== projectID);
        return {
          idArray
        }
      })
    } else {
      this.setState(state => {
        const idArray = state.idArray.concat(projectID);
        return {
          idArray
        }
      })
    }
  };

  togglePopup = (event) => {
    if (this.state.idArray.length !== 0) {
      this.setState({
        isEditing: !this.state.isEditing
      });
    } 
  };

  handleStatusGroup1 = (event) => {
    console.log(event.target.id);
    if(event.target.id === "isProposal"){
      this.setState({
        isApproved: false,
        isProposal: true,
        statusGroup1: false 
      })
    } else if (event.target.id === "isApproved"){
      this.setState({
        isApproved: true,
        isProposal: false,
        statusGroup1: false 
      })
    } else {
      this.setState({
        isApproved: false,
        isProposal: false,
        statusGroup1: true 
      })
    }
  };

  handleStatusGroup2 = (event) => {
    console.log(event.target.id);
    if(event.target.id === "isRecruiting"){
      this.setState({
        isRecruiting: event.target.value,
        statusGroup2: false
      })
    } else {
      this.setState({
        statusGroup2: true
      })
    }
  }

  handleSubmit = (event) => {
    if (this.state.addTags.length() > 0) {

    };

    if (this.state.removeTags.length() > 0) {

    };

    if (this.state.statusGroup1 === false) {

    };

    if (this.state.statusGroup2 === false) {

    };


  };

  handleDelete = (event) => {
    this.state.idArray.forEach(projectID => {
      console.log(`projectID: ${projectID}`);
    });
  };

  render() {
    return (
      <div id="Dashboard-Content">
        <h1 name="ex" id="Content-Title">Edit Projects</h1>
        <ProjectSearch />
        <Table id="Batch-Edit-Table" striped bordered hover size="sm">
          <thead class="thead-dark">
            <tr>
              <th>Title</th>
              <th>Owner(s)</th>
              <th>Tags</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.projects.map((project) =>
              <tr onClick={() => this.updateEditProjectList(project._id)}
                className={this.state.idArray.includes(project._id) ? "Selected-Row Table-Row" : "Unselected-Row Table-Row"} >
                <td>{project.name}</td>
                <td>{project.owner}</td>
                <td>{project.tags}</td>
                <td></td>
              </tr>)}
          </tbody>
        </Table>
        <button className="Edit-Projects-Button" onClick={this.togglePopup}>Edit Selected Projects</button>
        {this.state.isEditing ?
          <div id="Edit-Selected-Projects-Background">
            <div id="Edit-Selected-Projects-Container">
              <div id="mdiv" onClick={this.togglePopup}>
                <div class="mdiv">
                  <div class="md"></div>
                </div>
              </div>
              <h2>Editing Selected Projects</h2>
              <div id="Edit-Forms">
                <form>
                  <div className="form-group">
                    <h3>Add Tags</h3>
                    <input type="text" ></input>

                    <h3>Remove Tags</h3>
                    <input type="text"></input>
                  </div>

                  <div id="status-grouping">
                    <div className="form-group">
                      <h3>Approval Status</h3>
                      <div id="status-group1" >
                        <input type="radio" id="isApproved" name="statusGroup1" value="true" onClick={this.handleStatusGroup1} checked={this.state.isApproved}/>
                        <label for="isApproved">Approved</label><br />
                        <input type="radio" id="isProposal" name="statusGroup1" value="true" onClick={this.handleStatusGroup1} checked={this.state.isProposal}/>
                        <label for="isProposal">Proposal</label><br />
                        <input type="radio" id="Unchanged1" name="statusGroup1" value="true" checked={this.state.statusGroup1} onClick={this.handleStatusGroup1}/>
                        <label for="Unchanged1">Unchanged</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <h3>Recruiting Status</h3>
                      <div id="status-group1">
                      <input type="radio" id="isRecruiting" name="statusGroup2" value="true" onClick={this.handleStatusGroup2} checked={this.state.isRecruiting}/>
                      <label for="isRecruiting">Currently Recruiting</label><br />
                      <input type="radio" id="notRecruiting" name="statusGroup2" value="true" onClick={this.handleStatusGroup2} checked={this.state.isRecruiting}/>
                      <label for="isRecruiting">Not Recruiting</label><br />
                      <input type="radio" id="Unchanged2" name="statusGroup2" value="true" onClick={this.handleStatusGroup2} checked={this.state.statusGroup2}/>
                      <label for="Unchanged2">Unchanged</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <h3>Project Status</h3>
                      <div id="status-group2">
                        <input type="radio" id="isActive" name="statusGroup3" value="true" />
                        <label for="isActive">Active</label><br />
                        <input type="radio" id="isPaused" name="statusGroup3" value="true" />
                        <label for="isPaused">Paused</label><br />
                        <input type="radio" id="isStopped" name="statusGroup3" value="true" />
                        <label for="isStopped">Stopped</label><br />
                        <input type="radio" id="isArchived" name="statusGroup3" value="true" />
                        <label for="isArchived">Archived</label><br />
                        <input type="radio" id="Unchanged3" name="statusGroup3" value="true" checked />
                        <label for="Unchanged3">Unchanged</label>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="right-form-group">
                  <h3>Delete Projects</h3>
                  <button id="Remove-Button" onClick={this.handleDelete}>Remove Selected Projects</button>

                  <h3 id="Update-project-button-header">Update Projects</h3>
                  <button id="Update-Button" onClick={this.handleSubmit}>Update Selected Projects</button>
                </div>
              </div>
            </div>
          </div>
          : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => {
      dispatch(deleteProject(id));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProjects);