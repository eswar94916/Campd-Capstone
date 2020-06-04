// Listing.js

import React from 'react';
import {Card, Button} from 'react-bootstrap'
import './Style.scss';
import { Link } from "react-router-dom";

// const styles = {
//   borderBottom: '2px solid #eee',
//   background: '#fafafa',
//   margin: '.75rem auto',
//   padding: '.6rem 1rem',
//   maxWidth: '800px',
//   borderRadius: '7px'
// };


export default ({ project: { name, owner, status, description, file, _id }, onDelete, onView }) => {

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

    return (
        <Card className="mb-3 rounded" bg="light">
            <Card.Body>
                <Card.Title as="h2">{ name }</Card.Title>
                <Card.Subtitle as='h5' className="text-muted">{ owner }</Card.Subtitle>
                <Card.Text className='mt-3'>
                    <p>{ description }</p>
                </Card.Text>
                <p>Status: <span className={statusStyle()}>{ status }</span></p>


                <Button className="btn btn-primary text-white" type="button" >
                    <Link to={newTo} onClick={() => onView(_id)} className="link"> View </Link>
                </Button>
            </Card.Body>
        </Card>
    );
};
