import React from "react";
import WatchlistComponent from "./WatchlistComponent";
import SummaryCardComponent from "./SummaryCardComponent";

export default class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedShow: []
        };
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-1">
                        <i className="fa fa-user-circle-o" style={{fontSize: 100}}/>
                    </div>
                    <div className="col-11" style={{paddingLeft: 40}}>
                        <h2>User Name</h2>
                        <p style={{margin: 0}}>Favorite Genres</p>
                        <a href="#" className="badge badge-secondary bg-info wbdv-favorite-genre-tag">Action</a>
                        <a href="#" className="badge badge-secondary bg-info wbdv-favorite-genre-tag">Comedy</a>
                        <a href="#" className="badge badge-secondary bg-info wbdv-favorite-genre-tag">Fantasy</a>
                    </div>

                    <div className="col-12">
                        <br/>

                        <ul className="nav nav-tabs flex-column flex-sm-row block">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Watchlist</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Wishlist</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Groups</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-7">
                        <br/>
                        <WatchlistComponent/>
                    </div>

                    <div className="col-5">
                        <br/>
                        <SummaryCardComponent title="JoJo's Bizaare Adventure"/>
                    </div>
                </div>
            </div>
        );
    }
}