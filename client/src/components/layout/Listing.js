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




  return (
    <Card className="mb-3" bg="light">
        <Card.Body>
            <Card.Title as="h2">{ name }</Card.Title>
            <Card.Subtitle as='h5'>{ owner }</Card.Subtitle>
            <Card.Text>
                <p>{ description }</p>
            </Card.Text>
            <p>Status: { status }</p>


            <Button className="btn btn-primary text-white" type="button" >
                <Link to={newTo} onClick={() => onView(_id)} className="link"> View </Link>
            </Button>
        </Card.Body>
    </Card>
  );
};
