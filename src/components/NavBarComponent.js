import React from "react";
import {Link} from "react-router-dom";

const NavBarComponent = () =>
    <div>
        <nav className="nav navbar-light bg-white justify-content-between fixed-top wbdv-site-nav-bar">
            <div className="navbar-header">
                <a className="navbar-brand" href="/">What Are We Watching</a>
            </div>

            <ul className="nav nav-pills d-none d-sm-flex">
                <li className="nav-item">
                    <Link to="/search" className="nav-link" role="button" aria-haspopup="true"
                          aria-expanded="false">
                        <i className="fa fa-search"/>
                    </Link>
                </li>

                <li className="nav-item">
                    <a href="/profile/watchlist" className="nav-link" role="button" aria-haspopup="true"
                       aria-expanded="false">
                        <i className="fa fa-user"/>
                    </a>
                </li>

                <li className="nav-item">
                    <Link to="/registration" className="nav-link" role="button" aria-haspopup="true"
                          aria-expanded="false">
                        Register
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/login" className="btn btn-outline-success my-2 my-sm-0" type="submit">
                        {/*<i className="fa fa-sign-in"></i>*/}
                        Login
                    </Link>
                </li>
            </ul>
        </nav>

        <div className="container nav-2 d-sm-none d-flex justify-content-center">
            <ul className="nav nav-pills nav-fill">
                <li className="active"><a href="#">Search</a></li>
                <li className=""><a href="#">Discussions</a></li>
                <li className=""><a href="#">Profile</a></li>
            </ul>
        </div>
    </div>

export default NavBarComponent