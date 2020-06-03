import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Style.scss';
import ViewAProject from '../../containers/ViewAProject';




class ViewProject extends Component {



  render() {



    return (
      <div >
        <div >
          <div >
            <ViewAProject />

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
)(ViewProject);
