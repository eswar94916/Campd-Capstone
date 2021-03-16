// AddProject.js

import React from 'react';
import {Form,Button} from 'react-bootstrap'
import './layout/Style.scss';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InputTag from './layout/InputTag'
import axios from 'axios'

class AddProject extends React.Component {


  state = {
      name: '',
      owner: (this.props.auth.user.name + " " + this.props.auth.user.lastname),
      ownerID: this.props.auth.user.id,
      contactInfo: this.props.auth.user.email,
      status: '',
      description: '',
      gitRepo: '',
      tags: [],
      image: '',
      userGuide: '',
      developerGuide: '',
      installationGuide: ''
  };


  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleImageUpdate = e => {
    //   console.log(e.target.files[0]
    if(this.state.image !== ""){
        axios.delete(`upload/${this.state.image}`)
        return null
    }
    var formData = new FormData();
    formData.append('cover-image', e.target.files[0])
      axios.post('upload/cover-image', formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => {
          console.log(res)
          this.setState({
              image: res.data.filename
          })
      })
      .catch(
      err => console.log(err)
    )
  }

  handleUserGuideUpdate = e => {
    if(this.state.userGuide !== ""){
        axios.delete(`upload/${this.state.userGuide}`)
        return null
    }
    var formData = new FormData();
    formData.append('user-guide', e.target.files[0])
      axios.post('upload/user-guide', formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => {
          console.log(res)
          this.setState({
              userGuide: res.data.filename
          })
      })
      .catch(
      err => console.log(err)
    )
  }

  handleDeveloperGuideUpdate = e => {
    if(this.state.developerGuide !== ""){
        axios.delete(`upload/${this.state.developerGuide}`)
        return null
    }
    var formData = new FormData();
    formData.append('developer-guide', e.target.files[0])
      axios.post('upload/developer-guide', formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => {
          console.log(res)
          this.setState({
              userGuide: res.data.filename
          })
      })
      .catch(
      err => console.log(err)
    )
  }

  handleInstallationGuideUpdate = e => {
    if(this.state.developerGuide !== ""){
        axios.delete(`upload/${this.state.developerGuide}`)
        return null
    }
    var formData = new FormData();
    formData.append('installation-guide', e.target.files[0])
      axios.post('upload/installation-guide', formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => {
          console.log(res)
          this.setState({
              userGuide: res.data.filename
          })
      })
      .catch(
      err => console.log(err)
    )
  }

  handleSelectChange = e => {
    this.setState({
      status: e.target.value
    });
  };

  handleTagsAdd = newTag => {
      this.setState(
      { tags: [...this.state.tags, newTag] }
    )
  }
  handleTagsRemove = index => {
    const newTags = [...this.state.tags]
    newTags.splice(index, 1)
    this.setState({tags: newTags})
  }


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
      tags: [],
      image: '',
      userGuide: '',
      developerGuide: '',
      installationGuide: ''
    });
  };



  render() {
    const {user} = this.props.auth;
    return (
        <div className="form-div mx-auto col-md-7 mb-5">
            <Form onSubmit={ this.handleSubmit } className="mt-4" encType="multipart/form-data">
                <h3>Add a project</h3>
                <hr />

                <Form.Group className="form-group">
                    <div>
                    <label>Project Name*</label>
                    <input type="name" className="form-control" placeholder="Enter project name" name="name" required={true} onChange={ this.handleInputChange } value={ this.state.name }/>
                    </div>
                </Form.Group>

                <Form.Group>
                    <div>
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
                    <div>
                    <label>Contact Information*</label>
                    <input type="contactInfo" className="form-control" placeholder="Add contact information" name="contactInfo" required={true} onChange={ this.handleInputChange } value={ this.state.contactInfo }/>
                    </div>
                </Form.Group>

                <Form.Group className="mt-3">
                    <div>
                    <label>Status*</label>
                    <select className="form-control" id="status" required={true} value={this.state.status} onChange={this.handleSelectChange} >
                        <option value=""></option>
                        <option value="Active">Active</option>
                        <option value="Complete">Complete</option>
                        <option value="Pending">Pending</option>
                        </select>
                    </div>
                </Form.Group>

                <Form.Group>
                    <div>
                    <label>Description*</label>
                    <textarea className="form-control" id="description" rows="3" name="description" required={true} onChange={ this.handleInputChange }
                    value={ this.state.description }></textarea>
                    </div>
                </Form.Group>

                <Form.Group>
                    <div>
                    <label>Tags</label>
                    <InputTag placeholder="Add Tags" tags={this.state.tags} addTag={this.handleTagsAdd} removeTag={this.handleTagsRemove} />
                    </div>
                </Form.Group>

                <Form.Group>
                    <div>
                    <label>Github Link</label>
                    <input type="gitRepo" className="form-control" placeholder="Add github link" name="gitRepo" required={false} onChange={ this.handleInputChange } value={ this.state.gitRepo }/>
                    </div>
                </Form.Group>

                <Form.Group>
                    <div>
                    <label>Cover Image (.jpg or .png)</label>
                    <input type="file" className="form-control-file" id="cover-image" name="cover-image" accept=".png, .jpg" onChange={ this.handleImageUpdate }/>
                    </div>
                </Form.Group>

                <Form.Group>
                    <div>
                    <label>User Guide (PDF or MS doc)</label>
                    <input type="file" className="form-control-file" id="user-guide" name="user-guide" accept=".pdf, .doc, .docx, application/msword" onChange={ this.handleUserGuideUpdate }/>
                    </div>
                </Form.Group>

                <Form.Group>
                    <div>
                    <label>Developer Guide (PDF or MS doc)</label>
                    <input type="file" className="form-control-file" id="developer-guide" accept=".pdf, .doc, .docx, application/msword" name="developer-guide" />
                    </div>
                </Form.Group>

                <Form.Group>
                    <div>
                    <label>Installation Guide (PDF or MS doc)</label>
                    <input type="file" className="form-control-file" id="installation-guide" accept=".pdf, .doc, .docx, application/msword" name="installation-guide" />
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
