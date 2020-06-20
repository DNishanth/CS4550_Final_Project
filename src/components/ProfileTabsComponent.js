import React from "react";
import {Link} from "react-router-dom";

const ProfileTabsComponent = (props) =>
    <div>
        {
            props.layout === "watchlist" &&
            <ul className="nav nav-tabs flex-column flex-sm-row block">
                <li className="nav-item">
                    <Link to="/profile/watchlist" className="nav-link active">
                        Watchlist
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/wishlist" className="nav-link">
                        Wishlist
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/group" className="nav-link">
                        Group
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/posts" className="nav-link">
                        Posts
                    </Link>
                </li>
            </ul>
        }
        {
            props.layout === "wishlist" &&
            <ul className="nav nav-tabs flex-column flex-sm-row block">
                <li className="nav-item">
                    <Link to="/profile/watchlist" className="nav-link">
                        Watchlist
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/wishlist" className="nav-link active">
                        Wishlist
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/group" className="nav-link">
                        Group
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/posts" className="nav-link">
                        Posts
                    </Link>
                </li>
            </ul>
        }
        {
            props.layout === "group" &&
            <ul className="nav nav-tabs flex-column flex-sm-row block">
                <li className="nav-item">
                    <Link to="/profile/watchlist" className="nav-link">
                        Watchlist
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/wishlist" className="nav-link">
                        Wishlist
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/group" className="nav-link active">
                        Group
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/posts" className="nav-link">
                        Posts
                    </Link>
                </li>
            </ul>
        }
        {
            props.layout === "posts" &&
            <ul className="nav nav-tabs flex-column flex-sm-row block">
                <li className="nav-item">
                    <Link to="/profile/watchlist" className="nav-link">
                        Watchlist
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/wishlist" className="nav-link">
                        Wishlist
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/group" className="nav-link">
                        Group
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/posts" className="nav-link active">
                        Posts
                    </Link>
                </li>
            </ul>
        }
    </div>

export default ProfileTabsComponent