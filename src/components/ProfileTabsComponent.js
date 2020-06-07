import React from "react";
import {Link} from "react-router-dom";

const ProfileTabsComponent = (props) =>
    <div>
        <ul className="nav nav-tabs flex-column flex-sm-row block">
            <li className="nav-item">
                <Link to="#" className="nav-link active">
                    Watchlist
                </Link>
            </li>
            <li className="nav-item">
                <Link to="#" className="nav-link">
                    Wishlist
                </Link>
            </li>
            <li className="nav-item">
                <Link to="#" className="nav-link">
                    Groups
                </Link>
            </li>
        </ul>
    </div>

export default ProfileTabsComponent