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
                <table id="Edit-Projects-Table">
                  <thead id="Table-Headers">
                    <tr>
                      <th>Title</th>
                      <th>Owner</th>
                      <th>Tags</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.projects.map((project) =><tr className={"Project-Table-Row"}><td>{project.name}</td><td>{project.owner}</td><td>{project.tags}</td></tr>)}
                  </tbody>
                </table>
                {/* <section>
                  {this.props.projects.map((project) => <option key={project.index} value={project.name} id={project.id}>{project.name}</option>)}
                </section>     */}
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