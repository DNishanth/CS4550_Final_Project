import React from "react";
import PrototypeService from "../services/PrototypeService";
import SearchTableComponent from "./SearchTableComponent";

export default class PrototypeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_query: "",
            movies: [],
            series: [],
            shows: []
        };
    }

    findMovies = (query) => {
        PrototypeService.findMovies(query)
            .then(movies => {
                this.setState({
                    movies: movies
                })
                this.findSeries(query)
                /*console.log(this.state.movies)*/}
            )
    }

    findSeries = (query) => {
        PrototypeService.findSeries(query).then(series => {
            this.setState(
                {
                    series: series
                })
                this.getShows()
                /*console.log(this.state.movies)*/}
            )
    }

    getShows = () => {
        let trimmedMovieJSON = this.state.movies.map(movie => movie.movie)
        let trimmedSeriesJSON = this.state.series.map(series => series.show)

        this.setState({
            shows: trimmedMovieJSON.concat(trimmedSeriesJSON)
        })
        // console.log(this.state.shows)
    }

    render() {
        return (
            <div>
                <div className="input-group mb-3">
                    <input
                        className="form-control"
                        type="form-control"
                        placeholder="Search shows and movies"
                        value={this.state.search_query}
                        onChange={e => this.setState({search_query: e.target.value})}/>
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-success"
                        onClick={() =>
                            this.findMovies(this.state.search_query)}>
                        <i className="fa fa-search"/>
                    </button>
                    </div>
                </div>

                <SearchTableComponent shows={this.state.shows}/>
            </div>
        )
    }
}