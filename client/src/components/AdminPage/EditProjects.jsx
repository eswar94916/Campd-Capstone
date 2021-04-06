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
import {Table } from 'react-bootstrap'
import axios from "axios";
import { fetchAllProjects } from '../../actions';


class EditProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idArray: [],
      isEditing: false,
      isApproved: false,
      isProposal: false,
      isNew: false,
      isRecruiting: false,
      notRecruiting: false,
      isActive: false,
      isPaused: false,
      isStopped: false,
      isArchived: false,
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
    if (event.target.id === "isProposal") {
      this.setState({
        isApproved: false,
        isProposal: true,
        statusGroup1: false
      })
    } else if (event.target.id === "isApproved") {
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
    if (event.target.id === "isRecruiting") {
      this.setState({
        isRecruiting: true,
        notRecruiting: false,
        statusGroup2: false
      })
    } else if (event.target.id === "notRecruiting") {
      this.setState({
        isRecruiting: false,
        notRecruiting: true,
        statusGroup2: false
      })
    } else {
      this.setState({
        isRecruiting: false,
        notRecruiting: false,
        statusGroup2: true
      })
    }
  }

  handleStatusGroup3 = (event) => {
    console.log(event.target.id);
    if (event.target.id === "isActive") {
      this.setState({
        isActive: true,
        isPaused: false,
        isStopped: false,
        isArchived: false,
        statusGroup3: false
      })
    } else if (event.target.id === "isPaused") {
      this.setState({
        isActive: false,
        isPaused: true,
        isStopped: false,
        isArchived: false,
        statusGroup3: false
      })
    } else if (event.target.id === "isStopped") {
      this.setState({
        isActive: false,
        isPaused: false,
        isStopped: true,
        isArchived: false,
        statusGroup3: false
      })
    } else if (event.target.id === "isArchived") {
      this.setState({
        isActive: false,
        isPaused: false,
        isStopped: false,
        isArchived: true,
        statusGroup3: false
      })
    } else {
      this.setState({
        isActive: false,
        isPaused: false,
        isStopped: false,
        isArchived: false,
        statusGroup3: true
      })
    }
  }

  handleSubmit = (event) => {
    var tempNewStatus = {};
    if (this.state.statusGroup1 === false) {
      tempNewStatus["isApproved"] = this.state.isApproved;
      tempNewStatus["isProposal"] = this.state.isProposal;
      // tempNewStatus = tempNewStatus.concat([{isApproved: this.state.isApproved, isProposal: this.state.isProposal}]);
    };
    
    if (this.state.statusGroup2 === false) {
      tempNewStatus["isRecruiting"] = this.state.isRecruiting;
    };

    if (this.state.statusGroup3 === false) {
      tempNewStatus["isActive"] = this.state.isActive;
      tempNewStatus["isPaused"] = this.state.isPaused;
      tempNewStatus["isStopped"] = this.state.isStopped;
      tempNewStatus["isArchived"] = this.state.isArchived;
    }

    console.log(tempNewStatus);
    
    //object to send to API
    const batchEditInfo = {
      projectID: this.state.idArray,
      newTags: this.state.addTags,
      removeTags: this.state.removeTags,
      newStatus: tempNewStatus
    };
    
    //sending request
    axios.post("/projects/batchEdit", batchEditInfo).then((res) => {
      if(res.status === 200) {
        //if successful, reload the projects
        this.props.reloadProjects();
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  handleDelete = (event) => {
    this.state.idArray.forEach(projectID => {
      console.log(`projectID: ${projectID}`);
    });
  };

  handleAddTags = (event) => {
    console.log(this.state.addTags);

    // creating an array of elements based on commas
    let tempAddTags = event.target.value.split(',');
    
    //removing white space from each element
    tempAddTags.forEach ((tag, index) => {
      tempAddTags[index] = tag.trim();
    });

    // removing null and empty elemets
    tempAddTags = tempAddTags.filter( el => {
      return el !== null && el !== '';
    })

    this.setState({addTags: tempAddTags});
  };

  handleRemoveTags = (event) => {
    console.log(this.state.removeTags);

    // creating an array of elements based on commas
    let tempremoveTags = event.target.value.split(',');
    
    //removing white space from each element
    tempremoveTags.forEach ((tag, index) => {
      tempremoveTags[index] = tag.trim();
    });

    // removing null and empty elemets
    tempremoveTags = tempremoveTags.filter( el => {
      return el !== null && el !== '';
    })

    this.setState({removeTags: tempremoveTags});
  };

  render() {
    return (
      <div id="Dashboard-Content">
        <h1 name="ex" id="Content-Title">Edit Projects</h1>
        <ProjectSearch />
        <Table id="Batch-Edit-Table" striped bordered hover size="sm">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Owner(s)</th>
              <th>Tags</th>
              {/* <th>Status</th> */}
            </tr>
          </thead>
          <tbody>
            {this.props.projects.map((project) =>
              <tr key={project._id} onClick={() => this.updateEditProjectList(project._id)}
                className={this.state.idArray.includes(project._id) ? "Selected-Row Table-Row" : "Unselected-Row Table-Row"} >
                <td>{project.name}</td>
                <td>{project.owner}</td>
                <td>{project.tags}</td>
              </tr>)}
          </tbody>
        </Table>
        <button className="Edit-Projects-Button" onClick={this.togglePopup}>Edit Selected Projects</button>
        {this.state.isEditing ?
          <div id="Edit-Selected-Projects-Background">
            <div id="Edit-Selected-Projects-Container">
              <div id="mdiv" onClick={this.togglePopup}>
                <div className="mdiv">
                  <div className="md"></div>
                </div>
              </div>
              <h2>Editing Selected Projects</h2>
              <div id="Edit-Forms">
                <form>
                  <div className="form-group">
                    <h3>Add Tags</h3>
                    <input type="text" onChange={this.handleAddTags}></input>

                    <h3>Remove Tags</h3>
                    <input type="text" onChange={this.handleRemoveTags}></input>
                  </div>

                  <div id="status-grouping">
                    <div className="form-group">
                      <h3>Approval Status</h3>
                      <div id="status-group1" >
                        <input type="radio" id="isApproved" name="statusGroup1" value="true" onClick={this.handleStatusGroup1} defaultChecked={this.state.isApproved} />
                        <label htmlFor="isApproved">Approved</label><br />
                        <input type="radio" id="isProposal" name="statusGroup1" value="true" onClick={this.handleStatusGroup1} defaultChecked={this.state.isProposal} />
                        <label htmlFor="isProposal">Proposal</label><br />
                        <input type="radio" id="Unchanged1" name="statusGroup1" value="true" onClick={this.handleStatusGroup1} defaultChecked={this.state.statusGroup1} />
                        <label htmlFor="Unchanged1">Unchanged</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <h3>Recruiting Status</h3>
                      <div id="status-group1">
                        <input type="radio" id="isRecruiting" name="statusGroup2" value="true" onClick={this.handleStatusGroup2} defaultChecked={this.state.isRecruiting} />
                        <label htmlFor="isRecruiting">Currently Recruiting</label><br />
                        <input type="radio" id="notRecruiting" name="statusGroup2" value="true" onClick={this.handleStatusGroup2} defaultChecked={this.state.notRecruiting} />
                        <label htmlFor="notRecruiting">Not Recruiting</label><br />
                        <input type="radio" id="Unchanged2" name="statusGroup2" value="true" onClick={this.handleStatusGroup2} defaultChecked={this.state.statusGroup2} />
                        <label htmlFor="Unchanged2">Unchanged</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <h3>Project Status</h3>
                      <div id="status-group2">
                        <input type="radio" id="isActive" name="statusGroup3" value="true" onClick={this.handleStatusGroup3} defaultChecked={this.state.isActive}/>
                        <label htmlFor="isActive">Active</label><br />
                        <input type="radio" id="isPaused" name="statusGroup3" value="true" onClick={this.handleStatusGroup3} defaultChecked={this.state.isPaused}/>
                        <label htmlFor="isPaused">Paused</label><br />
                        <input type="radio" id="isStopped" name="statusGroup3" value="true" onClick={this.handleStatusGroup3} defaultChecked={this.state.isStopped}/>
                        <label htmlFor="isStopped">Stopped</label><br />
                        <input type="radio" id="isArchived" name="statusGroup3" value="true" onClick={this.handleStatusGroup3} defaultChecked={this.state.isArchived}/>
                        <label htmlFor="isArchived">Archived</label><br />
                        <input type="radio" id="Unchanged3" name="statusGroup3" value="true" onClick={this.handleStatusGroup3} defaultChecked={this.state.statusGroup3} />
                        <label htmlFor="Unchanged3">Unchanged</label>
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
    },
    reloadProjects: () => {
      dispatch(fetchAllProjects());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProjects);