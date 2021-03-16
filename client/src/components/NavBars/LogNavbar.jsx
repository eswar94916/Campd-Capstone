import React, { Component } from "react";
import { Container,Row,Col, Navbar } from 'react-bootstrap'

import { Link } from "react-router-dom";
import './Navbar.scss';

class LogNavbar extends Component {
  constructor(props) {
        super(props);
        this.state = {
            activeClasses: [],
            indexval: 0,
            log: localStorage.getItem("jwtToken")
        };
        this.addActiveClass = this.addActiveClass.bind(this);
    }

    addActiveClass(index) {
      let activeClasses = []


        switch(index) {
          case 0:
            activeClasses = [true, false, false, false]
            break;
          case 1:
            activeClasses = [false, true, false, false]
            break;
          case 2:
            activeClasses = [false, false, true, false]
            break;
          case 3:
            activeClasses = [false, false, false, true]
            break;
          default:
            activeClasses = [true, false, false, false]
            break;
          }
          this.setState({activeClasses, index});
        }

  render() {
    const activeClasses = this.state.activeClasses.slice();
    return (
    <Container fluid className="topnav">
        <div className="banner">
            <a href="/"><img className="unt-banner img-fluid" alt={ 'University of North Texas logo' } src={ window.location.origin + "/unt-banner.svg" }/></a>
        </div>
        <Row className="header">
            <Col className="title-text">
                <span className="text-white">University of North Texas</span>
                <h3 className="title">Research and Project Portal</h3>
            </Col>
        </Row>
        <Row>
            <Col>
                <Navbar>
                    <Link to="/" className={activeClasses[0]? "active" : "inactive"} onClick={() => this.addActiveClass(0)} >Home</Link>
                    <Link to="/addproject" className={activeClasses[1]? "active" : "inactive"} onClick={() => this.addActiveClass(1)} > Add project</Link>
                    <Link to="/projects" className={activeClasses[2]? "active" : "inactive"} onClick={() => this.addActiveClass(2)} >Projects</Link>
                    <Link to="/profile" className={activeClasses[3]? "active" : "inactive"} onClick={() => this.addActiveClass(3)} >Profile</Link>
                </Navbar>
            </Col>
        </Row>
    </Container>
    );
  }
}
export default LogNavbar;
