import React, { Component } from "react";
import { Container } from 'react-bootstrap'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchProjects } from '../../actions/index';
import ProjectProfileList from './ProjectProfileListContainer';

/* This component is the landing page for when a user logs in.  It shows
 * a  welcome message and a list of all of the user's projects.
 */
class Profile extends Component {

  //fetch the user's projects
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
      <Container  className="mt-5">
        <div className="row">
          <div className="col s12 center-align">
            <div id = "profile-greeting">
              <h4>
                <b className = "ml-3">Hey there,</b> {user.name.split(" ")[0]}.
                <br /> <br />
              </h4>
            </div>
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  onMount: (searchName) => dispatch(searchProjects(searchName))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
