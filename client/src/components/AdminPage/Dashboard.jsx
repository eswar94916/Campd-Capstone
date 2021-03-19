import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import './Dashboard.scss';

class AdminDashboard extends Component {
  handleDashboard = (event) => {
    console.log("Dashboard");
  };
  
  //this will update the dashboard container's contai with unapproved projects
  handlePendingProjects = (event) => {
    console.log("Pending Projects");
  };

  handleAllUsers = (event) => {
    console.log("All Users");
  };

  handleEditProjects = (event) => {
    console.log("Edit Projects");
  };

  handlTags = (event) => {
    console.log("Tags");
  };
  
  render(){
    return (
      <div id="Dashboard-Container">
        <div id="Dashboard-Nav">
          <h2 id="Sidebar-Title">Admin Navigation</h2>
          <ul id="Sidebar-List">
            <hr/>
            <li id="Dashboard" onClick={this.handleDashboard}>Dashboard</li>
            <hr/>
            <li id="Pending-Projects" onClick={this.handlePendingProjects}>Pending Projects</li>
            <hr/>
            <li id="All-Users" onClick={this.handleAllUsers}>All Users</li>
            <hr/>
            <li id="Edit-Projects" onClick={this.handleEditProjects}>Edit Projects</li>
            <hr/>
            <li id="Tags" onClick={this.handlTags}>Tags</li>
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
  