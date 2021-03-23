import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAllProjects } from '../../actions';
import EditProjects from "./EditProjects";
import ProjectSearch from '../ProjectsPage/ProjectSearch';



import './AdminPage.scss';

class AdminDashboard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // Dashboard, AllUsers, EditProjects, Tags, Import, Export
      displaydisplayContainer: 0
    }
  }

  handleDashboard = (event) => {
    this.state.displayContainer = 0;
    document.getElementById("Content-Title").innerHTML = "Admin Dashboard";
  };
  
  //this will update the dashboard container's contai with unapproved projects
  handlePendingProjects = (event) => {
    this.state.componentDisplay = [0, 1, 0, 0, 0, 0 ];
    document.getElementById("Content-Title").innerHTML = "Pending Projects";
  };
  
  handleAllUsers = (event) => {
    this.state.componentDisplay = [0, 0, 1, 0, 0, 0 ];
    document.getElementById("Content-Title").innerHTML = "All Users";
  };
  
  handleEditProjects = (event) => {
    this.setState({displayContainer: 3});
    console.log(`displayContainer: ${this.state.displayContainer}`);
    document.getElementById("Content-Title").innerHTML = "Edit Projects";
  };
  
  handlTags = (event) => {
    this.state.componentDisplay = [0, 0, 0, 0, 1, 0 ];
    document.getElementById("Content-Title").innerHTML = "Tags";
  };

  handlImport = (event) => {
    this.state.componentDisplay = [0, 0, 0, 0, 0, 1 ];
    document.getElementById("Content-Title").innerHTML = "Import Projects";
  };

  componentDidMount() {
    this.handleDashboard();
  }
  
  render(){
    const displayContainer = this.state.displayContainer;
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
          {displayContainer == 3 && <EditProjects/>}
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
  