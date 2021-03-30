import React, { Component } from "react";
import { Button, Card, Container, Col, Row, Dropdown, DropdownButton } from "react-bootstrap";
import { connect } from 'react-redux';
import { deleteProject, viewProjects } from '../../actions';
import "./PendingProjects.scss";
import axios from "axios";
import { fetchAllProjects } from '../../actions';


class PendingProjects extends Component {

  constructor(props) {
      super(props);
      this.state = {
          selectedProject: {},
          showModal: false
      }
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

  }

  handleDelete = (project) => {
    if(project.image !== "") {
      axios.delete(`upload/${project.image}`);
    }
    this.props.onDelete(project._id)
  }

  render(){
    return (
        <div id="Dashboard-Content">
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
                          <p className="pendingProjects-owner">View More Info...</p>
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