import React, { Component } from "react";
import { Button, Container, Col, Row, Modal } from "react-bootstrap";
import { connect } from 'react-redux';
import { deleteProject, viewProjects } from '../../actions';
import "./PendingProjects.scss";
import axios from "axios";
import { fetchAllProjects } from '../../actions';


class PendingProjects extends Component {

  constructor(props) {
      super(props);
      this.state = {
          selectedProject: null,
          showModal: false
      }
  }

  showProject = (project) => {
    this.setState({selectedProject: project, showModal: true});
  }

  hideProject = () => {
    this.setState({selectedProject: null, showModal: false})
  }

  approve = (project) => {
    const projectInfo = {
      projectID: project._id,
      status: {
        isApproved: true
      }
    }

    axios.post("/projects/updateStatus", projectInfo).then((res) => {
      if(res.status === 200) {
        this.props.reloadProjects();
      }
    }).catch((err) => {
      console.log(err);
    })

    this.setState({selectedProject: null, showModal: false})
  }

  handleDelete = (project) => {
    if(project.image !== "") {
      axios.delete(`upload/${project.image}`);
    }
    this.props.onDelete(project._id)
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