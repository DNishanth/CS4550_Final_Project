import React from "react";
import { findPostsForUser } from "../services/DiscussionService";


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
        // console.log(this.state.posts);
    }

    render() {
        return (
            <div>
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
                                </div>
                            </div>
                        </div>)
                })}
                {/* <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">List group item heading</h5>
                            <small>3 days ago</small>
                        </div>
                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
                            risus
                            varius blandit.</p>
                        <small>Donec id elit non mi porta.</small>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">List group item heading</h5>
                            <small className="text-muted">3 days ago</small>
                        </div>
                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
                            risus
                            varius blandit.</p>
                        <small className="text-muted">Donec id elit non mi porta.</small>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">List group item heading</h5>
                            <small className="text-muted">3 days ago</small>
                        </div>
                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
                            risus
                            varius blandit.</p>
                        <small className="text-muted">Donec id elit non mi porta.</small>
                    </a>
                </div> */}
            </div>
        )
    }
}

export default PostListComponent