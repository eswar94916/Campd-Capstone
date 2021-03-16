// Listing.js

import React from 'react';
import {Card, Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import './Listing.scss';


import { Link } from "react-router-dom";

import TextTruncate from 'react-text-truncate';
import moment from "moment"


const Project = ({ project: { name, owner, contactInfo, status, description, gitRepo, tags, image, userGuide, developerGuide, installationGuide, _id, date }, onDelete, onView, index}) => {

    const newTo ={
        pathname: "/viewproject"
    }

    const statusStyle = function(){
        if (status === 'Pending'){
            return "bg-warning"
        } else if (status === 'Complete') {
            return "bg-danger"
        } else if (status === 'Active'){
            return "bg-success"
        }
    }

    const dateParsed = moment(date)

    const CardImage = (props) => {
        if(props.image){
            return(
                <img alt="Project" src={`image/${props.image}`} className="img-fluid img-thumbnail" />
            )
        }
        return null
    }

    return (
        <div className={`project-card mb-5 border bg-${index%2}`}>
            <div className={`project-card-image bg-${index%2}`}>
                <CardImage image={image} />
            </div>
            <div className='project-card-body'>
                <p className="float-right">{dateParsed.format('MMMM D, YYYY')}</p>
                <Card.Title as="h2">{ name }</Card.Title>
                <Card.Subtitle as='h5' className="text-muted">{ owner }</Card.Subtitle>
                <div className="mt-3 mb-3">
                    <TextTruncate text={description} line={3}/>
                </div>
                
                <div className="tag-display">
                    <ul className='d-flex flex-wrap'>
                        <li className={'tag text-white ' + statusStyle()}>{status}</li>
                        {tags.map((tag) => {
                            return (
                                <li className='tag bg-light' key={tag}>{tag} </li>
                            )
                        })}
                    </ul>
                </div>
                
                <Link to={newTo} onClick={() => onView(_id)} className="link"> 
                    <Button className="text-white view-button" type="button"> View Project </Button>
                </Link>

                {/** Show Github link if a github link is available */}
                {gitRepo !== "" &&
                    <a href={gitRepo} target="_blank" rel="noopener noreferrer">
                        <Button variant="dark" className="githubIcon">
                            <FontAwesomeIcon icon={faGithub} size="lg"/>
                        </Button>
                    </a>
                }
                
            </div>
        </div>
    );
};

export default Project;