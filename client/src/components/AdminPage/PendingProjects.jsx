import React, { Component } from "react";
import { Button, Container, Col, Row, Modal } from "react-bootstrap";
import { connect } from 'react-redux';
import { deleteProject, viewProjects } from '../../actions';
import "./PendingProjects.scss";
import axios from "axios";
import { fetchAllProjects } from '../../actions';

//this class handles the pending projects view on the admin page
class PendingProjects extends Component {

  constructor(props) {
      super(props);
      this.state = {
          selectedProject: null,
          showModal: false
      }
  }

  /* this makes the modal pop up when a user wants to view more info */
  showProject = (project) => {
    this.setState({selectedProject: project, showModal: true});
  }

  /*this closes the modal without saving any changes */
  hideProject = () => {
    this.setState({selectedProject: null, showModal: false})
  }

  /* Approves a project by sending a request to the API.  If request is okay,
     changes project to approved and reloads projects fresh from API, and closes
     modal if it is open*/
  approve = (project) => {
    //object to send to API
    const projectInfo = {
      projectID: project._id,
      status: {
        isApproved: true
      }
    }

    //send request
    axios.post("/projects/updateStatus", projectInfo).then((res) => {
      if(res.status === 200) {
        //if successful, reload the projects
        this.props.reloadProjects();
      }
    }).catch((err) => {
      console.log(err);
    })

    //close modal if it is open
    this.setState({selectedProject: null, showModal: false})
  }

  //deletes project and resets page
  handleDelete = (project) => {
    //if project has an image, first delete that
    if(project.image !== "") {
      axios.delete(`upload/${project.image}`);
    }

    //call the function to delete a project
    this.props.onDelete(project._id)

    //close modal if it was open
    this.setState({selectedProject: null, showModal: false})
  }

  render(){
    return (
      <div id="Dashboard-Content">
        {/******************************************************
           This section contains the modal that pops up when the
           admin selects "view more info" from the page
        ******************************************************/}
        <Modal show={this.state.showModal} onHide={this.hideProject} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.selectedProject && this.state.selectedProject.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.selectedProject && (this.state.selectedProject.image === "" ? <></> : <img className="pendingProjects-modalImage" src={`image/${this.state.selectedProject.image}`} alt="project" />)}
            <p>
              <span style={{fontWeight: "bold"}}>Description: </span>{this.state.selectedProject && this.state.selectedProject.description}
            </p>
            <p>
              <span style={{fontWeight: "bold"}}>Tags: </span>{this.state.selectedProject && this.state.selectedProject.tags.join(" ")}
            </p>
            <p>
              <span style={{fontWeight: "bold"}}>GitHub Link: </span>{this.state.selectedProject && (this.state.selectedProject.gitRepo === "" ? "No GitHub Provided" : this.state.selectedProject.gitRepo)}
            </p>
            <p>
              <span style={{fontWeight: "bold"}}>Submitted By: </span>{this.state.selectedProject && this.state.selectedProject.owner}
            </p>
            <p>
              <span style={{fontWeight: "bold"}}>Contact: </span>{this.state.selectedProject && this.state.selectedProject.contactInfo}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => this.approve(this.state.selectedProject)}>Approve</Button>
            <Button variant="danger" onClick={() => this.handleDelete(this.state.selectedProject)}>Delete</Button>
            <Button variant="secondary" onClick={() => {this.hideProject()}}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/*The rest of this is the actual page that shows pending projects*/}
        <h1 id="Content-Title">Pending Projects</h1>
        <div className="pendingProjects">
          {this.props.projects.filter(project => !project.statuses.isApproved).map((project, index) => {
              return (
                  <Container key={index} className="pendingProject-container">
                    <Row style={{height: "100%"}}>
                      <Col md={9} className="pendingProjects-nameAndDesc">
                        <p className="pendingProjects-name">{project.name}</p>
                        <p className="pendingProjects-description">{project.description}</p>
                        <p className="pendingProjects-owner">Project Idea Submitted by {project.owner}, contact {project.contactInfo} for more information.</p>
                        <p className="pendingProjects-viewMore pendingProjects-owner" onClick={() => this.showProject(project)}>View More Info...</p>
                      </Col>
                      <Col md={3} className="pendingProjects-buttonContainer">
                        <Button className="pendingProjects-button" variant="success" onClick={() => this.approve(project)}>Approve</Button>
                        <Button className="pendingProjects-button" variant="danger" onClick={() => this.handleDelete(project)}>Delete</Button>
                      </Col>
                    </Row>
                  </Container>
              )
          })}
        </div>
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
      onView: id => {
        dispatch(viewProjects(id))
      },
      reloadProjects: () => {
        dispatch(fetchAllProjects());
      }
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PendingProjects);