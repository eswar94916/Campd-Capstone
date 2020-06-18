// Listing.js

import React from 'react';
import {Card, Button} from 'react-bootstrap'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faGithub} from '@fortawesome/free-brands-svg-icons'
import './Style.scss';
import axios from 'axios'


import { Link } from "react-router-dom";

import TextTruncate from 'react-text-truncate';
import moment from "moment"

// const styles = {
//   borderBottom: '2px solid #eee',
//   background: '#fafafa',
//   margin: '.75rem auto',
//   padding: '.6rem 1rem',
//   maxWidth: '800px',
//   borderRadius: '7px'
// };


export default ({ project: { name, owner, contactInfo, status, description, gitRepo, tags, image, _id, date }, onDelete, onView }) => {

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

    const CardImage = (props) => {
        if(props.image){
            //  let image
            // axios.get(`image/${props.image}`)
            // .then(res => image = res)
            // .catch(
            //     error => console.log(error)
            // )

            return(
                <Card.Header>
                    <img src={`image/${props.image}`} />
                </Card.Header>
            )
        }
        return null
    }

    return (
        <Card className="mb-3 rounded" bg="light">
            <CardImage image={image} />
            <Card.Body>
                <p className="float-right">{dateParsed.format('MMMM D, YYYY')}</p>
                <Card.Title as="h2">{ name }</Card.Title>
                <Card.Subtitle as='h5' className="text-muted">{ owner }</Card.Subtitle>
                <Card.Text className='mt-3'>
                    <TextTruncate
                        text={description} 
                        line={3}
                    />
                </Card.Text>
                <p>Status: <span className={statusStyle()}>{ status }</span></p>
                
                <div className="tag-display">
                    <ul className='d-flex flex-wrap'>
                        {tags.map((tag) => {
                            return (
                                <li className='tag rounded-pill' key={tag}>{tag} </li>
                            )
                        })}
                    </ul>
                </div>
                
                <Link to={newTo} onClick={() => onView(_id)} className="link"> 
                    <Button className="text-white" type="button"> View </Button>
                </Link>

                {/** Show Github link if a github link is displayed */}
                {gitRepo !== "" &&
                    <a href={gitRepo} target="_blank">
                        <Button className="text-white githubIcon">
                            {/* <FontAwesomeIcon icon={faGithub}/> */}
                            {' '} Github
                        </Button>
                    </a>
                }
                
            </Card.Body>
        </Card>
    );
};
