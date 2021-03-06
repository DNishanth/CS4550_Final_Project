import React from "react";
import PrototypeService from "../services/APIService";
import {findShowByImdb} from "../services/DiscussionService";
import {Link} from "react-router-dom";
import UserService from "../services/UserService";

class SummaryCardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
        }

        this.findDiscussionId = this.findDiscussionId.bind(this);
    }

    findDiscussionId = () => findShowByImdb(this.props._id).then(show => {
        this.setState({
            discussionId: show.id
        });
    });

    componentDidMount() {
        this.findDiscussionId();
        PrototypeService.getIMDBDetails(this.props._id)
            .then(details => {
                console.log(details)
                if (details.movie_results.length > 0) {
                    this.setState({
                        title: details.movie_results[0].title,
                        description: details.movie_results[0].overview
                    })
                } else {
                    this.setState({
                        title: details.tv_results[0].name,
                        description: details.tv_results[0].overview
                    })
                }
            })
    }

    removeShow(showId) {
        UserService.getCurrentUser().then(user =>
            fetch(`http://localhost:8080/api/users/${user.id}/shows`)
                // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${this.state.userId}/shows`)
                .then(response => response.json())
                .then(watchlist => {
                    let selectedShow = watchlist.find(show => show.imdbId === showId)
                    console.log(selectedShow)
                    fetch(`http://localhost:8080/api/shows/${selectedShow.id}`, {
                        method: 'DELETE'
                    }).catch(e => {
                    }).then(response => (this.props.history.push("/profile/watchlist")))
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
                            <i className={"fa fa-times text-danger"}/>
                        </Link>
                    </div>

                    <p className="card-text">{this.state.description}</p>
                    <Link to={`/discussions/${this.props._id}`}>
                        <button className="btn btn-primary btn-block mt-2 mb-3">
                            Go to Discussion Board
                        </button>
                    </Link>

                    <button
                        onClick={() => this.removeShow(this.props.match.params.showId)}
                        className="mt-3 btn btn-sm btn-outline-danger float-right">
                        Remove Show
                    </button>
                    {/*{this.props.layout === "watchlist" && <ProgressComponent {...this.props}/>}*/}

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