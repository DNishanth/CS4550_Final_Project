import React from "react";
import PrototypeService from "../services/PrototypeService";
import SearchTableComponent from "./SearchTableComponent";

export default class Prototype extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_query: "",
            movies: []
        };
    }

    findMovies = (query) => {
        PrototypeService.findMovies(query)
            .then(movies => {
                this.setState(
                    {
                        movies: movies
                    }
                )
                console.log(this.state.movies)}
            )
    }

    render() {
        return (
            <div>
                <input 
                    type="form-control"
                    placeholder="Search shows and movies"
                    value={this.state.search_query}
                    onChange={e => this.setState({search_query: e.target.value})}/>
                <button
                    onClick={() =>
                        this.findMovies(this.state.search_query)}>
                        <i className="fa fa-search"/>
                </button>
                <SearchTableComponent movies={this.state.movies}/>
            </div>
        )
    }
}