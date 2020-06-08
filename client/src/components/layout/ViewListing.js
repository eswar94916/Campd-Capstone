// Listing.js

import React from 'react';
import {Card, Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import './Style.scss';
import { Link } from "react-router-dom";





export default ({ project: { name, owner, contactInfo,status, description, gitRepo, file, _id }, onDelete, onView }) => {

    const statusStyle = function(){
        if (status === 'Pending'){
            return "text-warning"
        } else if (status === 'Complete') {
            return "text-danger"
        } else if (status === 'Active'){
            return "text-success"
        }
    }

return (
    <div className="text-center">
        <h2 className="display-2 title-font">{ name }</h2>
        <h3>{ owner }</h3>
        <div >
            <p>{ description }</p>
        </div>
        <p>Status: <span className={statusStyle()}>{ status }</span></p>
        <p>
            <strong>Contact at: </strong>
            <a href={`mailto:${contactInfo}`} target="_blank">{contactInfo}</a>
        </p>

        {/** Show Github link if a github link is displayed */}
        {gitRepo !== "" &&
            <a href={gitRepo} target="_blank">
                <Button className="text-white githubIcon">
                    <FontAwesomeIcon icon={faGithub}/>
                    {' '} Github
                </Button>
            </a>
        }
        
        <Link onClick={() => onView("")} className="link" to="/projects">
            <Button variant='warning'> Return to Project List </Button> 
        </Link>

    </div>
  );
};
