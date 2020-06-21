import React from "react";
import { Link } from "react-router-dom";

export default class Register extends React.Component {
    state = {
        username: '',
        password: '',
        role: 'LEADER',
        firstName: '',
        lastName: '',
        email: ''
    }
    register = () => {
        fetch("http://localhost:8080/api/register", {
            // fetch("https://wbdv-team18-final-project.herokuapp.com/api/register", {
            body: JSON.stringify({
                username: this.state.username, password: this.state.password,
                role: this.state.role, firstName: this.state.firstName,
                lastName: this.state.lastName, email: this.state.email
            }),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            credentials: "include"
        }).then(response => response.json())
            .then(currentUser => this.props.history.push("/profile/watchlist"))
    }

    render() {
        return (
            <div>
                {/* add css padding */}
                <h1>Register</h1>

                <div className="form-group ">
                    <label htmlFor="usernameInput">Username</label>
                    <input
                        id="usernameInput"
                        placeholder="Username"
                        onChange={(e) => this.setState({ username: e.target.value })}
                        className="form-control" />
                </div>

                <div className="form-group ">
                    <label htmlFor="passwordInput">Password</label>
                    <input
                        id="passwordInput"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => this.setState({ password: e.target.value })}
                        className="form-control" />
                </div>

                <div className="form-group ">
                    <label htmlFor="roleSelect">Role</label>
                    <select
                        id="roleSelect"
                        onChange={(e) => this.setState({ role: e.target.value })}
                        defaultValue={`CHOOSE`}
                        className="custom-select custom-select">
                        <option disabled value="CHOOSE"> Choose User Role</option>
                        <option value="LEADER"> Group Leader </option>
                        <option value="MEMBER"> Member </option>
                    </select>
                </div>

                <div className="form-group ">
                    <label htmlFor="firstNameInput">First Name</label>
                    <input
                        id="firstNameInput"
                        placeholder="First Name"
                        onChange={(e) => this.setState({ firstName: e.target.value })}
                        className="form-control" />
                </div>

                <div className="form-group ">
                    <label htmlFor="lastNameInput">Last Name</label>
                    <input
                        id="lastNameInput"
                        placeholder="Last Name"
                        onChange={(e) => this.setState({ lastName: e.target.value })}
                        className="form-control" />
                </div>

                <div className="form-group ">
                    <label htmlFor="emailInput">Email</label>
                    <input
                        id="emailInput"
                        placeholder="Email"
                        onChange={(e) => this.setState({ email: e.target.value })}
                        className="form-control" />
                </div>

                <button
                    onClick={this.register}
                    className="btn btn-primary">
                    Register
                </button>
                <Link to="/login">Sign in</Link>
            </div>
        )
    }
}