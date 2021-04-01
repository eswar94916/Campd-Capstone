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
  constructor(props) {
    super(props);
    this.state = {
      idArray: [],
      isEditing: false,
      statuses: {
        isApproved: Boolean,
        isNew: Boolean,
        isActive: Boolean,
        isRecruiting: Boolean,
        isPaused: Boolean,
        isStopped: Boolean,
        isArchived: Boolean,
        isProposal: Boolean,
      },
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
    if (this.state.idArray.length != 0) {
      this.setState({
        isEditing: !this.state.isEditing
      });
    }
  };

  handleSubmit = (event) => {

  };

  handleDelete = (event) => {
    // this.state.idArray.forEach(id => {
    //   console.log(id);
    // });
    console.log(this.state.idArray);
  };

  render() {
    return (
      <div id="Dashboard-Content">
        <h1 name="ex" id="Content-Title">Edit Projects</h1>
        <ProjectSearch />
        <table id="Batch-Edit-Table">
          <thead>
            <th>Title</th>
            <th>Owner(s)</th>
            <th>Tags</th>
            <th>Status</th>
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
        </table>
        <button className="Edit-Projects-Button" onClick={this.togglePopup}>Edit Selected Projects</button>
        {this.state.isEditing ? <div id="Edit-Selected-Projects-Background">
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
                  <h3>Update Approval Status</h3>
                  <div id="status-group1">
                    <input type="radio" id="isApproved" name="statusGroup1" value="true" />
                    <label for="isApproved">Approved</label><br />
                    <input type="radio" id="isProposal" name="statusGroup1" value="true" />
                    <label for="isProposal">Proposal</label><br />
                    <input type="radio" id="Unchanged1" name="statusGroup1" value="true" />
                    <label for="Unchanged1">Unchanged</label>
                  </div>
                </div>
                <div className="form-group">
                  <h3>Update Project Status</h3>
                  <div id="status-group2">
                    <input type="radio" id="isActive" name="statusGroup2" value="true" />
                    <label for="isActive">Active</label><br />
                    <input type="radio" id="isPaused" name="statusGroup2" value="true" />
                    <label for="isPaused">Paused</label><br />
                    <input type="radio" id="isStopped" name="statusGroup2" value="true" />
                    <label for="isStopped">Stopped</label><br />
                    <input type="radio" id="isArchived" name="statusGroup2" value="true" />
                    <label for="isArchived">Archived</label><br />
                    <input type="radio" id="Unchanged2" name="statusGroup2" value="true" />
                    <label for="Unchanged2">Unchanged</label>
                  </div>
                </div>
              </div>
              <button className="Edit-Projects-Button" onClick={this.handleSubmit}>Submit</button>
            </form>
            <div className="right-form-group">
              <h3>Delete Projects</h3>
              <button id="Remove-Button" onClick={this.handleDelete}>Remove Selected Projects</button>
            </div>
          </div>
        </div>
      </div> : null}
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