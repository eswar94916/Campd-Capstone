import React, { Component } from "react";
import './Landing.scss'

import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (

      <div className="landing-page">
        <img className="center" id="landingImg" alt={ 'University of North Texas logo' } src={ window.location.origin + "/unt-logo.jpeg"}/>
        <h1>The University of North Texas Research and Project Portal</h1>
        <br/>
        <h5 className="text-center">The Research and Project Portal is a centralized database of all projects and research ideas by UNT students and faculty. <br/> You can search for specific projects, topics, projects held by specific professors or maintained by specific students.
        </h5>
        <div className="text-center mt-5 mb-5">
            <Link to="/projects">
                <button className='btn btn-primary btn-lg' type="button">Check Out Projects!</button>
            </Link>
        </div>
      </div>



    );
  }
}
export default Landing;
