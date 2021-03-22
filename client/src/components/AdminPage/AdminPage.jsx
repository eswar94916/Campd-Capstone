import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAllProjects } from '../../actions';


import './Dashboard.scss';

class AdminDashboard extends Component {
  
  handleDashboard = (event) => {
    document.getElementById("Content-Title").innerHTML = "Admin Dashboard";
  };
  
  //this will update the dashboard container's contai with unapproved projects
  handlePendingProjects = (event) => {
    document.getElementById("Content-Title").innerHTML = "Pending Projects";
  };
  
  handleAllUsers = (event) => {
    document.getElementById("Content-Title").innerHTML = "All Users";
  };
  
  handleEditProjects = (event) => {
    document.getElementById("Content-Title").innerHTML = "Edit Projects";
  };
  
  handlTags = (event) => {
    document.getElementById("Content-Title").innerHTML = "Tags";
  };

  handlImport = (event) => {
    document.getElementById("Content-Title").innerHTML = "Import Projects";
  };

  componentDidMount() {
    this.handleDashboard();
  }
  
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
            <hr/>
            <li id="Import-Projects" onClick={this.handlTags}>Import Projects</li>
            <hr/>
            <li id="Export-Projects" onClick={this.handlTags}>Export Projects</li>
          </ul>
        </div>
        <div id="Dashboard-Content">
          <h1 id="Content-Title">Admin Dashboard</h1>
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
// const mapDispatchToProps = dispatch => {
// };
export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(AdminDashboard);
  