import React, { Component } from "react";
import { connect } from 'react-redux';
import ProjectSearch from '../ProjectsPage/ProjectSearch';
import { fetchAllProjects } from '../../actions';
import ProjectList from '../ProjectsPage/ProjectListContainer.jsx';
import Project from './EditProjectListing';

class EditProjects extends Component {
    componentDidMount() {
      this.props.onMount()
    }

    updateEditProjectList = (event) => {
      console.log(event);
    };

    render(){
        return (
            <div id="Dashboard-Content">
                <h1 name="ex" id="Content-Title">Edit Projects</h1>
                <ProjectSearch />
                <select id="Project-Select" multiple size="12" onChange={this.updateEditProjectList(this)}>
                  {this.props.projects.map((project) => <option value={project._id} >{project.name}</option>)}
                </select>    
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};

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
)(EditProjects);