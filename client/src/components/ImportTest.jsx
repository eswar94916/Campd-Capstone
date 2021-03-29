import React from 'react';
import { Button } from 'react-bootstrap';
import axios from "axios";

export default class ImportTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
    }

    onFileChange = event => {
    
        this.setState({ file: event.target.files[0] });
      
    };

    handleSubmit = () => {
        // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    
      // Details of the uploaded file
      console.log(this.state.selectedFile);
    
      // Request made to the backend api
      // Send formData object
      axios.post("importroutes/uploadfile", formData);
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.onFileChange}/>
                <Button onClick={this.handleSubmit}>Submit</Button>
            </div>
        )
    }
}