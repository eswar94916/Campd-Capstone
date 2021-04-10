// AddProject.js

import React from "react";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";

import "../Application.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions";
import InputTag from "./InputTag";
import axios from "axios";
import "./addStyles.scss";
import TextTruncate from "react-text-truncate";

class AddProject extends React.Component {
    state = {
        name: "",
        owner: this.props.auth.user.name + " " + this.props.auth.user.lastname,
        ownerID: this.props.auth.user.id,
        contactInfo: this.props.auth.user.email,
        status: "",
        activeStatus: "isProposal",
        statuses: {
            isProposal: true,
            isActive: false,
            isRecruiting: false,
            isPaused: false,
            isStopped: false,
            isArchived: false,
        },
        description: "",
        gitRepo: "",
        tags: [],
        image: "",
        imageName: "Choose file...",
        userGuide: "",
        developerGuide: "",
        installationGuide: "",
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleImageUpdate = (e) => {
        //   console.log(e.target.files[0]
        if (this.state.image !== "") {
            axios.delete(`upload/${this.state.image}`);
            return null;
        }
        var formData = new FormData();
        formData.append("cover-image", e.target.files[0]);
        axios
            .post("upload/cover-image", formData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((res) => {
                console.log(res);
                this.setState({
                    image: res.data.filename,
                    imageName: e.target.files[0].name,
                });
            })
            .catch((err) => console.log(err));
    };

    handleSelectChange = (e) => {
        const currentStatuses = this.state.statuses;
        console.log(e.target.getAttribute("selectedstatus"));
        for (const thisKey of Object.keys(this.state.statuses)) {
            if (e.target.getAttribute("selectedstatus") == thisKey) {
                currentStatuses[thisKey] = true;
            } else if (thisKey != "isRecruiting") {
                currentStatuses[thisKey] = false;
            }
        }
        this.setState({
            statuses: currentStatuses,
            activeStatus: e.target.getAttribute("selectedstatus"),
        });
        console.log(this.state);
    };

    handleRecruiting = (e) => {
        const currentStatuses = this.state.statuses;
        currentStatuses.isRecruiting = e.target.checked;
        this.setState({
            statuses: currentStatuses,
        });
    };

    handleTagsAdd = (newTag) => {
        this.setState({ tags: [...this.state.tags, newTag] });
    };
    handleTagsRemove = (index) => {
        const newTags = [...this.state.tags];
        newTags.splice(index, 1);
        this.setState({ tags: newTags });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);

        if (this.state.name.trim() && this.state.description.trim()) {
            this.props.onAddProject(this.state);
            this.handleReset();
        }
    };

    handleReset = () => {
        this.setState({
            name: "",
            owner: this.props.auth.user.name + " " + this.props.auth.user.lastname,
            ownerID: this.props.auth.user.id,
            contactInfo: this.props.auth.user.email,
            status: "",
            activeStatus: "isProposal",
            statuses: {
                isProposal: false,
                isActive: true,
                isRecruiting: false,
                isPaused: false,
                isStopped: false,
                isArchived: false,
            },
            description: "",
            gitRepo: "",
            tags: [],
            image: "",
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
                    className="bi bi-question align-self-center text-muted"
                    viewBox="0 0 16 16">
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                </svg>
            </OverlayTrigger>
        );
    };

    render() {
        const { user } = this.props.auth;
        return (
            <div className="card shadow mx-auto col-md-7 my-5">
                <div className="card-body">
                    <h2>Submit a New Project or Idea</h2>
                    <p>
                        All new submissions will be reviewed by an administrator before becoming visible on this site.
                    </p>
                    <hr />
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <div className="row mb-3">
                            <div className="col-3">
                                <label>Project Name</label>
                            </div>
                            <div className="col">
                                <input
                                    type="name"
                                    className="form-control"
                                    placeholder="Project Name"
                                    name="name"
                                    required={true}
                                    onChange={this.handleInputChange}
                                    value={this.state.name}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-3">
                                <label>Owner Name(s)</label>
                            </div>

                            <div className="col">
                                <input
                                    type="owner"
                                    className="form-control"
                                    placeholder="Owner name(s)"
                                    name="owner"
                                    required={true}
                                    onChange={this.handleInputChange}
                                    defaultValue={user.name + " " + user.lastname}
                                />
                                <small className="text-muted">
                                    This can be multiple names if a team is working on this project. When editing this
                                    project in the future, only the user who submits this form will have owner
                                    privilages.
                                </small>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-3">
                                <label>Contact Information</label>
                            </div>

                            <div className="col">
                                <input
                                    type="contactInfo"
                                    className="form-control"
                                    placeholder="Add contact information"
                                    name="contactInfo"
                                    required={true}
                                    onChange={this.handleInputChange}
                                    value={this.state.contactInfo}
                                />
                                <small className="text-muted">
                                    UNT emails are preferred. You may enter a list of emails if a team is working on
                                    this project.
                                </small>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-3">
                                <label>Recruiting</label>
                            </div>
                            <div className="col">
                                <Form.Check
                                    onChange={this.handleRecruiting}
                                    type="checkbox"
                                    value={this.state.statuses.isRecruiting}
                                    id="isRecruiting"
                                    label="Advertise that you are looking for new team members?"
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-3">
                                <label>Description</label>
                            </div>
                            <div className="col">
                                <textarea
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    name="description"
                                    required={true}
                                    onChange={this.handleInputChange}
                                    value={this.state.description}></textarea>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-3">
                                <label>GitHub Link</label>
                            </div>
                            <div className="col">
                                <input
                                    type="gitRepo"
                                    className="form-control"
                                    placeholder="Add github link"
                                    name="gitRepo"
                                    required={false}
                                    onChange={this.handleInputChange}
                                    value={this.state.gitRepo}
                                />
                                <small className="text-muted">Leave empty if this is a proposal.</small>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <label>Project Status</label>
                                <ul className="list-group list-group-horizontal">
                                    <button
                                        type="button"
                                        onClick={this.handleSelectChange}
                                        className={
                                            "list-group-item list-group-item-action d-flex flex-column align-items-start" +
                                            (this.state.activeStatus == "isProposal" ? " active" : "")
                                        }
                                        selectedstatus="isProposal">
                                        <p>Proposal</p>
                                        <p className="small text-muted">
                                            Proposals are project ideas that have not been started or are available for
                                            teams of students to begin working on.
                                        </p>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={this.handleSelectChange}
                                        className={
                                            "list-group-item list-group-item-action  d-flex flex-column align-items-start" +
                                            (this.state.activeStatus == "isActive" ? " active" : "")
                                        }
                                        selectedstatus="isActive">
                                        <p>Active</p>
                                        <p className="small text-muted">
                                            Active projects are currently in development by a team of students.
                                        </p>
                                    </button>
                                    <button
                                        type="button"
                                        selectedstatus="isPaused"
                                        onClick={this.handleSelectChange}
                                        className={
                                            "list-group-item list-group-item-action  d-flex flex-column align-items-start" +
                                            (this.state.activeStatus == "isPaused" ? " active" : "")
                                        }>
                                        <p>Paused</p>
                                        <p className="small text-muted">
                                            Paused projects are not currently in development, but the current team is
                                            expected to resume development in the near future.
                                        </p>
                                    </button>
                                    <button
                                        type="button"
                                        selectedstatus="isStopped"
                                        onClick={this.handleSelectChange}
                                        className={
                                            "list-group-item list-group-item-action  d-flex flex-column align-items-start" +
                                            (this.state.activeStatus == "isStopped" ? " active" : "")
                                        }>
                                        <p>Stopped</p>
                                        <p className="small text-muted">
                                            Stopped projects are not currently in development, and the previous team
                                            will not be resuming development.
                                        </p>
                                    </button>
                                    <button
                                        type="button"
                                        selectedstatus="isArchived"
                                        onClick={this.handleSelectChange}
                                        className={
                                            "list-group-item list-group-item-action d-flex flex-column  align-items-start" +
                                            (this.state.activeStatus == "isArchived" ? " active" : "")
                                        }>
                                        <p>Archived</p>
                                        <p className="small text-muted">
                                            Archived projects are saved for historical purposes.
                                        </p>
                                    </button>
                                </ul>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-3">
                                <label>Project Tags</label>
                            </div>
                            <div className="col">
                                <InputTag
                                    placeholder="Add Tags"
                                    tags={this.state.tags}
                                    addTag={this.handleTagsAdd}
                                    removeTag={this.handleTagsRemove}
                                />
                                <small className="text-muted">Press enter after entering a tag to add it.</small>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-3">
                                <label>Thumbnail Image</label>
                            </div>
                            <div className="col">
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="customFile"
                                        onChange={this.handleImageUpdate}
                                    />
                                    <label className="custom-file-label">{this.state.imageName}</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col d-flex justify-content-between">
                                <Button variant="danger" type="button" onClick={this.handleReset}>
                                    Reset
                                </Button>
                                <Button type="submit">Submit</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

AddProject.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
const mapDispatchToProps = (dispatch) => {
    return {
        onAddProject: (project) => {
            dispatch(createProject(project));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
