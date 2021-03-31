// EditProfileListing.jsx

import React from 'react';
import { Form, Button, FormText } from 'react-bootstrap'
import '../Application.scss';
import InputTag from "../AddProjectPage/InputTag"
import axios from 'axios';
import { connect } from "react-redux";
import {deleteProject, viewProjects} from "../../actions/index.js"
import {EDIT_PROJECT} from '../../actions/types.js'

class EditProfileListing extends React.Component {

  state = {
      name: this.props.project.name,
      owner: this.props.project.owner,
      ownerID: this.props.project.ownerID,
      contactInfo: this.props.project.contactInfo,
      status: this.props.project.status,
      description: this.props.project.description,
      gitRepo: this.props.project.gitRepo,
      tags: this.props.project.tags,
      image: this.props.project.image,
      projectID: this.props.project._id
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
    if (this.state.name.trim() && this.state.description.trim()) {
      this.props.onEditProject(this.state);
      this.handleReset();
    }
  };

  handleReset = () => {
    this.setState({
      name: this.state.name,
      owner: '',
      ownerID: '',
      contactInfo: '',
      status: '',
      description: '',
      gitRepo: '',
      tags: [],
      image: '',
    });
  };


    render() {
        return (
        <div className="form-div mx-auto col-md-7 mb-5">
            <Form>
                <h3 className = "mt-4 mb-4">Edit Project</h3>
                          {console.log(this.state)}
                <Form.Group className="form-group">
                    <div>
                    <label>Project Name*</label>
                    <input type="name" className="form-control" placeholder="Enter project name" name="name" onChange={ this.handleInputChange } required={true}
                    defaultValue = {this.state.name}/>
                    </div>
                </Form.Group>

                <Form.Group>
                    <div>
                    <label>Owner Name*</label>
                    <input type="owner" className="form-control" placeholder="Enter owner name" name="owner" required={true} onChange={ this.handleInputChange }
                    defaultValue = {this.state.owner}/>
                    </div>
                </Form.Group>

                 <Form.Group>
                    <div>
                    <label>Contact Information*</label>
                    <input type="contactInfo" className="form-control" placeholder="Enter contact information" name="contactInfo" required={true} onChange={ this.handleInputChange }
                    defaultValue = {this.state.contactInfo}/>
                    </div>
                </Form.Group>

                <Form.Group className="mt-3">
                    <div>
                    <label>Status*</label>
                    <select className="form-control" id="status" required={true} onChange = {this.handleSelectChange}
                    defaultValue = {this.state.status}>
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
                    defaultValue = {this.state.description}></textarea>
                    </div>
                </Form.Group>

                <Form.Group>
                    <div>
                    <label>Tags</label>
                    <FormText color = "muted">Press the "Enter" key to add a tag to your project.</FormText>
                    <InputTag placeholder="Add Tags" tags={this.state.tags} addTag={this.handleTagsAdd} removeTag={this.handleTagsRemove}/>
                    </div>
                </Form.Group>

                <Form.Group>
                    <div>
                    <label>Github Link</label>
                    <input type="gitRepo" className="form-control" placeholder="Add github link" name="gitRepo" required={false} onChange={ this.handleInputChange }
                    defaultValue = {this.state.gitRepo}/>
                    </div>
                </Form.Group>

                <Form.Group>
                    <div>
                    <label>Cover Image (.jpg or .png)</label>
                    <input type="file" className="form-control-file" id="cover-image" name="cover-image" accept=".png, .jpg" onChange={ this.handleImageUpdate }/>
                    </div>
                </Form.Group>
                
                <Form.Group className = "form-buttons">
                    <Button type="submit" onClick = {this.handleSubmit}>Submit</Button>
                    {/*<Button variant="danger" type="button" onClick={ this.handleReset }>Reset</Button>*/}
                </Form.Group>
            </Form>
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
    onEditProject: id => {
      dispatch(editProject(id));
    },
    onDelete: id => {
      dispatch(deleteProject(id));
    },
    onView: id => {
      dispatch(viewProjects(id))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileListing);

//EditingProject
export const editProject = ({ projectID, name, owner, ownerID, contactInfo, status, description, gitRepo, tags, image, date }) => {

  return (dispatch) => {
    return axios.post(`projects/edit`, {
      projectID: projectID,
      changes: {
        name: name,
        owner: owner,
        ownerID: ownerID,
        contactInfo: contactInfo,
        status: status,
        description: description,
        gitRepo: gitRepo,
        tags: tags,
        image: image,
        date: date
      }
    })
      .then(response => {
        console.log(projectID);
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const editProjectSuccess =  (project) => {
  return {
    projectID: project._id,
    changes: {
      name: project.name,
      owner: project.owner,
      ownerID: project.ownerID,
      contactInfo: project.contactInfo,
      status: project.status,
      description: project.description,
      gitRepo: project.gitRepo,
      tags: project.tags,
      image: project.image,
      userGuide: project.userGuide, 
      developerGuide: project.developerGuide, 
      installationGuide: project.installationGuide,
      date: project.date
    }
  }
};
