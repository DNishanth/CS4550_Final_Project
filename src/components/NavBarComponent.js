import React from "react";
import {Link} from "react-router-dom";

const NavBarComponent = () =>
    <div>
        <nav
            className="nav navbar-light bg-light justify-content-between fixed-top wbdv-site-nav-bar">
            <Link to={'/'}>
                <h1 className="navbar-brand">What Are We Watching?</h1>
            </Link>

            <div>
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" role="button" aria-haspopup="true"
                              aria-expanded="false">
                            Search
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/profile" className="nav-link" role="button" aria-haspopup="true"
                              aria-expanded="false">
                            Profile
                        </Link>
                    </li>

                    <li className="nav-item dropdown">
                        <Link to="/discussions/home" className="nav-link" role="button" aria-haspopup="true"
                              aria-expanded="false">
                            Discussions
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/registration" className="nav-link" role="button" aria-haspopup="true"
                              aria-expanded="false">
                            Register
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/login" className="btn btn-outline-success my-2 my-sm-0" type="submit">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>

export default NavBarComponent