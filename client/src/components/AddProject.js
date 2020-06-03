// AddProject.js

import React from 'react';
import './layout/Style.scss';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AddProject extends React.Component {
  state = {
      name: '',
      owner: (this.props.auth.user.name + " " + this.props.auth.user.lastname),
      ownerID: this.props.auth.user.id,
      status: '',
      description: '',
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
      ownerID: '',
      status: '',
      description: '',
      file: ''
    });
  };



  render() {
    const {user} = this.props.auth;
    return (
      <div>

        <h3>Add a project</h3>
      <form onSubmit={ this.handleSubmit }>


          <div className="form-group">
            <div className="col-7">
              <label>Project Name</label>
              <input type="name" className="form-control" placeholder="Enter project name" name="name" required={true} onChange={ this.handleInputChange } value={ this.state.name }/>
            </div>
          </div>

          <div className="form-group">
            <div className="col-7">
              <label>Owner Name (Auto-generated)</label>
              <input type="owner" className="form-control" placeholder="Add owner Name" name="ownerID" required={true} onChange={ this.handleInputChange }
            value={ (user.name + " " + user.lastname) }/>
            </div>
          </div>

          <div className="form-group">
            <div className="col-7">
              <label>Owner ID (Auto-generated)</label>
              <input type="ownerID" className="form-control" placeholder="Add owner ID" name="ownerID" required={true} defaultValue={ user.id }/>
            </div>
          </div>

          <div className="form-group">
            <div className="col-7">
              <label>Status</label>
              <select className="form-control" id="status" required={true} value={this.state.status} onChange={this.handleSelectChange} >
                <option value=""></option>
                <option value="Active">Active</option>
                <option value="Complete">Complete</option>
                <option value="Pending">Pending</option>
                </select>
            </div>
          </div>

          <div className="form-group">
            <div className="col-7">
              <label>Description</label>
              <textarea className="form-control" id="description" rows="3" name="description" required={true} onChange={ this.handleInputChange }
            value={ this.state.description }></textarea>
            </div>
          </div>

          <div className="form-group">
            <div className="col-7">
              <label>File Attachment</label>
              <input type="file" className="form-control-file" id="attachment" name="file" onChange={ this.handleInputChange }
            value={ this.state.file }/>
            </div>
          </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-warning" onClick={ this.handleReset }>
              Reset
            </button>
        </div>
      </form>
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
