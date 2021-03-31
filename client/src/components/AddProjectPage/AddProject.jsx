// AddProject.js

import React from "react";
import { Form, Button } from "react-bootstrap";
import "../Application.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions";
import InputTag from "./InputTag";
import axios from "axios";

class AddProject extends React.Component {
    state = {
        name: "",
        owner: this.props.auth.user.name + " " + this.props.auth.user.lastname,
        ownerID: this.props.auth.user.id,
        contactInfo: this.props.auth.user.email,
        status: "",
        activeStatus: "none",
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
                });
            })
            .catch((err) => console.log(err));
    };

    handleSelectChange = (e) => {
        const currentStatuses = this.state.statuses;
        for (const thisKey of Object.keys(this.state.statuses)) {
            if (e.target.value == thisKey) {
                currentStatuses[thisKey] = true;
            } else if (thisKey != "isProposal" && thisKey != "isRecruiting") {
                currentStatuses[thisKey] = false;
            }
        }
        this.setState({
            statuses: currentStatuses,
            activeStatus: e.target.value,
        });
    };

    handleProposal = (e) => {
        const currentStatuses = this.state.statuses;
        currentStatuses.isProposal = e.target.checked;
        if (e.target.checked) {
            currentStatuses.isActive = false;
            currentStatuses.isPaused = false;
            currentStatuses.isStopped = false;
            currentStatuses.isArchived = false;
        }
        this.setState({
            statuses: currentStatuses,
            activeStatus: "none",
        });
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
            description: "",
            gitRepo: "",
            tags: [],
            image: "",
        });
    };

    render() {
        const { user } = this.props.auth;
        return (
            <div className="form-div mx-auto col-md-7 mb-5">
                <Form onSubmit={this.handleSubmit} className="mt-4" encType="multipart/form-data">
                    <h3>Add a project</h3>
                    <hr />

                    <Form.Group className="form-group">
                        <div>
                            <label>Project Name*</label>
                            <input
                                type="name"
                                className="form-control"
                                placeholder="Enter project name"
                                name="name"
                                required={true}
                                onChange={this.handleInputChange}
                                value={this.state.name}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group>
                        <div>
                            <label>Owner Name*</label>
                            <input
                                type="owner"
                                className="form-control"
                                placeholder="Add owner Name"
                                name="owner"
                                required={true}
                                onChange={this.handleInputChange}
                                defaultValue={user.name + " " + user.lastname}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group>
                        <div>
                            <label>Contact Information*</label>
                            <input
                                type="contactInfo"
                                className="form-control"
                                placeholder="Add contact information"
                                name="contactInfo"
                                required={true}
                                onChange={this.handleInputChange}
                                value={this.state.contactInfo}
                            />
                        </div>
                    </Form.Group>

                    <Form.Check
                        className="mt-3"
                        onChange={this.handleProposal}
                        type="checkbox"
                        value={this.state.statuses.isProposal}
                        id="isProposal"
                        label="This is a proposal"
                    />

                    <Form.Check
                        className="mt-3"
                        onChange={this.handleRecruiting}
                        type="checkbox"
                        value={this.state.statuses.isRecruiting}
                        id="isRecruiting"
                        label="Currently recruiting new members"
                    />

                    <Form.Group className="mt-3">
                        <div>
                            <label>Status*</label>
                            <select
                                className="form-control"
                                id="status"
                                required={!this.state.statuses.isProposal}
                                disabled={this.state.statuses.isProposal}
                                value={this.state.activeStatus}
                                onChange={this.handleSelectChange}>
                                <option value="none"></option>
                                <option value="isActive">Active</option>
                                <option value="isPaused">Paused</option>
                                <option value="isStopped">Stopped</option>
                                <option value="isArchived">Archived</option>
                            </select>
                        </div>
                    </Form.Group>

                    <Form.Group>
                        <div>
                            <label>Description*</label>
                            <textarea
                                className="form-control"
                                id="description"
                                rows="3"
                                name="description"
                                required={true}
                                onChange={this.handleInputChange}
                                value={this.state.description}></textarea>
                        </div>
                    </Form.Group>

                    <Form.Group>
                        <div>
                            <label>Tags</label>
                            <InputTag
                                placeholder="Add Tags"
                                tags={this.state.tags}
                                addTag={this.handleTagsAdd}
                                removeTag={this.handleTagsRemove}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group>
                        <div>
                            <label>Github Link</label>
                            <input
                                type="gitRepo"
                                className="form-control"
                                placeholder="Add github link"
                                name="gitRepo"
                                required={false}
                                onChange={this.handleInputChange}
                                value={this.state.gitRepo}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group>
                        <div>
                            <label>Cover Image (.jpg or .png)</label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="cover-image"
                                name="cover-image"
                                accept=".png, .jpg"
                                onChange={this.handleImageUpdate}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="form-buttons">
                        <Button type="submit">Submit</Button>
                        <Button variant="danger" type="button" onClick={this.handleReset}>
                            Reset
                        </Button>
                    </Form.Group>
                </Form>
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
