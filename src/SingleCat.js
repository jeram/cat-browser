import React from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { withRouter, Link } from "react-router-dom";

class SingleCat extends React.Component {
    constructor() {
        super();

        // define states
        this.state = {
            selectedCat: {
                breeds: [{
                        name: '',
                        origin: '',
                        temperament: '',
                        description: '',
                        id: ''
                    }]
            },
        };
    }

    componentDidMount() {
        let catId  = this.props.match.params.catId;

        axios
            .get("https://api.thecatapi.com/v1/images/" + catId,
            {headers: {'x-api-key': 'eb482756-0b2f-452d-a567-2975ee658c1c'}})
            .then(response => {
                this.setState({ selectedCat: response.data });
            })
            .catch(error => console.log(error.response));
    }

    render() {
        return (
            <div className="container">
                <Link to={'/?breed=' + this.state.selectedCat.breeds[0].id}>
                    <Button variant="primary">Back</Button>
                </Link>

                <Card>
                    <Card.Img variant="top" src={this.state.selectedCat.url} />
                    <Card.Body>
                        <h4>{this.state.selectedCat.breeds[0].name}</h4>
                        <h5>Origin: {this.state.selectedCat.breeds[0].origin}</h5>
                        <h6>{this.state.selectedCat.breeds[0].temperament}</h6>
                        <p>{this.state.selectedCat.breeds[0].description}</p>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
export default withRouter(SingleCat);