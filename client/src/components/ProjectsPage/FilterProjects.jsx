import React from "react";
import { connect } from "react-redux";
import { filterProjects } from "../../actions/index";
import { filterTags } from "../../actions/index";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./FilterProjects.scss";

function urlToFilters(search, param) {
    const validFilters = [
        "proposal",
        "active",
        "paused",
        "stopped",
        "archived",
        "approved",
        "pending",
        "recruiting",
        "notRecruiting",
    ];
    var vars = search.split("&");
    for (var i = 0; i < vars.length; i++) {
        console.log(vars[i]);
        var pair = vars[i].split("=");
        console.log(pair);
        if (decodeURIComponent(pair[0]) == param) {
            var result = decodeURIComponent(pair[1]);
            var splitFields = result.split("-");
            console.log(splitFields);
            var validFields = splitFields.filter((thisEl) => {
                return validFilters.includes(thisEl);
            });
            console.log(validFields);
            return validFields;
        }
    }
    console.log("Query variable %s not found", param);
}

class FilterProjects extends React.Component {
    state = {
        filters: ["proposal", "active", "paused", "stopped", "approved", "recruiting", "notRecruiting"],
        proposalChecked: true,
        activeChecked: true,
        pausedChecked: true,
        stoppedChecked: true,
        archivedChecked: false,
        approvedChecked: true,
        pendingChecked: false,
        recruitingChecked: true,
        notRecruitingChecked: true,
        requireTags: [],
        urlQuery: "",
    };

    /**
     * Perform default filter (not showing unapproved)
     */
    componentDidMount() {
        if (this.props.urlQuery) {
            var filterArray = urlToFilters(this.props.urlQuery.slice(1), "includeFilters");
            this.setState({
                filters: filterArray,
            });
        }
        this.props.onFilter(this.state.filters);
    }

    handleFilter = (e) => {
        if (e.target.checked) {
            this.setState({
                filters: [...this.state.filters, e.target.id],
                [e.target.getAttribute("checkState")]: true,
            });
        } else {
            const i = this.state.filters.indexOf(e.target.id);
            this.setState({
                filters: this.state.filters.filter((_, index) => index !== i),
                [e.target.getAttribute("checkState")]: false,
            });
        }
    };

    handleTagRequireChange = (e) => {
        if (e.target.value) {
            var tagList = e.target.value.replace(/, /g, ",").split(",");
            this.setState({
                requireTags: tagList,
            });
        } else {
            this.setState({
                requireTags: [],
            });
        }
    };

    handleTagRequire = (e) => {
        this.props.onTagRequire(this.state.requireTags, null);
    };

    componentDidUpdate() {
        this.props.onFilter(this.state.filters);
    }

    handleReset = (e) => {
        this.setState({
            filters: ["proposal", "active", "paused", "stopped", "approved", "recruiting", "notRecruiting"],
            proposalChecked: true,
            activeChecked: true,
            pausedChecked: true,
            stoppedChecked: true,
            archivedChecked: false,
            approvedChecked: true,
            pendingChecked: false,
            recruitingChecked: true,
            notRecruitingChecked: true,
        });
    };

    hoverTip = (text) => {
        return (
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip">{text}</Tooltip>}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-question align-self-center text-muted"
                    viewBox="0 0 16 16">
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                </svg>
            </OverlayTrigger>
        );
    };

    render() {
        this.props.onFilter(this.state.filters);
        return (
            <div>
                <div className="filter-projects">
                    <Form>
                        <div class="card">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h5 class="mb-0">Status Filters</h5>
                                <button
                                    class="btn btn-secondary btn-sm mr-0"
                                    onClick={this.handleReset}
                                    type="button"
                                    value="">
                                    Reset
                                </button>
                            </div>

                            <p class="small text-muted mb-0 mt-2 p-1 pl-2">Project Status</p>
                            <div class="list-group list-group-flush">
                                <li class="list-group-item list-group-item-action d-flex  align-items-stretch">
                                    Proposals
                                    {this.hoverTip(
                                        "Proposals are ideas that have been submitted but have not been claimed by a team. They have no existing code."
                                    )}
                                    <div class="form-check ml-auto">
                                        <input
                                            onChange={this.handleFilter}
                                            class="form-check-input position-static"
                                            type="checkbox"
                                            id="proposal"
                                            checkState="proposalChecked"
                                            checked={this.state.proposalChecked}></input>
                                    </div>
                                </li>
                                <li class="list-group-item d-flex  align-items-stretch">
                                    Projects
                                    {this.hoverTip(
                                        "Projects have an existing code repository. Depending on their status, they may currently in development or available for a new team to resume development."
                                    )}
                                </li>
                                <li class="left-block-1 list-group-item list-group-item-action d-flex  align-items-stretch">
                                    Active
                                    {this.hoverTip(
                                        "Active projects are currently being developed by a team. If this team is accepting new members, the project will be marked as recruiting."
                                    )}
                                    <div class="form-check ml-auto">
                                        <input
                                            onChange={this.handleFilter}
                                            class="form-check-input position-static"
                                            type="checkbox"
                                            id="active"
                                            checkState="activeChecked"
                                            checked={this.state.activeChecked}></input>
                                    </div>
                                </li>
                                <li class="left-block-1 list-group-item list-group-item-action d-flex align-items-stretch">
                                    Paused
                                    {this.hoverTip(
                                        "Paused projects still belong to an existing team. Development is currently paused, but is expected to resume in some time."
                                    )}
                                    <div class="form-check ml-auto">
                                        <input
                                            onChange={this.handleFilter}
                                            class="form-check-input position-static"
                                            type="checkbox"
                                            id="paused"
                                            checkState="pausedChecked"
                                            checked={this.state.pausedChecked}></input>
                                    </div>
                                </li>
                                <li class="left-block-1 list-group-item list-group-item-action d-flex  align-items-stretch">
                                    Stopped
                                    {this.hoverTip(
                                        "Stopped projects no longer belong to a team. These projects may be claimed by a new team to continue development."
                                    )}
                                    <div class="form-check ml-auto">
                                        <input
                                            onChange={this.handleFilter}
                                            class="form-check-input position-static"
                                            type="checkbox"
                                            id="stopped"
                                            checkState="stoppedChecked"
                                            checked={this.state.stoppedChecked}></input>
                                    </div>
                                </li>
                                <li class="left-block-1 list-group-item list-group-item-action d-flex align-items-stretch">
                                    Archived
                                    {this.hoverTip(
                                        "Archived projects have been closed by an administrator. These may be also be completed and no longer require development."
                                    )}
                                    <div class="form-check ml-auto">
                                        <input
                                            onChange={this.handleFilter}
                                            class="form-check-input position-static"
                                            type="checkbox"
                                            id="archived"
                                            checkState="archivedChecked"
                                            checked={this.state.archivedChecked}></input>
                                    </div>
                                </li>

                                <p class="small text-muted mb-0 mt-2 p-1 pl-2">Approval Status</p>
                                <li class="space-top list-group-item list-group-item-action d-flex align-items-stretch">
                                    Approved
                                    {this.hoverTip("These items have been reviewed and approved by an administrator.")}
                                    <div class="form-check ml-auto">
                                        <input
                                            onChange={this.handleFilter}
                                            class="form-check-input position-static"
                                            type="checkbox"
                                            id="approved"
                                            checkState="approvedChecked"
                                            checked={this.state.approvedChecked}></input>
                                    </div>
                                </li>

                                <li class="list-group-item list-group-item-action d-flex align-items-stretch">
                                    Pending
                                    {this.hoverTip(
                                        "These items have not yet been reviewed by an administrator. They may not be appropriate candidates for inclusion on this site."
                                    )}
                                    <div class="form-check ml-auto">
                                        <input
                                            onChange={this.handleFilter}
                                            class="form-check-input position-static"
                                            type="checkbox"
                                            id="pending"
                                            checkState="pendingChecked"
                                            checked={this.state.pendingChecked}></input>
                                    </div>
                                </li>
                                <p class="small text-muted mb-0 mt-2 p-1 pl-2">Recruiting Status</p>
                                <li class="space-top list-group-item list-group-item-action d-flex align-items-stretch">
                                    Recruiting
                                    {this.hoverTip(
                                        "The owner of this project has indicated that the current development team is accepting new members."
                                    )}
                                    <div class="form-check ml-auto">
                                        <input
                                            onChange={this.handleFilter}
                                            class="form-check-input position-static"
                                            type="checkbox"
                                            id="recruiting"
                                            checkState="recruitingChecked"
                                            checked={this.state.recruitingChecked}></input>
                                    </div>
                                </li>

                                <li class="list-group-item list-group-item-action d-flex align-items-stretch">
                                    Not Recruiting
                                    {this.hoverTip(
                                        "The owner of this project has indicated that the current development team is not accepting new members."
                                    )}
                                    <div class="form-check ml-auto">
                                        <input
                                            onChange={this.handleFilter}
                                            class="form-check-input position-static"
                                            type="checkbox"
                                            id="notRecruiting"
                                            checkState="notRecruitingChecked"
                                            checked={this.state.notRecruitingChecked}></input>
                                    </div>
                                </li>
                            </div>
                        </div>
                    </Form>
                </div>
                <div>
                    <Form>
                        <label>
                            Require tags:
                            <input type="text" name="requiretag" onChange={this.handleTagRequireChange} />
                        </label>
                        <Button variant="dark" onClick={this.handleTagRequire} type="button" value="">
                            Go!
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ projects }) {
    return { value: projects.value };
}

function mapDispatchToProps(dispatch) {
    return {
        onFilter: (value) => {
            dispatch(filterProjects(value));
        },
        onTagRequire: (include, exclude) => {
            dispatch(filterTags(include, exclude));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterProjects);
