import React from "react";
import {deletePost, findPostsForUser, updatePost} from "../services/DiscussionService";
import "./DiscussionBoard.css"
import {Link} from "react-router-dom";
import UserService from "../services/UserService";


class PostListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            user: {},
            signedIn: true,
            editingPost: false,
            editingPostObj: {},
            currentUserId: 0
        }

        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.findPostsForUser = this.findPostsForUser.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onUpdate = this.onUpdate.bind(this);

    }

    // findPostsForUser = () => findPostsForUser(this.props.userId).then(response => {
    findPostsForUser = () => findPostsForUser(this.props.userId ? this.props.userId : this.state.currentUserId)
        .then(response => {
            this.setState({
                posts: response
            });
        });

    getCurrentUser = () => UserService.getCurrentUser().then(response => {
        if (response.status !== 400 && response.status !== 500) {
            this.setState({
                currentUserId: response.id
            });
        } else {
            this.setState({
                signedIn: false
            });
        }
    })

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

    componentDidMount() {
        this.getCurrentUser().then(resp => this.findPostsForUser());
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
                                        <p> {this.state.editingPostObj.id !== post.id && post.message} </p>

                                        {
                                            this.state.signedIn && (this.state.currentUserId === post.user.id) &&
                                            <span>
                                                {
                                                    !this.state.editingPost &&
                                                    <button
                                                        onClick={() => this.setState({
                                                            editingPost: true,
                                                            editingPostObj: post
                                                        })}
                                                        className="btn btn-warning btn-sm float-right">
                                                        <i className="fa fa-pencil"/>
                                                    </button>
                                                }
                                                {
                                                    this.state.editingPost && (this.state.editingPostObj.id === post.id) &&
                                                    <span>
                                                        <input
                                                            placeholder={post.message}
                                                            onChange={e => this.setState({
                                                                editingPostObj: {
                                                                    ...this.state.editingPostObj,
                                                                    message: e.target.value
                                                                }
                                                            })}>

                                                        </input>
                                                        <button
                                                            onClick={() => this.setState({
                                                                editingPost: false,
                                                                editingPostObj: {}
                                                            })}
                                                            className="btn btn-secondary btn-sm float-right">
                                                            <i className="fa fa-close"/>
                                                        </button>

                                                        <button
                                                            onClick={this.onUpdate}
                                                            className="btn btn-success btn-sm float-right">
                                                            <i className="fa fa-save"/>
                                                        </button>

                                                        <button
                                                            onClick={this.onDelete}
                                                            className="btn btn-danger btn-sm float-right">
                                                            <i className="fa fa-trash"/>
                                                        </button>
                                                    </span>
                                                }
                                            </span>
                                        }

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