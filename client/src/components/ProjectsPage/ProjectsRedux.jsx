import React, { Component } from "react";
import { connect } from "react-redux";

import ProjectList from "./ProjectListContainer";
import ProjectSearch from "./ProjectSearch";
import { fetchAllProjects } from "../../actions";
import FilterProject from "./FilterProjects";
import { Container } from "react-bootstrap";

/* This component is the main projects page, and it shows the filter options on the left of
 * the page and the list of projects on the right.
 */
class Projects extends Component {
    componentDidMount() {
        //load projects
        this.props.onMount();
    }

    render() {
        return (
            <Container>
                {/* <ProjectSearch /> */}
                <div className="row mt-5">
                    <div className="col-3">
                        <FilterProject urlQuery={this.props.location.search} />
                    </div>
                    <div className="col-9">
                        <ProjectList />
                    </div>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projects,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMount: (id) => {
            //dispatch(fetchAllProjects());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
