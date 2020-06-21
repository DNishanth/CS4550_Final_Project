import React from "react";
import { Link } from "react-router-dom";

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
                    <Link to="/profile/watch-party" className="nav-link">
                        Watch Party
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
            props.layout === "watch-party" &&
            <ul className="nav nav-tabs flex-column flex-sm-row block">
                <li className="nav-item">
                    <Link to="/profile/watchlist" className="nav-link">
                        Watchlist
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/watch-party" className="nav-link active">
                        Watch Party
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
                    <Link to="/profile/watch-party" className="nav-link">
                        Watch Party
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