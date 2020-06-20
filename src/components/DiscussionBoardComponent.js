import React from "react";
import { Link } from 'react-router-dom';

import { findPostsForDiscussion, createPost } from "../services/DiscussionService";
import "./DiscussionBoard.css"
import UserService from "../services/UserService";

class DiscussionBoardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.discussionId = this.props.match.params.discId;
        this.state = {
            commentText: "",
            posts: [],
            user: {
                id: 10,
            }
        }

        this.getCurrentUser = this.getCurrentUser.bind(this);

        this.onCommentChange = this.onCommentChange.bind(this);

        this.findPosts = this.findPosts.bind(this);

        this.getCurrentUser();
    }

    getCurrentUser = () => UserService.getCurrentUser().then(response => {
        this.setState({
            user: response
        })
    });

    onCommentChange = e => this.setState({ commentText: e.target.value });

    findPosts = () => findPostsForDiscussion(this.props.match.params.discId).then(discussion => {
        this.setState({
            posts: discussion
        });
    });

    // onPost = e => alert(new Date());

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
                <h1>Discussion Board</h1>
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
            </div>
        )
    }
}

export default DiscussionBoardComponent