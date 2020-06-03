import React from 'react';
import { connect } from 'react-redux';
import Project from '../components/layout/Listing';
import { deleteProject, viewProjects } from '../actions';
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
    <div>
      {projects.map(project => {
        return (
            <Container>
                <Project project={ project } onDelete={ onDelete } onView={ onView } key={ project._id } />
            </Container>
        );
      })}
    </div>
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
