import React from "react";
import { Link } from 'react-router-dom';

import { findPostsForDiscussion, createPost, deletePost, updatePost } from "../services/DiscussionService";
import "./DiscussionBoard.css"
import UserService from "../services/UserService";

class DiscussionBoardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.discussionId = this.props.movieID ? this.props.movieID : this.props.match.params.discId;
        this.state = {
            postText: "",
            posts: [],
            currentUserId: 0,
            showPosts: false,
            loggedIn: true,
            editingPost: false,
            editingPostObj: {},
        }

        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.onPostChange = this.onPostChange.bind(this);
        this.findPosts = this.findPosts.bind(this);

        this.onDelete = this.onDelete.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    onDelete = () => deletePost(this.state.editingPostObj.id).then(response => {
        this.setState({
            editingPost: false,
            editingPostObj: {}
        }, this.findPostsForUser)
    })

    onUpdate = () => updatePost(this.state.editingPostObj).then(response => {
        this.setState({
            editingPost: false,
            editingPostObj: {}
        }, this.findPostsForUser)
    })

    getCurrentUser = () => UserService.getCurrentUser().then(response => {
        if (response.status !== 400 && response.status !== 500) {
            this.setState({
                currentUserId: response.id
            });
        }
        else {
            this.setState({
                loggedIn: false
            })
        }
    });

    onPostChange = e => this.setState({ postText: e.target.value });

    findPosts = () => findPostsForDiscussion(this.discussionId).then(discussion => {
        if (discussion.status !== 400 && discussion.status !== 500) {
            this.setState({
                posts: discussion,
                showPosts: true
            });
        }
    });

    onPost = e => createPost(this.discussionId, this.state.currentUserId, {
        message: this.state.postText,
        date: new Date()
    }).then(response => {
        this.findPosts();
    });

    componentDidMount() {
        this.getCurrentUser().then(resp => this.findPosts())
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
                                        value={this.state.postText}
                                        onChange={this.onPostChange}
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
                                                <p> {this.state.editingPostObj.id !== post.id && post.message} </p>

                                                {
                                                    this.state.loggedIn && (this.state.currentUserId === post.user.id) &&
                                                    <span>
                                                        {
                                                            !this.state.editingPost &&
                                                            <button
                                                                onClick={() => this.setState({
                                                                    editingPost: true,
                                                                    editingPostObj: post
                                                                })}
                                                                className="btn btn-warning btn-sm float-right">
                                                                <i className="fa fa-pencil" />
                                                            </button>
                                                        }
                                                        {
                                                            this.state.editingPost && (this.state.editingPostObj.id === post.id) &&
                                                            <span>
                                                                <input
                                                                    placeholder={post.message}
                                                                    onChange={e => this.setState({
                                                                        editingPostObj: { ...this.state.editingPostObj, message: e.target.value }
                                                                    })}>

                                                                </input>
                                                                <button
                                                                    onClick={() => this.setState({
                                                                        editingPost: false,
                                                                        editingPostObj: {}
                                                                    })}
                                                                    className="btn btn-secondary btn-sm float-right">
                                                                    <i className="fa fa-close" />
                                                                </button>

                                                                <button
                                                                    onClick={this.onUpdate}
                                                                    className="btn btn-success btn-sm float-right">
                                                                    <i className="fa fa-save" />
                                                                </button>

                                                                <button
                                                                    onClick={this.onDelete}
                                                                    className="btn btn-danger btn-sm float-right">
                                                                    <i className="fa fa-trash" />
                                                                </button>
                                                            </span>
                                                        }
                                                    </span>
                                                }

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