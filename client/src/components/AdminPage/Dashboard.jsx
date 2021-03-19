import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import './Dashboard.scss';

class AdminDashboard extends Component {

    render(){
        return (
          <div>
            <div id="Dashboard-container">
              <div id="Dashboard-Nav">
                <h2 id="Sidebar-Title">Admin Navigation</h2>
              </div>
              <div id="Dashboard-Content">
                <h1 id="AdminDashboard-h1">Portal Administration</h1>

              </div>
            </div>
          </div>
        );
    }
};

AdminDashboard.propTypes = {
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  const mapDispatchToProps = dispatch => {
  };
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminDashboard);
  