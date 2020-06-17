import React from "react";
import ShowPosterComponent from "./ShowPosterComponent";

export default class ShowListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="float-left">{this.capitalize(this.props.layout)}</h2>
                </div>

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
                        {
                            this.props.shows.map(show =>
                                <ShowPosterComponent
                                    view={this.state.searchBar}
                                    layout={this.props.layout}
                                    key={show.movie.ids.imdb}
                                    _id={show.movie.ids.imdb}/>)
                        }
                    </div>
            </div>
        )
    }
}