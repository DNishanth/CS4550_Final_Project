import React from "react";
import { Link } from "react-router-dom";

export default class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            role: '',
            firstName: '',
            lastName: '',
            email: '',

            validation: {
                validUsername: true,
                validPassword: true,
                validRole: true,
                validFirstName: true,
                validLastName: true,
                validEmail: true
            },

            shouldUpdate: true
        }
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

    validate = () => {
        this.setState({
            shouldUpdate: false,
            validation: {
                    validUsername: this.state.username !== "",
                    validPassword: this.state.password !== "",
                    validRole: this.state.role !== "",
                    validFirstName: this.state.firstName !== "",
                    validLastName: this.state.lastName !== "",
                    validEmail: this.state.email !== "",
                }
            }, () => {
            if (this.state.validation.validUsername && this.state.validation.validPassword &&
                this.state.validation.validRole && this.state.validation.validFirstName &&
                this.state.validation.validLastName && this.state.validation.validEmail) {
                this.register()
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form>
                    {
                        this.state.validation.validUsername &&
                        <div className="form-group ">
                            <label htmlFor="usernameInput">Username</label>
                            <input
                                id="usernameInput"
                                placeholder="Username"
                                onChange={(e) => this.setState({ username: e.target.value })}
                                className="form-control" />
                        </div>
                    }
                    {
                        !this.state.validation.validUsername &&
                        <div className="form-group ">
                            <label htmlFor="usernameInput">Username</label>
                            <input
                                id="usernameInput"
                                placeholder="Username"
                                onChange={(e) => this.setState({ username: e.target.value })}
                                className="form-control is-invalid" />
                            <p className="invalid-feedback">Please choose a username</p>
                        </div>
                    }
                    {
                        this.state.validation.validPassword &&
                        <div className="form-group">
                            <label htmlFor="passwordInput">Password</label>
                            <input
                                id="passwordInput"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => this.setState({password: e.target.value})}
                                className="form-control"/>
                        </div>
                    }
                    {
                        !this.state.validation.validPassword &&
                        <div className="form-group">
                            <label htmlFor="passwordInput">Password</label>
                            <input
                                id="passwordInput"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => this.setState({password: e.target.value})}
                                className="form-control is-invalid"/>
                            <p className="invalid-feedback">Please choose a password</p>
                        </div>
                    }
                    {
                        this.state.validation.validRole &&
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
                    }
                    {
                        !this.state.validation.validRole &&
                        <div className="form-group ">
                            <label htmlFor="roleSelect">Role</label>
                            <select
                                id="roleSelect"
                                onChange={(e) => this.setState({ role: e.target.value })}
                                defaultValue={`CHOOSE`}
                                className="custom-select custom-select is-invalid">
                                <option disabled value="CHOOSE"> Choose User Role</option>
                                <option value="LEADER"> Group Leader </option>
                                <option value="MEMBER"> Member </option>
                            </select>
                            <p className="invalid-feedback">Please choose a role</p>
                        </div>
                    }
                    {
                        this.state.validation.validFirstName &&
                        <div className="form-group ">
                            <label htmlFor="firstNameInput">First Name</label>
                            <input
                                id="firstNameInput"
                                placeholder="First Name"
                                onChange={(e) => this.setState({ firstName: e.target.value })}
                                className="form-control" />
                        </div>
                    }
                    {
                        !this.state.validation.validFirstName &&
                        <div className="form-group ">
                            <label htmlFor="firstNameInput">First Name</label>
                            <input
                                id="firstNameInput"
                                placeholder="First Name"
                                onChange={(e) => this.setState({ firstName: e.target.value })}
                                className="form-control is-invalid" />
                            <p className="invalid-feedback">Please provide your first name</p>
                        </div>
                    }
                    {
                        this.state.validation.validLastName &&
                        <div className="form-group ">
                            <label htmlFor="lastNameInput">Last Name</label>
                            <input
                                id="lastNameInput"
                                placeholder="Last Name"
                                onChange={(e) => this.setState({ lastName: e.target.value })}
                                className="form-control" />
                        </div>
                    }
                    {
                        !this.state.validation.validLastName &&
                        <div className="form-group ">
                            <label htmlFor="lastNameInput">Last Name</label>
                            <input
                                id="lastNameInput"
                                placeholder="Last Name"
                                onChange={(e) => this.setState({ lastName: e.target.value })}
                                className="form-control is-invalid" />
                            <p className="invalid-feedback">Please provide your last name</p>
                        </div>
                    }
                    {
                        this.state.validation.validEmail &&
                        <div className="form-group ">
                            <label htmlFor="emailInput">Email</label>
                            <input
                                id="emailInput"
                                placeholder="Email"
                                onChange={(e) => this.setState({ email: e.target.value })}
                                className="form-control" />
                        </div>
                    }
                    {
                        !this.state.validation.validEmail &&
                        <div className="form-group ">
                            <label htmlFor="emailInput">Email</label>
                            <input
                                id="emailInput"
                                placeholder="Email"
                                onChange={(e) => this.setState({ email: e.target.value })}
                                className="form-control is-invalid" />
                            <p className="invalid-feedback">Please provide your email</p>
                        </div>
                    }
                </form>

                <div className="float-left">
                    <button
                        type="submit"
                        onClick={this.validate}
                        className="btn btn-primary">
                        Register
                    </button>
                </div>
                <div className="float-right">
                    <Link to="/login">Sign in</Link>
                </div>
            </div>
        )
    }
}