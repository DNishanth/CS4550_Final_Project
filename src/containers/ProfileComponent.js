import React from "react";
import WatchlistComponent from "../components/WatchlistComponent";
import SummaryCardComponent from "../components/SummaryCardComponent";
import ProfileTabsComponent from "../components/ProfileTabsComponent";
import PrototypeService from "../services/PrototypeService";
import GenreBadgesComponent from "../components/GenreBadgesComponent";
import UserService from "../services/UserService";

export default class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // user: {
                watchlist: [],
                wishlist: [],
                groups: [
                    {name: "fmop", members: []}
                ],
                favoriteGenres: ["action", "comedy", "fantasy", "sci-fi", "anime"],
            // },
            showId: this.props.match.params.showId,
            layout: ""
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
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.match.params.showId !== this.props.match.params.showId) {
            this.setState({
                showId: this.props.match.params.showId
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

                    <div className="col-md-2 col-sm-1">
                        <i className="fa fa-user-circle-o" style={{fontSize: 100}}/>
                    </div>

                    <div className="col-md-10 col-sm-11">
                        <div className="d-flex justify-content-between">
                            <h2>User Name</h2>
                        </div>
                        <p style={{margin: 0}}>Top 5 Genres</p>
                        <div className="row" style={{paddingLeft: 15}}>
                            {this.state.favoriteGenres.map(genre => <GenreBadgesComponent genre={genre}/>)}
                        </div>
                    </div>

                    <button style={{width: 100, marginLeft: 15}}
                            onClick={() => this.saveLists()}
                            className="btn btn-outline-info btn-sm">
                        Edit Profile
                    </button>


                    <div className="col-12">
                        <br/>
                        <ProfileTabsComponent/>
                    </div>

                    <div className="col-md-7">
                        <br/>
                        <WatchlistComponent shows={this.state.watchlist}/>
                        {/*<WishlistComponent shows={this.state.wishlist}/>*/}
                    </div>

                    <div className="col-md-5">
                        <SummaryCardComponent
                            _id={this.state.showId}
                            key={this.state.showId}/>
                    </div>
                </div>
            </div>
        );
    }
}