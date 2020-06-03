import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import './../layout/Style.scss';
//import axios from 'axios';
//import UserList from '../../containers/UserList'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from "../../actions/authActions";




class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      lastname: '',
      email: '',
      password: '',
      password2: '',
      errors: {}

    };
  }



UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

handleInputChange = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
};

handleSubmit = e => {
  e.preventDefault();
  if (this.state.name.trim() && this.state.password.trim()) {
    this.state.password2.trim()
    //this.props.onAddUser(this.state);
    const newUser = {
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
    this.handleReset();
  }
};

handleReset = () => {
  this.setState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    password2: ''
  });
};



render() {
  const { errors } = this.state

  const errorStyle = {
    color: 'red'
  }


return (
  <form noValidate onSubmit={ this.handleSubmit } >
      <h3>Sign up</h3>

      <div className="form-group">
        <div className="col-7">
          <label>First name</label>
          <input type="text" className="form-control" placeholder="First name" name="name" onChange={ this.handleInputChange } value={ this.state.name } error={errors.name}/>
          <span style={errorStyle}>{errors.name}</span>
        </div>
      </div>

      <div className="form-group">
        <div className="col-7">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" name="lastname" onChange={ this.handleInputChange } value={ this.state.lastname } error={errors.lastname}/>
          <span style={errorStyle}>{errors.lastname}</span>
        </div>
      </div>

      <div className="form-group">
        <div className="col-7">
          <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={ this.handleInputChange } value={ this.state.email } error={errors.email} />
          <span style={errorStyle}>{errors.email}</span>
        </div>
      </div>

      <div className="form-group">
        <div className="col-7">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={ this.handleInputChange } value={ this.state.password } error={errors.password}  />
          <span style={errorStyle}>{errors.password}</span>
        </div>
      </div>

      <div className="form-group">
        <div className="col-7">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Re-Enter password" name="password2" onChange={ this.handleInputChange } value={ this.state.password2 } error={errors.password2}/>
          <span style={errorStyle}>{errors.password2}</span>
        </div>
      </div>

      <div className="form-group">
      <button type="submit" className="btn btn-primary mb-2">Sign Up</button>
      </div>
      <p className="forgot-password text-left">
          Already registered? <a href="/login">Sign in</a>
      </p>




  </form>



    );
  }
}


AddUser.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(AddUser));
