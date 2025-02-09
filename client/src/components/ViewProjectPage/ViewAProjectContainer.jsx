import React from 'react';
import { connect } from 'react-redux';
import ViewListing from './ViewListing.jsx';
import { deleteProject, viewProjects } from '../../actions';
import { } from "react-router-dom";
import Projects from '../ProjectsPage/ProjectsRedux';

/* This component shows a single project to the user from the project page when the user clicks "More Info" on the projects page*/
function ViewAProject({ projects, onView }) {

  if(!projects.length === 1) {
    

    return(
      <Projects />
    )

  }


  return (
    <div>
      {projects.map(project => {
        return (
          <ViewListing project={ project } key={ project._id } onView={ onView } />
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
)(ViewAProject);
