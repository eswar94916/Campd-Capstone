import React, { Component } from "react";
import { Container } from 'react-bootstrap'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { searchProjects } from '../../actions/index';
import ProjectProfileList from '../../containers/ProjectProfileList';


class Profile extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    this.props.onMount(this.props.auth.user.id)
  }

render() {
    const { user } = this.props.auth;

    const styles = {
      borderBottom: '2px solid #eee',
      background: '#fafafa',
      margin: '15px',
      padding: '.6rem 1rem',
      maxWidth: 'auto',
      borderRadius: '7px',
    };

return (
      <Container>
        <div className="row">
          <div className="col s12 center-align">
            <h4 className="mt-3">
              <b>Hey there,</b> {user.name.split(" ")[0]}, you are logged in.
              <br /> <br />
              <button
                onClick={this.onLogoutClick}
                className="btn btn-primary mb-2"
              >
                Logout
              </button>
            </h4>

            <h3> Personal Information </h3>
            <div style={ styles }>
            <h4> Name: {user.name} {user.lastname} </h4>
            <h4> Email: {user.email} </h4>
            </div>

            <h3> Your Projects </h3>
            <div style={ styles }>
            <ProjectProfileList />
            </div>

          </div>
        </div>
      </Container>
    );
  }
}

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
  onMount: (searchName) => dispatch(searchProjects(searchName))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
