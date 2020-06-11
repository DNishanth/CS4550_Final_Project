import React from "react";
import PrototypeService from "../services/PrototypeService";

class ShowPosterComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            poster: "",
            title: "",
        }
    }

    componentDidMount() {
        {
            this.props._id != null &&
            PrototypeService.getIMDBDetails(this.props._id)
                .then(details =>
                    this.setState({
                        poster: `https://image.tmdb.org/t/p/w200${details.movie_results[0].poster_path}`,
                        title: details.movie_results[0].title
                    })
                )
        }
    }

    setSelected() {
        this.props.history.push(`/profile/${this.props.layout}/${this.props.view}/${this.props._id}`)
    }

    render() {
        return (
            <div className="card p-1 m-0 col-4 col-sm-4 col-md-3 col-lg-3"
                 id="foundShowContainer"
                 style={{width: 135, marginRight: 10, marginBottom: 10}}>

                <a href={`/profile/${this.props.layout}/${this.props.view}/${this.props._id}`}>
                    <img src={this.state.poster}
                         className="img-fluid img-responsive image"
                         alt={this.state.title}
                         onClick={() => this.setSelected()}/>
                </a>
            </div>
        )
    }


}

export default ShowPosterComponent