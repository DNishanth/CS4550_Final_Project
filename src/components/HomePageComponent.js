import React from "react";
import ShowPosterComponent from "./ShowPosterComponent";
import PrototypeService from "../services/APIService";
import UserService from "../services/UserService";
import PostListComponent from "./PostListComponent";


class HomePageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shows: [],
            signedIn: false,
            userId: 0
        }

        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.getCurrentUser();
    }

    getCurrentUser = () => UserService.getCurrentUser().then(response => {
        if (response.status !== 400) {
            this.setState({
                userId: response.id,
                signedIn: true
            });
        }
    });

    componentDidMount() {
        PrototypeService.findMovies("").then(movies =>
            this.setState({ shows: movies }));
    }

    render() {
        return (
            <div>
                <h1 className="text-center">What Are We Watching?</h1>
                {
                    !this.state.signedIn && <div>
                        <h5 className="text-center mt-5"> Track movies and shows with your friends! Get started with the search icon above </h5>
                    </div>
                }
                {
                    this.state.signedIn && <div>
                        <h3 className="text-center mt-5">Welcome back!</h3>
                        <h4 className="text-center mt-5">Your recent posts</h4>
                        <PostListComponent userId={this.state.userId} />
                    </div>
                }

                <h3 className="text-center mt-5">Popular Movies</h3>
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