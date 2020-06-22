import React from "react";
import { Link } from "react-router-dom";

export default class LoginComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",

            validUsername: true,
            validPassword: true,
            invalidCredentials: false
        }
    }


    login = () => {
        // fetch("https://wbdv-team18-final-project.herokuapp.com/api/login", {
        fetch("http://localhost:8080/api/login", {
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            credentials: "include"
        }).then(response => response.json())
            .catch(e => {
                this.setState({
                    invalidCredentials: true
                })
                this.props.history.push("/login")
            })
            .then(currentUser => {
                if (currentUser)
                    this.props.history.push("/profile/watchlist")
            })
    }

    validate = () => {
        this.setState({
            validUsername: this.state.username !== "",
            validPassword: this.state.password !== "",
        }, () => {
            if (this.state.validUsername && this.state.validPassword)
                this.login()
            })
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form>

                    {
                        this.state.invalidCredentials &&
                        <p className="text-danger mt-3 mb-1">Invalid Credentials</p>
                    }
                    {
                        this.state.validUsername &&
                        <div className="form-group">
                            <label htmlFor="usernameInput">Username</label>
                            <input
                                id="usernameInput"
                                className="form-control"
                                placeholder="Enter Username"
                                onChange={(e) => this.setState({ username: e.target.value })} />
                        </div>
                    }
                    {
                        !this.state.validUsername &&
                        <div className="form-group">
                            <label htmlFor="usernameInput">Username</label>
                            <input
                                id="usernameInput"
                                className="form-control is-invalid"
                                placeholder="Enter Username"
                                onChange={(e) => this.setState({ username: e.target.value })} />
                            <p className="invalid-feedback">Invalid Username</p>
                        </div>
                    }
                    {
                        this.state.validPassword &&
                        <div className="form-group">
                            <label htmlFor="passwordInput">Password</label>
                            <input
                                type="password"
                                required
                                id="passwordInput"
                                className="form-control"
                                placeholder="Enter Password"
                                onChange={(e) => this.setState({ password: e.target.value })} />
                        </div>
                    }
                    {
                        !this.state.validPassword &&
                        <div className="form-group">
                            <label htmlFor="passwordInput">Password</label>
                            <input
                                type="password"
                                required
                                id="passwordInput"
                                className="form-control is-invalid"
                                placeholder="Enter Password"
                                onChange={(e) => this.setState({ password: e.target.value })} />
                            <p className="invalid-feedback">Invalid Password</p>
                        </div>
                    }
                </form>

                <div className="float-left">
                <button
                    onClick={this.validate}
                    className="btn btn-primary">
                    Login
                </button>
                </div>
                <div className="float-right">
                    <Link to="/registration">Sign up</Link>
                </div>
            </div>
        )
    }
}