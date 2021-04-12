import React from "react";
import { connect } from "react-redux";
import Project from "./Listing";
import { deleteProject, viewProjects } from "../../actions";
import { Container } from "react-bootstrap";

/* This component displays the list of projects on the projects page */
function ProjectList({ projects, onDelete, onView }) {
    //if no projects then simply show "No Projects"
    if (!projects.length) {
        return <Container>No Projects</Container>;
    }
    //otherwise return a list of project info boxes
    return (
        <Container>
            {projects.map((project, index) => {
                return (
                    <Project project={project} onDelete={onDelete} onView={onView} key={project._id} index={index} />
                );
            })}
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        projects: state.projects,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (id) => {
            dispatch(deleteProject(id));
        },
        onView: (id) => {
            dispatch(viewProjects(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
