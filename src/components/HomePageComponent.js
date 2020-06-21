import React from "react";
import ShowPosterComponent from "./ShowPosterComponent";
import PrototypeService from "../services/APIService";

class HomePageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shows: []
        }
    }

    componentDidMount() {
        PrototypeService.findMovies("").then(movies =>
            this.setState({ shows: movies }));
    }

    render() {
        return (
            <div>
                <h1 className="text-center">What Are We Watching?</h1>
                <h3 className="text-center mt-5">Popular Movies</h3>
                {console.log(this.state.shows)}
                <div className="row container ml-0">
                    {
                        this.state.shows.map(show =>
                            <ShowPosterComponent
                                mobileView={true}
                                layout={""}
                                key={show.movie.ids.imdb}
                                _id={show.movie.ids.imdb} />)
                    }
                </div>
            </div>
        )
    }
}

export default HomePageComponent