import React from "react";
import PrototypeService from "../services/APIService";

class ShowPosterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            poster: "",
            title: "",
        }
    }

    componentDidMount() {
        {
            this.props._id != null &&
                PrototypeService.getIMDBDetails(this.props._id)
                    .then(details => {
                        if (details.movie_results.length > 0) {
                            this.setState({
                                title: details.movie_results[0].title,
                                poster: `https://image.tmdb.org/t/p/w200${details.movie_results[0].poster_path}`
                            })
                        }
                        else {
                            this.setState({
                                title: details.tv_results[0].title,
                                poster: `https://image.tmdb.org/t/p/w200${details.tv_results[0].poster_path}`
                            })
                        }
                    }
                    )
        }
    }

    setSelected() {
        if (this.props.mobileView) {
            this.props.history.push(`/result/${this.props._id}`)
        } else {
            this.props.history.push(`/profile/${this.props.layout}/${this.props._id}`)
        }
    }

    render() {
        return (
            <div className="card p-1 m-0 col-4 col-sm-4 col-md-3 col-lg-3"
                id="foundShowContainer"
                style={{ width: 135, marginRight: 10, marginBottom: 10 }}>

                <a href={this.props.mobileView ? `/result/${this.props._id}` : `/profile/${this.props.layout}/${this.props._id}`}>
                    <img src={this.state.poster}
                        className="img-fluid img-responsive image"
                        alt={this.state.title}
                        onClick={() => this.setSelected()} />
                </a>
            </div>
        )
    }


}

export default ShowPosterComponent