import React, { Component } from 'react';
import CreateProject from '../../containers/CreateProject';

import './Style.scss';

class AddProject extends Component {
  render() {
    return (
      <div >
        <div >
          <div >
            <CreateProject />
          </div>
        </div>
      </div>
    );
  }
}

export default AddProject;
