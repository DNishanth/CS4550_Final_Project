import React from "react";
import {Link} from "react-router-dom";

const ProfileTabsComponent = (props) =>
    <div>
        {
            props.layout === "watchlist" &&
            <ul className="nav nav-tabs flex-column flex-sm-row block">
                <li className="nav-item">
                    <Link to="/profile/watchlist/search" className="nav-link active">
                        Watchlist
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/wishlist/search" className="nav-link">
                        Wishlist
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/groups" className="nav-link">
                        Groups
                    </Link>
                </li>
            </ul>
        }
        {
            props.layout === "wishlist" &&
            <ul className="nav nav-tabs flex-column flex-sm-row block">
                <li className="nav-item">
                    <Link to="/profile/watchlist/search" className="nav-link">
                        Watchlist
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/wishlist/search" className="nav-link active">
                        Wishlist
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/groups" className="nav-link">
                        Groups
                    </Link>
                </li>
            </ul>
        }
        {
            props.layout === "groups" &&
            <ul className="nav nav-tabs flex-column flex-sm-row block">
                <li className="nav-item">
                    <Link to="/profile/watchlist/search" className="nav-link">
                        Watchlist
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/wishlist/search" className="nav-link">
                        Wishlist
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/groups" className="nav-link active">
                        Groups
                    </Link>
                </li>
            </ul>
        }
    </div>

export default ProfileTabsComponent