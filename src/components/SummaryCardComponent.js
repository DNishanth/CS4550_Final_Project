import React from "react";
import ProgressComponent from "./ProgressComponent";
import PrototypeService from "../services/PrototypeService";
import { findShowByImdb } from "../services/DiscussionService";
import { Link } from "react-router-dom";

class SummaryCardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            poster: "",
            title: "",
            description: "",
        }

        this.findDiscussionId = this.findDiscussionId.bind(this);
    }

    findDiscussionId = () => findShowByImdb(this.props._id).then(show => {
        this.setState({
            discussionId: show.id
        });
        // alert(this.props._id);
    });

    componentDidMount() {
        this.findDiscussionId();
        PrototypeService.getIMDBDetails(this.props._id)
            .then(details =>
                this.setState({
                    poster: `https://image.tmdb.org/t/p/w200${details.movie_results[0].poster_path}`,
                    title: details.movie_results[0].title,
                    description: details.movie_results[0].overview
                })
            )
    }

    render() {
        return (
            <div className="card position-fixed w-25 ml-5">

                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{this.state.title}</h5>
                        <Link to={`/profile/${this.props.layout}`}>
                            <i className={"fa fa-times text-danger"} />
                        </Link>
                    </div>

                    <p className="card-text">{this.state.description}</p>
                    <Link to={`/discussions/${this.props._id}`}>
                        <button className="btn btn-primary btn-block mt-2 mb-3">
                            Go to Discussion Board
                        </button>
                    </Link>
                    {/* <a href={`/discussions/${this.props._id}`}
                        className="card-link btn btn-primary btn-block mt-2 mb-3">{`Go to Discussion Board`}</a> */}

                    {this.props.layout === "watchlist" && <ProgressComponent />}

                    {
                        this.props.layout === "wishlist" &&
                        <button className="btn btn-outline-warning">Start Watching</button>
                    }
                </div>
            </div>
        )
    }
}

export default SummaryCardComponent