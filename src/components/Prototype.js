import React from "react";
import PrototypeService from "../services/PrototypeService";

export default class Prototype extends React.Component {
    state = {
        movies: []
    }

    findMovies = (query) => {
        PrototypeService.findMovies(query)
            .then(movies =>
                this.setState( {
                    movies: movies
                }))}

    render() {
        return (
            <div>
                <button onClick={() => this.findMovies('batman')}>Search Batman</button>
                {console.log(this.state.movies)}
            </div>
        )
    }
}