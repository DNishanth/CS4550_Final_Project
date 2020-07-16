import React from "react";
import PrototypeService from "../services/APIService";
import UserService from "../services/UserService";
import SearchTableComponent from "./SearchTableComponent";
import {Link} from "react-router-dom";

export default class SearchComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search_query: "",
            movies: [],
            series: [],
            shows: [],
            user: null
        }

        this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.query) {
            this.findMovies(this.props.match.params.query)
        } else {
            this.findMovies("")
        }
        this.getCurrentUser();
    }

    getCurrentUser = () => UserService.getCurrentUser().then(user => {
        if (!user.status) {
            this.setState({
                user: user
            });
        }
    });


    findMovies = (query) => {
        PrototypeService.findMovies(query)
            .then(movies => {
                    this.setState({
                        movies: movies
                    })
                    this.findSeries(query)
                    /*console.log(this.state.movies)*/
                }
            )
    }

    findSeries = (query) => {
        PrototypeService.findSeries(query).then(series => {
                this.setState(
                    {
                        series: series
                    })
                this.getShows()
                /*console.log(this.state.movies)*/
            }
        )
    }

    getShows = () => {
        let trimmedMovieJSON = this.state.movies.map(movie => movie.movie)
        let trimmedSeriesJSON = this.state.series.map(series => series.show)

        this.setState({
            shows: trimmedMovieJSON.concat(trimmedSeriesJSON)
        })

        console.log(this.state.shows)
    }

    render() {
        return (
            <div>
                <div className="input-group mb-3">
                    <input
                        className="form-control"
                        type="form-control"
                        placeholder="Search for shows"
                        value={this.state.search_query}
                        onChange={e => this.setState(
                            {search_query: e.target.value})}
                        onKeyPress={e => {
                            console.log(e.key);
                            if (e.key === "Enter") {
                                this.props.history.push(`/search/${this.state.search_query}`);
                                this.findMovies(this.state.search_query)
                            }
                        }}/>
                    <Link to={`/search/${this.state.search_query}`}>
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-success"
                                onClick={() => {
                                    this.findMovies(this.state.search_query)
                                }}>
                                <i className="fa fa-search"/>
                            </button>
                        </div>
                    </Link>
                </div>

                <SearchTableComponent shows={this.state.shows} currentUser={this.state.user}/>
            </div>
        )
    }
}