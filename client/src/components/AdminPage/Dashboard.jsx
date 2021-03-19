import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import './Dashboard.scss';

class AdminDashboard extends Component {
  render(){
    return (
      <div id="Dashboard-container">
        <div id="Dashboard-Nav">
          <h2 id="Sidebar-Title">Admin Navigation</h2>
          <ul id="Sidebar-List">
            <hr/>
            <li id="Dashboard">Dashboard</li>
            <hr/>
            <li id="Pending-Projects">Pending Projects</li>
            <hr/>
            <li id="All-Users">All Users</li>
            <hr/>
            <li id="Edit-Projects">Edit Projects</li>
            <hr/>
            <li id="Tags">Tags</li>
          </ul>
        </div>
        <div id="Dashboard-Content">
          <h1 id="Content-Title">Portal Administration</h1>
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
  