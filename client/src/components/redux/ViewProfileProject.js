import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../layout/Style.scss';
import ViewAProfileProject from '../../containers/ViewAProfileProject';




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
