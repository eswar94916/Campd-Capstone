import React, { Component } from "react";
import {Container} from 'react-bootstrap'
import './Login.scss';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from "../../actions/authActions";
import { Redirect } from "react-router";



//import { Link } from "react-router-dom";
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      euid: "",
      password: "",
      validEUID: true,
      hasEUID: true,
      hasPassword: true,
      successful: true,
      isValidating: false
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    if(props.auth.isAuthenticated) {
      window.location.reload();
    } else {
      this.setState({isValidating: false, successful: false});
    }
  }


  handleEuidChange = e => {
      this.setState({ euid: e.target.value });
    };

  handlePasswordChange = e => {
      this.setState({ password: e.target.value });
    };

  handleSubmit = e => {
      e.preventDefault();

      //don't continue if euid is empty
      if(this.state.euid === "") {
        this.setState({hasEUID: false, validEUID: true});
        return;
      } else {
        this.setState({hasEUID: true});
      }
      
      //don't continue if euid is invalid format
      if(!(this.state.euid.match(/[a-z][a-z][a-z][0-9][0-9][0-9][0-9]/) || this.state.euid.match(/[a-z][a-z][0-9][0-9][0-9][0-9]/))) {
          this.setState({validEUID: false});
          return;
      } else {
        this.setState({validEUID: true});
      }

      //don't continue if password is empty
      if(this.state.password === "") {
          this.setState({hasPassword: false});
          return;
      } else {
        this.setState({hasPassword: true});
      }

      //if everything passed validation, set flags to true
      this.setState({validEUID: true, hasEUID: true, hasPassword: true, successful: true, isValidating: true})

      const userData = {
        euid: this.state.euid,
        password: this.state.password
      };
      this.props.loginUser(userData);
    };

  render() {

    const errorStyle = {
      color: 'red'
    }

    return this.props.auth.isAuthenticated ? (<Redirect to="/Profile" />) : 
    (
      <Container className="mt-5">
          <form noValidate onSubmit={ this.handleSubmit } className="form-div col-md-7 mx-auto">
              <h3 className="text-center">Login</h3>
              <hr />

              <div className="form-group mt-3">
                  <div className="">
                    <label>UNT EUID</label>
                    <input type="text" className="form-control" placeholder="Enter EUID" onChange={ this.handleEuidChange } value={ this.state.euid }/>
                    <span style={errorStyle}>
                      {this.state.hasEUID ? "" : "Must enter a valid ID"}
                      {this.state.validEUID ? "" : "EUID must be format abc1234 or ab1234"}
                    </span>
                  </div>
              </div>

              <div className="form-group">
                  <div className="">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={ this.handlePasswordChange } value={ this.state.password } />
                    <span style={errorStyle}>
                      {this.state.hasPassword ? "" : "Must enter a valid password"}
                      {this.state.successful ? "" : "Invalid Credentials"}
                    </span>
                  </div>
              </div>
              
              <button disabled={this.state.isValidating} type="submit" className="btn btn-primary mb-2">{this.state.isValidating ? "Logging in..." : "Submit"}</button>
          </form>
      </Container>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
