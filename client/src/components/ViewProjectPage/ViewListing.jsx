//View Listing.js

import React from 'react';
import { Button } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import '../Application.scss';
import { Link } from "react-router-dom";

/* This Component is used in ViewAProjectContainer and shows an individual project's information.  TODO update this component to
 * use new statuses and project info.  The current view is ugly and needs to be updated
 */
const ViewListing = ({ project: { name, owner, contactInfo,status, description, gitRepo, tags, image, _id }, onDelete, onView }) => {

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
            <a href={`mailto:${contactInfo}`} target="_blank" rel="noopener noreferrer">{contactInfo}</a>
        </p>

        <div className="tag-display text-center">
            <ul className='d-flex flex-wrap justify-content-center'>
                {tags.map((tag, index) => {
                    return (
                        <li className='tag rounded-pill' key={index}>{tag} </li>
                    )
                })}
            </ul>
        </div>

        <Link onClick={() => onView("")} className="link" to="/projects">
            <Button variant='warning'> Return to Project List </Button> 
        </Link>

        {/** Show Github link if a github link is displayed */}
        {gitRepo !== "" &&
            <a href={gitRepo} target="_blank" rel="noopener noreferrer">
                <Button className="text-white githubIcon">
                    <FontAwesomeIcon icon={faGithub}/>
                    {' '} Github
                </Button>
            </a>
        }

    </div>
  );
};

export default ViewListing;