import React from "react";
import { findPostsForUser, deletePost } from "../services/DiscussionService";
import "./DiscussionBoard.css"
import { Link } from "react-router-dom";
import UserService from "../services/UserService";


class PostListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            user: {},
            signedIn: true,
            editingPost: false,
            editingPostObj: {}
        }

        this.findPostsForUser = this.findPostsForUser.bind(this);

        this.getCurrentUser = this.getCurrentUser.bind(this);

        this.onDelete = this.onDelete.bind(this);

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

    onDelete = (id) => deletePost(id).then(response => {
        this.findPostsForUser();
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
                                        <p> {!this.state.editingPost && post.message} </p>

                                        {
                                                this.state.signedIn && this.state.user.userId === post.user.userId &&
                                                    <span>
                                                        {
                                                            !this.state.editingPost &&
                                                            <button
                                                                onClick={() => this.setState({editingPost: true})}
                                                                className="btn btn-warning btn-sm float-right">
                                                                <i className="fa fa-pencil"/>
                                                            </button>
                                                        }
                                                        {
                                                            this.state.editingPost &&
                                                            <span>
                                                                <input></input>
                                                                <button
                                                                    onClick={() => this.setState({editingPost: false})}
                                                                    className="btn btn-success btn-sm float-right">
                                                                        <i className="fa fa-save"/>
                                                                </button>
                                                                <button
                                                                    // onClick={this.onDelete(post.id)}
                                                                    className="btn btn-danger btn-sm float-right">
                                                                        <i className="fa fa-user-times"/>
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