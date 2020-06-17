import React from "react";
import { Link } from "react-router-dom";

export default class Register extends React.Component {
    state = {
        username: '',
        password: '',
        role: '',
        firstname: '',
        lastName: '',
        email: ''
    }
    register = () => {
        fetch("https://wbdv-team18-final-project.herokuapp.com/api/register", {
            body: JSON.stringify({ 
                username: this.state.username, password: this.state.password, 
                role: this.state.role, firstname: this.state.firstname, 
                lastName: this.state.lastName, email: this.state.email }),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            credentials: "include"
        }).then(response => response.json())
            .then(currentUser => this.props.history.push("/profile"))
    }
    render() {
        return (
            <div>
                {/* add css padding */}
                <h1>Register</h1>
                <input
                    placeholder="Username"
                    onChange={(e) => this.setState({ username: e.target.value })}
                    className="form-control" />
                <input
                    placeholder="Password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                    className="form-control" />
                {/* switch to radio buttons for role */}
                <input
                    placeholder="Role"
                    onChange={(e) => this.setState({ role: e.target.value })}
                    className="form-control" />
                <input
                    placeholder="First Name"
                    onChange={(e) => this.setState({ firstname: e.target.value })}
                    className="form-control" />
                <input
                    placeholder="Last Name"
                    onChange={(e) => this.setState({ lastName: e.target.value })}
                    className="form-control" />
                <input
                    placeholder="Email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                    className="form-control" />
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