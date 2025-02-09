import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/* This is a functional component that serves to protect routes that only
 * an admin should be able to access.
 */
const PrivateAdminRoute = ({ component: Component, auth, ...rest }) => (

  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
          auth.user.isAdmin === true ? (
            <Component {...props} />
          ) : (
             <Redirect to="/" />
          )
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
PrivateAdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateAdminRoute);
