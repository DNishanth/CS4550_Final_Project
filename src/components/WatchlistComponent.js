import React from "react";
import ShowPosterComponent from "./ShowPosterComponent";

export default class WatchlistComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <h1>Watchlist</h1>
                <div className="input-group mb-3">
                    <input
                        className="form-control"
                        type="form-control"
                        placeholder="Search watched shows"/>
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-success">
                            <i className="fa fa-search"/>
                        </button>
                    </div>
                </div>

                <div className="row container ml-0 p-0">
                    {this.props.shows.map(show =>
                        <ShowPosterComponent
                            key={show.movie.ids.imdb}
                            _id={show.movie.ids.imdb}/>)}
                </div>
            </div>
        )
    }
}