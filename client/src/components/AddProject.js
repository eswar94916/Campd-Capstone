// AddProject.js

import React from 'react';
import {Form,Button} from 'react-bootstrap'
import './layout/Style.scss';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Link} from "react-router-dom"

class AddProject extends React.Component {
  state = {
      name: '',
      owner: (this.props.auth.user.name + " " + this.props.auth.user.lastname),
      ownerID: this.props.auth.user.id,
      contactInfo: this.props.auth.user.email,
      status: '',
      description: '',
      gitRepo: '',
      file: ''
  };


  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSelectChange = e => {
    this.setState({
      status: e.target.value
    });
  };


  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state)
    if (this.state.name.trim() && this.state.description.trim()) {
      this.props.onAddProject(this.state);
      this.handleReset();
    }
  };

  handleReset = () => {
    this.setState({
      name: '',
      owner: '',
      ownerID: this.props.auth.user.id,
      contactInfo: '',
      status: '',
      description: '',
      gitRepo: '',
      file: ''
    });
  };



  render() {
    const {user} = this.props.auth;
    return (
        <div>
            <h3>Add a project</h3>
            <Form onSubmit={ this.handleSubmit } className="mt-4">


                <Form.Group className="form-group">
                    <div className="col-7">
                    <label>Project Name*</label>
                    <input type="name" className="form-control" placeholder="Enter project name" name="name" required={true} onChange={ this.handleInputChange } value={ this.state.name }/>
                    </div>
                </Form.Group>

                <Form.Group>
                    <div className="col-7">
                    <label>Owner Name*</label>
                    <input type="owner" className="form-control" placeholder="Add owner Name" name="owner" required={true} onChange={ this.handleInputChange }
                    defaultValue={ (user.name + " " + user.lastname) }/>
                    </div>
                </Form.Group>

                {/* <Form.Group>
                    <div className="col-7">
                    <label>Owner ID (Auto-generated)</label>
                    <input type="ownerID" className="form-control" placeholder="Add owner ID" name="ownerID" required={true} defaultValue={ user.id }/>
                    </div>
                </Form.Group> */}

                <Form.Group>
                    <div className="col-7">
                    <label>Contact Information*</label>
                    <input type="contactInfo" className="form-control" placeholder="Add contact information" name="contactInfo" required={true} onChange={ this.handleInputChange } value={ this.state.contactInfo }/>
                    </div>
                </Form.Group>

                <Form.Group className="mt-3">
                    <div className="col-7">
                    <label>Status</label>
                    <select className="form-control" id="status" required={true} value={this.state.status} onChange={this.handleSelectChange} >
                        <option value=""></option>
                        <option value="Active">Active</option>
                        <option value="Complete">Complete</option>
                        <option value="Pending">Pending</option>
                        </select>
                    </div>
                </Form.Group>

                <Form.Group>
                    <div className="col-7">
                    <label>Description</label>
                    <textarea className="form-control" id="description" rows="3" name="description" required={true} onChange={ this.handleInputChange }
                    value={ this.state.description }></textarea>
                    </div>
                </Form.Group>

                <Form.Group>
                    <div className="col-7">
                    <label>Git Repository (GitHub, BitBucket, etc.)</label>
                    <input type="gitRepo" className="form-control" placeholder="Add git repository link" name="gitRepo" required={false} onChange={ this.handleInputChange } value={ this.state.gitRepo }/>
                    </div>
                </Form.Group>

                <Form.Group>
                    <div className="col-7">
                    <label>File Attachment</label>
                    <input type="file" className="form-control-file" id="attachment" name="file" onChange={ this.handleInputChange }
                    value={ this.state.file }/>
                    </div>
                </Form.Group>
                <Form.Group>
                    <Button type="submit">Submit</Button>
                    <Button variant="warning" type="button" onClick={ this.handleReset }>Reset</Button>
                </Form.Group>
            </Form>
        </div>
    );
  }
}

AddProject.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(AddProject);
