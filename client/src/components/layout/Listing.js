// Listing.js

import React from 'react';
import {Card, Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import './Style.scss';


import { Link } from "react-router-dom";

import moment from "moment"

// const styles = {
//   borderBottom: '2px solid #eee',
//   background: '#fafafa',
//   margin: '.75rem auto',
//   padding: '.6rem 1rem',
//   maxWidth: '800px',
//   borderRadius: '7px'
// };


export default ({ project: { name, owner, contactInfo, status, description, gitRepo, file, _id, date }, onDelete, onView }) => {

    const newTo ={
        pathname: "/viewproject"
    }

    const statusStyle = function(){
        if (status === 'Pending'){
            return "text-warning"
        } else if (status === 'Complete') {
            return "text-danger"
        } else if (status === 'Active'){
            return "text-success"
        }
    }

    const dateParsed = moment(date)

    return (
        <Card className="mb-3 rounded" bg="light">
            <Card.Body>
                <p className="float-right">{dateParsed.format('MMMM D, YYYY')}</p>
                <Card.Title as="h2">{ name }</Card.Title>
                <Card.Subtitle as='h5' className="text-muted">{ owner }</Card.Subtitle>
                <Card.Text className='mt-3'>
                <p> { description } </p>
                </Card.Text>
                <p>Status: <span className={statusStyle()}>{ status }</span></p>

                
                <Link to={newTo} onClick={() => onView(_id)} className="link"> 
                    <Button className="text-white" type="button"> View </Button>
                </Link>

                {/** Show Github link if a github link is displayed */}
                {gitRepo !== "" &&
                    <a href={gitRepo} target="_blank">
                        <Button className="text-white githubIcon">
                            <FontAwesomeIcon icon={faGithub}/>
                            {' '} Github
                        </Button>
                    </a>
                }
                
            </Card.Body>
        </Card>
    );
};
