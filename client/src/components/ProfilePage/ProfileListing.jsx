// Listing.js

import React from 'react';
import {Card, Button} from 'react-bootstrap'
import '../Application.scss';
import { Link } from "react-router-dom";
import axios from 'axios'


const ProjectProfile = ({ project: { name, owner, status, description, image, userGuide, developerGuide, installationGuide, _id }, onDelete, onView }) => {



    const newTo ={
        pathname: "/viewprofileproject"
    }

    const editLink = {
        pathname: "/editprofileproject"
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
                        <Button className="btn btn-primary text-white" type="button" >View</Button> 
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