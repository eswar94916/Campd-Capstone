import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAllProjects } from '../../actions';
import EditProjects from "./EditProjects";
import ProjectSearch from '../ProjectsPage/ProjectSearch';
import Dashboard from "./Dashboard"



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
    this.setState({displayContainer: 0});
  };
  
  //this will update the dashboard container's contai with unapproved projects
  handlePendingProjects = (event) => {
    this.setState({displayContainer: 1});
  };
  
  handleAllUsers = (event) => {
    this.setState({displayContainer: 2});
  };
  
  handleEditProjects = (event) => {
    this.setState({displayContainer: 3});
  };
  
  handlTags = (event) => {
    this.setState({displayContainer: 4});
  };

  handlImport = (event) => {
    this.setState({displayContainer: 5});
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
        {Number(displayContainer) === 0 && <Dashboard/>}
        {Number(displayContainer) === 1 && <Dashboard/>}
        {Number(displayContainer) === 2 && <Dashboard/>}
        {Number(displayContainer) === 3 && <EditProjects/>}
        {Number(displayContainer) === 4 && <Dashboard/>}
        {Number(displayContainer) === 5 && <Dashboard/>}
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
  