import React from "react";
import ShowListComponent from "../components/ShowListComponent";
import SummaryCardComponent from "../components/SummaryCardComponent";
import ProfileTabsComponent from "../components/ProfileTabsComponent";
import PrototypeService from "../services/PrototypeService";
import GenreBadgesComponent from "../components/GenreBadgesComponent";
import UserService from "../services/UserService";

export default class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails:
                {
                    username: '',
                    password: '',
                    role: '',
                    firstname: '',
                    lastName: '',
                    email: ''
                },


            // user: {
                watchlist: [],
                wishlist: [],
                groups: [
                    {name: "fmop", members: []}
                ],
                favoriteGenres: ["action", "comedy", "fantasy", "sci-fi", "anime"],
            // },
            showId: this.props.match.params.showId,
            layout: this.props.match.params.layout
        };
    }

    componentDidMount() {
        PrototypeService.findMovies("")
            .then(watchlist => {
                this.setState({
                    watchlist: watchlist
                })
            })
        PrototypeService.findMovies("Spiderman")
            .then(wishlist => {
                this.setState({
                    wishlist: wishlist
                })
            })

        fetch("https://wbdv-team18-final-project.herokuapp.com/api/profile", {
            method: 'POST',
            credentials: "include"
        })
            .then(response => {
                console.log(response)
                return response.json()
            })
            .catch(e => {
                this.props.history.push("/")
            })
            .then(user => {
                if(user)
                    this.setState({
                        userDetails: {
                            username: user.username, password: user.password
                        }
                    })
            })
    }

    logout = () => {
        fetch("https://wbdv-team18-final-project.herokuapp.com/api/logout", {
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

    saveLists() {
        UserService.createUser(this.state).then(r => alert("created user"))
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
                            <h2>{this.state.userDetails.username}</h2>
                            {
                                this.props.match.params.layout !== "settings" &&
                                <a href={`/profile/settings`}>
                                    <button
                                            className="btn btn-outline-info btn-sm w-auto ml-4 mt-2">
                                        Edit Profile
                                    </button>
                                </a>
                            }
                            <button
                                onClick={this.logout}
                                className="btn btn-sm btn-outline-danger w-auto h-75 ml-2 mt-2">
                                Logout
                            </button>
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
                            {this.state.layout === "watchlist" &&
                                <ShowListComponent
                                    {...this.props}
                                    layout={this.state.layout}
                                    shows={this.state.watchlist}/>
                            }

                            {this.state.layout === "wishlist" &&
                                <ShowListComponent
                                    {...this.props}
                                    layout={this.state.layout}
                                    shows={this.state.wishlist}/>
                            }
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
            </div>
        );
    }
}