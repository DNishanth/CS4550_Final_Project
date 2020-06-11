import React from "react";
import ShowPosterComponent from "./ShowPosterComponent";

export default class ShowListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBar: this.props.match.params.view
        }
    }

    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    changeShowListView = (view) => {
        this.setState({
            searchBar: view
        })
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="float-left">{this.capitalize(this.props.layout)}</h2>
                    <div className="btn-group btn-group-toggle float-right mt-2 btn-group-sm" data-toggle="buttons">
                        <a
                            onClick={() => this.changeShowListView("search")}
                            className={`btn btn-secondary ${this.state.searchBar === "search" ? "active" : ""}`}>
                                Search List
                        </a>
                        <a
                            onClick={() => this.changeShowListView("add")}
                               className={`btn btn-secondary ${this.state.searchBar === "add" ? "active" : ""}`}>
                            Add Shows
                        </a>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <input
                        className="form-control"
                        type="form-control"
                        placeholder={this.state.searchBar === "search" ? "Search watched shows" : "Add new shows"}/>
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-success">
                            <i className="fa fa-search"/>
                        </button>
                    </div>
                </div>

                {
                    this.state.searchBar === "search" &&
                    <div className="row container ml-0 p-0">
                        {
                            this.props.shows.map(show =>
                                <ShowPosterComponent
                                    view={this.state.searchBar}
                                    layout={this.props.layout}
                                    key={show.movie.ids.imdb}
                                    _id={show.movie.ids.imdb}/>)
                        }}
                    </div>
                }
                {
                    this.state.searchBar === "add" &&
                    <span>
                        <h5>Use the search bar to search for shows (not yet functional) </h5>
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
                    </span>
                }
            </div>
        )
    }
}