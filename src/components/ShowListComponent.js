import React from "react";
import ShowPosterComponent from "./ShowPosterComponent";

export default class ShowListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        console.log(s)
        if (s !== "watchlist" && s !== "watch-party" && s !== "posts") return `Watchlist ID#${this.props.match.params.layout}`
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="float-left">{this.capitalize(this.props.layout)}</h2>
                </div>

                <div className="row container ml-0 p-0">
                    {
                        this.props.shows.length !== 0 &&
                        this.props.shows.map(show =>
                        <ShowPosterComponent
                        mobileView={this.props.mobileView}
                        layout={this.props.layout}
                        key={show.imdbId}
                        _id={show.imdbId} />)
                    }
                    {
                        this.props.shows.length === 0 &&
                        <h4>Nothing's here!</h4>
                    }
                </div>
            </div>
        )
    }
}