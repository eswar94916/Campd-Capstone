import React, { Component } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap"
import "./AllUsers.scss";

/* This component allows an admin to promote/demote other users to/from admin */
class AllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userArray: []
        }
    }

    componentDidMount() {
        //load users from db on component load
        this.getUsers();
    }

    //get the users from the DB
    getUsers = () => {
        axios.get("users").then((res) => {
            //only select users that have euid
            let users = res.data.filter((user) => user.euid);
            this.setState({userArray: users});
        }).catch((err) => {
            console.log(err);
        });
    }

    // toggle a user's admin status
    // TODO a user should not be able to demote themselves, otherwise all admin users might accidentally be removed
    toggleAdmin = (euid, admin) => {
        let action = admin ? "promote" : "demote";

        const postData = {
            "userEUID": euid,
            "action": action
        }

        axios.post("users/changeadmin", postData).then((res) => {
            if(res.status === 200) {
                this.getUsers();
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    render(){
        return (
            <div id="Dashboard-Content">
                <h1 id="Content-Title">All Users</h1>
                <div className="user-container">
                    <Container>
                        {this.state.userArray.map((user, index) => {
                            return (
                                <Row className="user-row" key={index}>
                                    <Col md={3}>
                                        {user.name + " " + user.lastname}
                                    </Col>
                                    <Col md={2}>
                                        {user.euid}
                                    </Col>
                                    <Col md={4}>
                                        {user.email}
                                    </Col>
                                    <Col md={3}>
                                        {user.isAdmin ? 
                                        <Button className="make-admin-button" variant="danger" onClick={() => {this.toggleAdmin(user.euid, false)}}>Remove Admin</Button> : 
                                        <Button className="make-admin-button" variant="success" onClick={() => {this.toggleAdmin(user.euid, true)}}>Make Admin</Button>}
                                    </Col>
                                </Row>
                            )
                        })}
                    </Container>
                </div>
            </div>
        )
    }
}

export default (AllUsers);