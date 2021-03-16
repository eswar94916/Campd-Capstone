import React, { Component } from 'react';
import {Container} from 'react-bootstrap'

//test
import AddUser from '../auth/AddUser'

class Signup extends Component {
  render() {
    return (
    <Container className="mt-5">
        <div >
          <div >
            <AddUser />
          </div>
        </div>
      </Container>
    );
  }
}

export default Signup;
