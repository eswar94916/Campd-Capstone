import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Application.scss';
import ViewAProfileProject from './ViewAProfileProjectContainer';




class ViewProfileProject extends Component {



  render() {



    return (
      <div >
        <div >
          <div >
            <ViewAProfileProject />

          </div>
        </div>
      </div>
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
)(ViewProfileProject);
