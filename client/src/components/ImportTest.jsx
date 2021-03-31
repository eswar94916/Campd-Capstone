import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export default class ImportTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
    }

    onFileChange = (event) => {
        this.setState({ file: event.target.files[0] });
    };

    handleSubmit = () => {
        console.log(this.state);
        let formData = new FormData();
        formData.append("csvFile", this.state.file);
        axios.post("/import/", formData, {
            headers: {
                "Content-type": "multipart/form-data",
            },
        });
    };

    render() {
        return (
            <div>
                <input type="file" onChange={this.onFileChange} />
                <Button onClick={this.handleSubmit}>Submit</Button>
            </div>
        );
    }
}
