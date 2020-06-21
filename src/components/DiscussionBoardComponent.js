import React from "react";
import { Link } from 'react-router-dom';

import { findPostsForDiscussion, createPost } from "../services/DiscussionService";
import "./DiscussionBoard.css"
import UserService from "../services/UserService";

class DiscussionBoardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.discussionId = this.props.movieID ? this.props.movieID : this.props.match.params.discId;
        this.state = {
            commentText: "",
            posts: [],
            user: {
                id: 10
            },
            showPosts: false,
            loggedIn: false
        }

        this.getCurrentUser = this.getCurrentUser.bind(this);

        this.onCommentChange = this.onCommentChange.bind(this);

        this.findPosts = this.findPosts.bind(this);

        this.getCurrentUser();
    }

    getCurrentUser = () => UserService.getCurrentUser().then(response => {
        if (response.status !== 400 && response.status !== 500) {
            this.setState({
                user: response,
                loggedIn: true
            });
        }
    });

    onCommentChange = e => this.setState({ commentText: e.target.value });

    findPosts = () => findPostsForDiscussion(this.discussionId).then(discussion => {
        if (discussion.status !== 400 && discussion.status !== 500) {
            this.setState({
                posts: discussion,
                showPosts: true
            });
        }
    });

    onPost = e => createPost(this.discussionId, this.state.user.id, {
        message: this.state.commentText,
        date: new Date()
    }).then(response => {
        this.findPosts();
    });

    componentDidMount() {
        this.findPosts();
    }

    render() {
        return (
            <div>
                <h1 className="text-center mt-5" >Discussion</h1>
                {this.state.showPosts ?
                    <div>
                        {
                            this.state.loggedIn &&
                            <div className="card">
                                <div className="card-body">
                                    <textarea className="form-control"
                                        value={this.state.commentText}
                                        onChange={this.onCommentChange}
                                        placeholder="Discuss Here!">
                                        Discuss!
                                    </textarea>
                                    <button className="btn btn-success" onClick={this.onPost}>
                                        Post
                                    </button>
                                </div>
                            </div>
                        }

                        {this.state.posts.map((post) => {
                            return (
                                <div key={post.id}>
                                    <div className="card wbdv-post-card">
                                        <div className="card-header">
                                            <Link to={`/profile/${post.user.id}`}>
                                                {post.user.firstName + " " + post.user.lastName}
                                            </Link>
                                        </div>
                                        <div className="card-body">
                                            <blockquote className="blockquote mb-0">
                                                <p> {post.message} </p>
                                                <footer className="blockquote-footer"> {post.date} </footer>
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>)
                        })}
                    </div> :
                    <h1> No posts found. Start the discussion by adding to your watchlist. </h1>}
            </div>
        )
    }
}

export default DiscussionBoardComponent