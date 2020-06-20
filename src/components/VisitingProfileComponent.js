import React from "react";
import ShowListComponent from "./ShowListComponent";
import SummaryCardComponent from "./SummaryCardComponent";
import ProfileTabsComponent from "./ProfileTabsComponent";
import GenreBadgesComponent from "./GenreBadgesComponent";
import MediaQuery from "react-responsive";
import PostListComponent from "./PostListComponent";
import GroupsTabComponent from "./GroupsTabComponent";

export default class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userId: this.props.match.params.profileId,

            favoriteGenres: ["action", "comedy", "fantasy", "sci-fi", "anime"],
            watchlist: [],
            groups: [],
            posts: [],

            showId: this.props.match.params.showId,
            layout: this.props.match.params.layout
        };
    }

    componentDidMount() {
        fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${this.state.userId}`, {
            // fetch("http://localhost:8080/api/profile", {
            method: 'POST',
            credentials: "include"
        })
            .then(response => {
                return response.json()
            })
            .then(user => {
                if(user) {
                    console.log("entered conditional")
                    this.setState({
                        username: user.username,
                    })
                }
            }).then(status =>
            // fetch(`http://localhost:8080/api/users/${this.state.userId}/shows`)
            fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${this.state.userId}/shows`)
                .then(response => response.json())
                .then(watchlist => this.setState({
                    watchlist: watchlist
                })).then(status =>
                // fetch(`http://localhost:8080/api/users/${this.state.userId}/groups`)
                fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${this.state.userId}/groups`)
                    .then(response => response.json())
                    .then(groups => this.setState({
                        groups: groups
                    })).then(status => console.log(this.state.groups)
                )
            ))

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
                        <i className="fa fa-user-circle-o mt-2" style={{fontSize: 80}}/>
                    </div>

                    <div className="col-lg-10 col-md-10 col-sm-10">
                        <div className="d-flex {/*justify-content-between*/}">
                            <h2>{this.state.username}</h2>
                        </div>
                        <p className="m-0">Top 5 Genres</p>
                        <div className="row pl-3">
                            {this.state.favoriteGenres.map(genre => <GenreBadgesComponent genre={genre}/>)}
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
                        <br/>

                        <MediaQuery query='(min-width: 1024px)'>
                            {/*{console.log(this.state.watchlist)}*/}
                            <div>
                                {this.state.layout === "watchlist" &&
                                <ShowListComponent
                                    {...this.props}
                                    mobileView={false}
                                    layout={this.state.layout}
                                    shows={this.state.watchlist}/>
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
                                    shows={this.state.watchlist}/>
                                }
                            </div>
                        </MediaQuery>
                    </div>

                    <div className="col-lg-5">
                        {
                            this.state.showId &&
                            <SummaryCardComponent
                                {...this.props}
                                layout={this.state.layout}
                                _id={this.state.showId}
                                key={this.state.showId}/>
                        }
                    </div>
                </div>
                {
                    this.state.layout === "group" &&
                    <span>
                    <GroupsTabComponent
                        {...this.props}
                        userId={this.state.userId}
                        groups={this.state.groups}/>
                </span>
                }
                {
                    this.state.layout === "posts" &&
                    <span>
                    <PostListComponent/>
                </span>
                }
            </div>
        );
    }
}