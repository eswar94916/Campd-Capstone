import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectList from '../../containers/ProjectList';
import ProjectSearch from '../../utils/ProjectSearch';
import { fetchAllProjects } from '../../actions';

class Projects extends Component {

  componentDidMount() {
    this.props.onMount()
  }


  render() {
    return (
      <div >
        <div >
          <div >
            <ProjectSearch />
            <ProjectList />
          </div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMount: id => {
      dispatch(fetchAllProjects())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
