import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux';
import '../Application.scss';
import ViewAProject from './ViewAProjectContainer';




class ViewProject extends Component {



  render() {



    return (
        <Container className="mt-5">
            <ViewAProject />
        </Container>
    );
  }
}



const mapStateToProps = state => {
  return {
    projects: state.projects,
  };
};


export default connect(
  mapStateToProps
)(ViewProject);
