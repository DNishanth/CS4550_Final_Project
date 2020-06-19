import React from "react";
import { Link } from 'react-router-dom';

import { findPostsForDiscussion, createPost } from "../services/DiscussionService";

class DiscussionBoardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.discussionId = this.props.match.params.discId;

        this.state = {
            commentText: "",
            posts: []
        }

        this.onCommentChange = this.onCommentChange.bind(this);

        this.findPosts = this.findPosts.bind(this);
    }

    onCommentChange = e => this.setState({ commentText: e.target.value });

    findPosts = () => findPostsForDiscussion(this.props.match.params.discId).then(discussion => {
        this.setState({
            posts: discussion
        })
    });

    // onPost = e => alert(new Date());

    onPost = e => createPost(this.discussionId, {
        message: this.state.commentText,
        date: new Date()
    }).then(response => {
        this.findPosts();
    });


    componentDidMount() {
        this.findPosts();
        // findPostsForDiscussion(this.props.match.params.discId).then(discussion => {
        //     this.setState({
        //         posts: discussion
        //     });
        // })
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
                            <div className="card">
                                <div className="card-header">
                                    Username Here
                                </div>
                                <div className="card-body">
                                    <div className="card-text">
                                        {post.message}
                                    </div>
                                    <button className="btn btn-primary">
                                        Reply
                                    </button>
                                    {/* todo: pull in date from post */}
                                </div>
                            </div>
                        </div>)
                })}
            </div>
        )
    }
}

export default DiscussionBoardComponent