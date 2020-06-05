// Listing.js

import React from 'react';
import './Style.scss';
import { Link } from "react-router-dom";




export default ({ project: { name, owner, status, description, file, _id }, onDelete, onView }) => {

  return (
    <div >
      <h2>{ name }</h2>
      <h5>{ owner }</h5>
      <div >
      <p>{ description }</p>
      </div>
      <p>Status: { status }</p>


      
      <Link onClick={() => onView("")} className="link" to="/projects">
        <button className="btn btn-primary mb-2"> Return to Project List </button> 
      </Link>

    </div>
  );
};
