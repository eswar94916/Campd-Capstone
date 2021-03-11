import React from 'react';
import { connect } from 'react-redux';
import ProjectProfile from '../components/layout/ProfileListing';
import { deleteProject, viewProjects } from '../actions';


function ProjectProfileList({ projects, onDelete, onView }) {
  if(!projects.length) {
    return (
      <div>
        No Projects
      </div>
    )
  }
  return (
    <div>
      {projects.map(project => {
        return (
          <ProjectProfile project={ project } onDelete={ onDelete } onView={ onView } key={ project._id } />
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
)(ProjectProfileList);
