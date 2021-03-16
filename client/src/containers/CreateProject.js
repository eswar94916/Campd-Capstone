// CreateProject.js

import { connect } from 'react-redux';
import { createProject } from '../actions';
import AddProject from '../components/AddProject';

const mapDispatchToProps = dispatch => {
  return {
    onAddProject: project => {
      dispatch(createProject(project));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddProject);
