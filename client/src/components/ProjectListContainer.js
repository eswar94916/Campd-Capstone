import React from 'react';
import { connect } from 'react-redux';
import Project from '../Listing';
import { deleteProject, viewProjects } from '../../actions';
import {Container} from 'react-bootstrap'


function ProjectList({ projects, onDelete, onView }) {
  if(!projects.length) {
    return (
      <Container>
        No Projects
      </Container>
    )
  }
  return (
    <Container>
        {projects.map((project, index) => {
            return (
                <Project project={ project } onDelete={ onDelete } onView={ onView } key={ project._id } index={index}/>
            );
        })}
    </Container>
  );
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);
