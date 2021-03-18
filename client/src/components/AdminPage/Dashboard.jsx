import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import './Dashboard.scss';

class AdminDashboard extends Component {

    render(){
        return (
          <div>
            <h1 id="AdminDashboard-h1">Portal Administration</h1>
            <div id="Dashboard-container">

            </div>
          </div>
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
  