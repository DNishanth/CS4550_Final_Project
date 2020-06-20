import React from "react";
import { findPostsForUser } from "../services/DiscussionService";
import "./DiscussionBoard.css"
import { Link } from "react-router-dom";

class PostListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }

        this.findPostsForUser = this.findPostsForUser.bind(this);
    }

    // todo check how this works when view other profiles
    // user id needs to passed from the parent, either current user or from match params
    findPostsForUser = () => findPostsForUser(this.props.userId).then(response => {
        console.log(response);
        this.setState({
            posts: response
        });
        console.log(this.state.posts);
    });

    componentDidMount() {
        this.findPostsForUser();
    }

    render() {
        return (
            <div>
                {this.state.posts.map((post) => {
                    return (
                        <div key={post.id}>
                            <div className="card wbdv-post-card">
                                <div className="card-header">
                                    {post.user.firstName + " " + post.user.lastName}
                                </div>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                        <Link to={`/discussions/${post.show.imdbId}`}>
                                            <p> {post.message} </p>
                                        </Link>
                                        <footer className="blockquote-footer"> {post.date} </footer>
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