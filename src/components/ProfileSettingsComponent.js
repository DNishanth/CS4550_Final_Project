import React from "react";
import { Link } from "react-router-dom";

class ProfileSettingsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            role: '',
            firstName: '',
            lastName: '',
            email: ''
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/profile", {
            // fetch("https://wbdv-team18-final-project.herokuapp.com/api/profile", {
            method: 'POST',
            credentials: "include"
        })
            .then(response => {
                console.log(response)
                return response.json()
            })
            .catch(e => {
                this.props.history.push("/")
            })
            .then(user => {
                if (user)
                    this.setState({
                        username: user.username, password: user.password,
                        role: user.role, firstName: user.firstName,
                        lastName: user.lastName, email: user.email
                    })
            })
    }

    update = () => {
        fetch("http://localhost:8080/api/profile", {
            // fetch("https://wbdv-team18-final-project.herokuapp.com/api/profile", {
            body: JSON.stringify({
                username: this.state.username, password: this.state.password,
                role: this.state.role, firstName: this.state.firstName, lastName:
                    this.state.lastName, email: this.state.email
            }),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT',
            credentials: "include"
        })
            .then(response => response.json())
            .then(user => this.setState({
                username: user.username, password: user.password
            }))
    }

    render() {
        return (
            <div>
                {/*<div className="alert alert-success wbdv-message">*/}
                {/*    <strong>Success!</strong> Changes saved successfully.*/}
                {/*</div>*/}

                <div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"
                            htmlFor="username"> Username </label>
                        <div className="col-sm-10">
                            <input id="username"
                                type="text"
                                readOnly
                                className="form-control wbdv-field wbdv-username"
                                placeholder={this.state.username}
                                value={this.state.username} />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"
                            htmlFor="password"> Password </label>
                        <div className="col-sm-10">
                            <input id="password"
                                type="password"
                                value={this.state.password}
                                className="form-control wbdv-field wbdv-password" />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"
                            htmlFor="role"> Role </label>
                        <div className="col-sm-10">
                            <select className="form-control wbdv-field wbdv-role" disabled={true} id="role">
                                <option selected={this.state.role === "LEADER"} value="LEADER">Group Leader</option>
                                <option selected={this.state.role === "MEMBER"} value="MEMBER">Member</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"
                            htmlFor="firstName"> First Name </label>
                        <div className="col-sm-10">
                            <input id="firstName"
                                type="text"
                                value={this.state.firstName}
                                className="form-control wbdv-field" />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"
                            htmlFor="lastName"> Last Name </label>
                        <div className="col-sm-10">
                            <input id="lastName"
                                type="text"
                                value={this.state.lastName}
                                className="form-control wbdv-field" />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"
                            htmlFor="email"> Email </label>
                        <div className="col-sm-10">
                            <input id="email"
                                type="email"
                                value={this.state.email}
                                className="form-control wbdv-field wbdv-email" />
                        </div>
                    </div>
                </div>

                <br />

                <a className="btn btn-danger wbdv-button wbdv-update" href="/profile/watchlist">
                    Back To Profile
                </a>
                {/*disabled if no changes*/}
                <button
                    onClick={this.update}
                    className="btn btn-success float-right wbdv-button wbdv-update">
                    Update Profile
                </button>
            </div>
        )
    }
}


export default ProfileSettingsComponent