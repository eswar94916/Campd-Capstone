import React, { Component } from "react";
import {Container} from 'react-bootstrap';

import { connect } from "react-redux";
import PropTypes from "prop-types";

import './Dashboard.scss';

class AdminDashboard extends Component {

    render(){
        return (
            <h1>Research Portal Administration</h1>
        );
    }
};

AdminDashboard.propTypes = {
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  const mapDispatchToProps = dispatch => {
  };
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminDashboard);
  