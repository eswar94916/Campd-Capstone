// ProjectSearch.js
// This file is responsible for generating the search bar on the projects page
// it doesn't display any projects on it's own (ProjectList.js is responsible for that)
// instead it changes the state of the projects to display based on the search paramenters

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchProjects } from '../../actions/index';
import '../Application.scss';
import { Container } from 'react-bootstrap';

class SearchBar extends Component {
  state = {
    value: ""
  };

  handleSearchChange = e => {
    this.setState({
      value: e.target.value
    });
    this.handleSubmit(e);
  };

  handleSubmit = e => {
    e.preventDefault();
      this.props.onSearch(e.target.value.toLowerCase());
  };

  handleReset = (e) => {
    this.setState({
      value: ""
    });
  this.handleSearchChange(e);
  };

  render() {
      return(
     <Container className="search">
        <div className="list row">
            <div className="col-md-12">
                <div className="input-group mb-3">
                    <input
                        type="value"
                        className="form-control rounded-pill"
                        placeholder="Search for a project..."
                        name="value"
                        onChange={ this.handleSearchChange }
                        value={ this.state.value }
                    />
 
                </div>
            </div>
        </div>
    </Container>
    );
  };
}

function mapStateToProps({projects}) {
  return {value: projects.value};
}

function mapDispatchToProps(dispatch) {
  return {
    onSearch: value => {
      dispatch(searchProjects(value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
