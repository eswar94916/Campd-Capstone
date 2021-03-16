import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectList from './ProjectListContainer';
import ProjectSearch from './ProjectSearch';
import { fetchAllProjects } from '../../actions';
import FilterProject from '../../utils/FilterProjects';
import { Container } from 'react-bootstrap'

class Projects extends Component {

  componentDidMount() {
    this.props.onMount()
  }


  render() {
    return (
      <Container>
            <ProjectSearch />
            <FilterProject />
            <ProjectList />
      </Container>
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
