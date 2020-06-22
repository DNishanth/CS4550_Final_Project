import React from "react";
import { Link } from "react-router-dom";

export default class LoginComponent extends React.Component {
    state = {
        username: '',
        password: ''
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
                this.props.history.push("/login")
            })
            .then(currentUser => {
                if (currentUser)
                    this.props.history.push("/profile/watchlist")
            })

    }

    render() {
        return (
            <div>
                <h1>Login</h1>

                <form>
                    <div className="form-group">
                        <label htmlFor="usernameInput">Username</label>
                        <input
                            required
                            id="usernameInput"
                            className="form-control"
                            placeholder="Enter Username"
                            onChange={(e) => this.setState({ username: e.target.value })} />
                    </div>

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
                </form>

                <button
                    onClick={this.login}
                    className="btn btn-primary">
                    Login
                </button>
                <Link to="/registration">Sign up</Link>
            </div>
        )
    }
}