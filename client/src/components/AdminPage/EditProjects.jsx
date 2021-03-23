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



    render(){
        return (
            <div id="Dashboard-Content">
                <h1 id="Content-Title">Edit Projects</h1>
                <ProjectSearch />
                    {this.props.projects.map((project, index) => {
                        return (
                            <Project project={ project } key={ project._id } index={index}/>
                        )
                    })}
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