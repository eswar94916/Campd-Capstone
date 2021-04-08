import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PendingProjects from "./PendingProjects";
import AllUsers from "./AllUsers";
import EditProjects from "./EditProjects";
import ImportProjects from "./ImportProjects";
import ExportProjects from "./ExportProjects";
import { fetchAllProjects } from '../../actions';

import './AdminPage.scss';

class AdminDashboard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // Dashboard, AllUsers, EditProjects, Tags, Import, Export
      displaydisplayContainer: 0,
      numPending: 0
    }
  }
  
  //this will update the dashboard container's contai with unapproved projects
  handlePendingProjects = (event) => {
    this.setState({displayContainer: 0});
  };
  
  handleAllUsers = (event) => {
    this.setState({displayContainer: 1});
  };
  
  handleEditProjects = (event) => {
    this.setState({displayContainer: 2});
  };

  handlImport = (event) => {
    this.setState({displayContainer: 3});
  };
  
  handlExport = (event) => {
    this.setState({displayContainer: 4});
  };

  componentDidMount() {
    this.handlePendingProjects();
    this.props.onMount();
    this.setState({numPending: this.props.projects.filter((project) => {return !project.statuses.isApproved;}).length })
  }

  updatePending = (num) => {
    this.setState({numPending: num});
  }
  
  render(){
    const displayContainer = this.state.displayContainer;
    return (
      <div id="Dashboard-Container">
        <div id="Dashboard-Nav">
          <h2 id="Sidebar-Title" onClick={this.handleDashboard}>Admin Navigation</h2>
          <ul id="Sidebar-List">
            <hr/>
            <li id="Pending-Projects" onClick={this.handlePendingProjects}>Pending Projects ({this.state.numPending})</li>
            <hr/>
            <li id="All-Users" onClick={this.handleAllUsers}>All Users</li>
            <hr/>
            <li id="Edit-Projects" onClick={this.handleEditProjects}>Edit Projects</li>
            <hr/>
            <li id="Import-Projects" onClick={this.handlImport}>Import Projects</li>
            <hr/>
            <li id="Export-Projects" onClick={this.handlExport}>Export Projects</li>
          </ul>
        </div>
        {Number(displayContainer) === 0 && <PendingProjects updatePending={this.updatePending} />}
        {Number(displayContainer) === 1 && <AllUsers/>}
        {Number(displayContainer) === 2 && <EditProjects/>}
        {Number(displayContainer) === 3 && <ImportProjects/>}
        {Number(displayContainer) === 4 && <ExportProjects/>}
      </div>
    );
  }
};

AdminDashboard.propTypes = {
    auth: PropTypes.object.isRequired
  };
const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects
});

const mapDispatchToProps = dispatch => {
  return {
    onMount: id => {
      dispatch(fetchAllProjects())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboard);