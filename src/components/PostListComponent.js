import React from "react";
import { findPostsForUser } from "../services/DiscussionService";
import "./DiscussionBoard.css"
import { Link } from "react-router-dom";
import UserService from "../services/UserService";


class PostListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            user: {},
            signedIn: true
        }

        this.findPostsForUser = this.findPostsForUser.bind(this);

        this.getCurrentUser = this.getCurrentUser.bind(this);

    }

    findPostsForUser = () => findPostsForUser(this.props.userId).then(response => {
        this.setState({
            posts: response
        });
    });



    getCurrentUser = () => UserService.getCurrentUser().then(response => {
        if (response.status !== 400) {
            this.setState({
                user: response
            });
        }
        else {
            this.setState({
                signedIn: false
            });
        }
    });

    componentDidMount() {
        this.findPostsForUser();
        this.getCurrentUser();
    }

    render() {
        return (
            <div>
                {this.state.posts.map((post) => {
                    return (
                        <div key={post.id}>
                            <div className="card wbdv-post-card">
                                <div className="card-header">
                                    {post.date}
                                </div>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                        <p> {post.message} </p>
                                        <footer className="blockquote-footer">
                                            {this.state.signedIn ?
                                                <Link to={`/discussions/${post.show.imdbId}`}>
                                                    Join the discussion here!
                                                </Link> : "You must sign in to access this discussion"}
                                        </footer>

                                    </blockquote>
                                </div>
                            </div>
                        </div>)
                })}
            </div>
        )
    }
}

export default PostListComponent