import React from 'react';
import { connect } from 'react-redux';
import ViewProfileListing from './ViewProfileListing';
import { deleteProject, viewProjects } from '../../actions';
import { } from "react-router-dom";
import Profile from './Profile';

/* This function shows a project's information.  This is rendered when a user selects "view" on a project from
 * their profile page.
 *TODO this is ugly.  update it to make it prettier 
 */
function ViewAProfileProject({ projects, onView }) {

  if(!projects.length === 1) {


    return(
      <Profile />
    )

  }


  return (
    <div>
      {projects.map(project => {
        return (
          <ViewProfileListing project={ project } key={ project._id } onView={ onView } />
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
)(ViewAProfileProject);
