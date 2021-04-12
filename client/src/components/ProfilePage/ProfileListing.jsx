// Listing.js

import React from 'react';
import {Card, Button} from 'react-bootstrap'
import '../Application.scss';
import { Link } from "react-router-dom";
import axios from 'axios'

/* This component is called in ProjectProfileListContainer and displays an individual projects information, with links
 * to view, edit, or delete projects.  TODO find out if Dr. Albert wants users to be able to click delete. TODO remove guides.
 */
const ProjectProfile = ({ project: { name, owner, status, description, image, userGuide, developerGuide, installationGuide, _id }, onDelete, onView }) => {



    const newTo ={
        pathname: "/viewprofileproject"
    }

    const editLink = {
        pathname: "/editprofileproject"
    }

    //TODO update statuses to conform to new status types
    const statusStyle = function(){
        if (status === 'Pending'){
            return "text-warning"
        } else if (status === 'Complete') {
            return "text-danger"
        } else if (status === 'Active'){
            return "text-success"
        }
    }

    //delete project if delete is selected
    const handleDelete = e => {
        axios.delete(`upload/${image}`)
        axios.delete(`upload/${userGuide}`)
        axios.delete(`upload/${developerGuide}`)
        axios.delete(`upload/${installationGuide}`)
        onDelete(_id)
    }



    return (
        <Card className="mb-3 rounded" bg="light">
            <Card.Body>
                <Card.Title as="h2">{ name }</Card.Title>
                <Card.Subtitle as='h5' className="text-muted">{ owner }</Card.Subtitle>
                <Card.Text className='mt-3'>
                    { description }
                </Card.Text>
                <p>Status: <span className={statusStyle()}>{ status }</span></p>


                <div className = "float-right">
                    <Link to={newTo} onClick={() => onView(_id)} className="link"> 
                        <Button className="btn btn-primary text-white" type="button" id = "view-button">View</Button> 
                    </Link>
                    <Link to={editLink} onClick= {() => onView(_id)} className = "link">
                        <Button className = "btn btn-warning" type = "button">Edit</Button>
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={handleDelete}>
                         Remove
                    </button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProjectProfile;