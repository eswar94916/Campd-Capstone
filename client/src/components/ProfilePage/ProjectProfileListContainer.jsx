import React from 'react';
import { connect } from 'react-redux';
import ProjectProfile from './ProfileListing';
import { deleteProject, viewProjects } from '../../actions';

/* This function is called by the Profile.jsx component and lists the projects on a profile page */
function ProjectProfileList({ projects, onDelete, onView }) {
  //if no projects simply show "No Projects"
  if(!projects.length) {
    return (
      <div>
        No Projects
      </div>
    )
  }
  //otherwise return a list of the users projects
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
