import React from 'react';
import { Button, DropdownButton, Dropdown, Card } from 'react-bootstrap';
import axios from 'axios';
import { withRouter, Link } from "react-router-dom";

class Home extends React.Component {
    constructor() {
        super();

        // define states
        this.state = {
            breeds: [],
            cats: [],
            selectorTitle: 'Select Breed',
            selectedCat: {},
            selectedBreedId: {},
            page: 1,
            limit: 10,
            isLoading: false,
            displayLoadMore: true
        };
    }

    componentDidMount() {
        let query = new URLSearchParams(this.props.location.search);
        let breed = query.get('breed');

        axios
            .get("https://api.thecatapi.com/v1/breeds",
            {headers: {'x-api-key': 'eb482756-0b2f-452d-a567-2975ee658c1c'}})
            .then(response => {
                this.setState({ breeds: response.data });

                if (breed !== null) {
                    this.handleBreedSelect(breed);
                }
            })
            .catch(error => console.log(error.response));
        
    }

    handleBreedSelect(e) {
        
        this.setState({ selectedBreedId: e }, () => {

            this.setState({ cats: [], page: 1 });
            this.searchByBreed();

        } );

    }

    searchByBreed() {
        // set loading to true
        this.setState({ isLoading: true, displayLoadMore: true });

        axios
            .get("https://api.thecatapi.com/v1/images/search",
            {
                headers: {'x-api-key': 'eb482756-0b2f-452d-a567-2975ee658c1c'},
                params: {
                    breed_id : this.state.selectedBreedId,
                    page : this.state.page,
                    limit : this.state.limit
                }
            })
            .then(response => {
                // add fetched to the cats array unique!
                this.setState({ 
                    cats: this.arrayUnique(this.state.cats, response.data),
                    isLoading: false
                });

                // remove load more if not more data to show
                if (response.data.length <=0) {
                    this.setState({ displayLoadMore: false });
                }
            })
            .catch(error => console.log(error.response));
        
    }

    arrayUnique(array1, array2) {

        if (array1.length <=0) {
            return array2;
        }

        let newArr = array1;
        let newCounter = 0;
        for(var i=0; i<array2.length; ++i) {
            
            let s = true;

            for(var j=0; j<array1.length; ++j) {                
                if (array2[i].id == array1[j].id) {
                    s = false;
                }
            }

            if (s) {
                newCounter++;
                newArr.push(array2[i])
            }
        }

        // if all cats are displayed hide Load More
        if (array1.length == newArr.length && newCounter <= 0) {
            this.setState({ displayLoadMore: false });
        }
    
        return newArr;
    }

    handleLoadMore() {

        this.setState({ page: (this.state.page + 1) }, () => {

            this.searchByBreed();
            
        });
        
    }

    render() {
        return (
            <div className="container">
                <h1>Cat Browser</h1>
                <DropdownButton title={this.state.selectorTitle}>
                    {this.state.breeds.map((e, key) => {
                        return <Dropdown.Item key={key} eventKey={e.id} 
                        active={e.id == this.state.selectedBreedId ? true : ''}
                        onSelect={this.handleBreedSelect.bind(this)}>{e.name}</Dropdown.Item>;
                    })}
                </DropdownButton>

                <div className="results mt-4">
                    <div className="row">
                        {Object.keys(this.state.cats).map(row => {
                            return (
                                <div className="col-md-3" key={this.state.cats[row].id}>
                                    <Card className="mb-2">
                                        <Card.Img variant="top" src={this.state.cats[row].url} />
                                        <Card.Body className="text-center">
                                            <Link to={'/' + this.state.cats[row].id}>
                                                <Button variant="primary">View Details</Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Button
                    onClick={this.handleLoadMore.bind(this)}
                    disabled={this.state.isLoading || this.state.cats.length <= 0}
                    className={this.state.displayLoadMore ? '' : 'd-none'}
                >
                    {this.state.isLoading ? "Loading..." : "Load More"}
                </Button>
            </div>
        );
    }
}
export default withRouter(Home);