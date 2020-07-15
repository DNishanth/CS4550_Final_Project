import React from "react";
import ShowListComponent from "./ShowListComponent";
import SummaryCardComponent from "./SummaryCardComponent";
import ProfileTabsComponent from "./ProfileTabsComponent";
import MediaQuery from "react-responsive";
import PostListComponent from "./PostListComponent";
import WatchPartyTabComponent from "./WatchPartyTabComponent";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";
import * as WatchPartyService from "../services/WatchPartyService";
import WatchPartyListComponent from "./WatchPartyListComponent";

export default class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userId: '',
            visiting: this.props.match.params.layout !== "watchlist" &&
                this.props.match.params.layout !== "watch-party" &&
                this.props.match.params.layout !== "posts" &&
                this.props.match.params.layout !== "info",

            watchlist: [],
            posts: [],
            watchParties: [],

            showId: this.props.match.params.showId,
            layout: this.props.match.params.layout
        };
    }

    componentDidMount() {
        if (this.state.visiting) {
            this.setState({
                userId: this.state.layout,
            })
            fetch(`http://localhost:8080/api/users/${this.state.layout}`)
                // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${this.state.layout}`)
                .catch(e => console.log(e)).then(response => response.json())
                .then(user => this.setState({username: user.username}))
                .then(status =>
                    fetch(`http://localhost:8080/api/users/${this.state.layout}/shows`)
                        // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${this.state.layout}/shows`)
                        .then(response => response.json())
                        .then(watchlist => this.setState({
                            watchlist: watchlist
                        })).then(status =>

                        // WatchPartyService.findUsersWatchParties user vs user.id
                        fetch(`http://localhost:8080/api/users/${this.state.layout}/watch-parties`)
                            // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${this.state.layout}/watch-party`)
                            .then(response => response.json())
                            .catch(e => {})
                            .then(watchParties =>
                                this.setState({
                                watchParties: watchParties
                            })).then(status => console.log(this.state.watchParties)
                        )
                    ))
        } else {
            UserService.getCurrentUser()
                .then(user => {
                if (user && !user.status) {
                    console.log("entered conditional")
                    this.setState({
                        username: user.username,
                        password: user.password,
                        userId: user.id,
                    })
                    fetch(`http://localhost:8080/api/users/${user.id}/shows`)
                        // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${this.state.userId}/shows`)
                        .then(response => response.json())
                        .then(watchlist => this.setState({
                            watchlist: watchlist
                        }))
                    WatchPartyService.findUsersWatchParties(user)
                        .then(watchParties => this.setState({
                            watchParties: watchParties
                        })).then(status => console.log(this.state.watchParties))
                } else {
                    console.log("redirect")
                    this.props.history.push("/")
                }
            })
        }
    }

    logout = () => {
        fetch("http://localhost:8080/api/logout", {
        // fetch("https://wbdv-team18-final-project.herokuapp.com/api/logout", {
            method: 'POST',
            credentials: "include"
        })
            .then(response => this.props.history.push("/"))

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.showId !== this.props.match.params.showId) {
            this.setState({
                showId: this.props.match.params.showId
            })
        }
        if (prevProps.match.params.layout !== this.props.match.params.layout) {
            this.setState({
                layout: this.props.match.params.layout
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">

                    <div className="col-lg-2 col-md-2 col-sm-2">
                        <i className="fa fa-user-circle-o mt-2" style={{ fontSize: 80 }} />
                    </div>

                    <div className="col-lg-10 col-md-10 col-sm-10">
                        <div className="d-flex">
                            <h2>{this.state.username}</h2>
                            {
                                this.props.match.params.layout !== "info" &&
                                !this.state.visiting &&
                                <Link to="/profile/info">
                                    <button
                                        className="btn btn-outline-info btn-sm w-auto ml-4 mt-2">
                                        Edit Profile
                                    </button>
                                </Link>
                            }
                            {
                                !this.state.visiting &&
                                <button
                                    onClick={this.logout}
                                    className="btn btn-sm btn-outline-danger w-auto h-75 ml-2 mt-2">
                                    Logout
                                </button>
                            }
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 mt-3">
                        <ProfileTabsComponent layout={this.state.layout}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-7">
                        <br />

                        <MediaQuery query='(min-width: 1024px)'>
                            <div>
                                {this.state.layout === "watchlist" &&
                                    <ShowListComponent
                                        {...this.props}
                                        mobileView={false}
                                        layout={this.state.layout}
                                        shows={this.state.watchlist} />
                                }
                                {!isNaN(this.state.layout) &&
                                    <ShowListComponent
                                        {...this.props}
                                        mobileView={false}
                                        layout={this.state.layout}
                                        shows={this.state.watchlist} />
                                }
                                {!isNaN(this.state.layout) &&
                                    <PostListComponent userId={this.state.layout}/>
                                }
                            </div>
                        </MediaQuery>
                        <MediaQuery query='(max-width: 1023px)'>
                            <div>
                                {this.state.layout === "watchlist" &&
                                    <ShowListComponent
                                        {...this.props}
                                        mobileView={true}
                                        layout={this.state.layout}
                                        shows={this.state.watchlist} />
                                }
                                {this.state.visiting &&
                                    <ShowListComponent
                                        {...this.props}
                                        mobileView={true}
                                        layout={this.state.layout}
                                        shows={this.state.watchlist} />
                                }
                                {!isNaN(this.state.layout) &&
                                    <PostListComponent userId={this.state.layout}/>
                                }
                            </div>
                        </MediaQuery>
                    </div>

                    <MediaQuery query='(min-width: 1024px)'>
                        <div className="col-lg-5">
                            {
                                this.state.showId &&
                                <SummaryCardComponent
                                    {...this.props}
                                    layout={this.state.layout}
                                    _id={this.state.showId}
                                    key={this.state.showId} />
                            }
                        </div>
                    </MediaQuery>
            </div>
            {
                this.state.layout === "watch-party" &&
                <span>
                    <WatchPartyListComponent
                        key={this.state.userId}
                        userId={this.state.userId}/>
                </span>
            }
            {
                this.state.layout === "posts" &&
                <span>
                    <PostListComponent userId={this.state.userId}/>
                </span>
            }
            </div>
        );
    }
}