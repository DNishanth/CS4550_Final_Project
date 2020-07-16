import React from "react";
import UserService from "../services/UserService";


class ProfileSettingsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            updatedUser: {
                username: '',
                password: '',
                role: '',
                firstName: '',
                lastName: '',
                email: ''
            }
        }
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    getCurrentUser = () => UserService.getCurrentUser().then(response => {
        this.setState({
            user: response
        })
    });

    updateUser = () => UserService.updateUser(this.state.user.id, this.state.user).then(response => {
        console.log("update called returned below")
        console.log(response);
    });

    componentDidMount() {
        this.getCurrentUser();
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
                                   placeholder="Edit Username"
                                   defaultValue={this.state.user.username || ''}/>
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
                                   onChange={e => this.setState({
                                       user: {...this.state.user, password: e.target.value}
                                   })}
                                   defaultValue={this.state.user.password || ''}
                                   placeholder="Edit Password"
                                   className="form-control wbdv-field wbdv-password"/>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"
                               htmlFor="role"> Role </label>
                        <div className="col-sm-10">
                            <select className="form-control wbdv-field wbdv-role"
                                    id="role"
                                    defaultValue={this.state.user.role}
                                    onChange={e => this.setState({
                                        user: {...this.state.user, role: e.target.value}
                                    })}>
                                <option value="LEADER">Group Leader</option>
                                <option value="MEMBER">Member</option>
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
                                   placeholder="Edit First Name"
                                   defaultValue={this.state.user.firstName || ''}
                                   onChange={e => this.setState({
                                       user: {...this.state.user, firstName: e.target.value}
                                   })}
                                   className="form-control wbdv-field"/>
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
                                   placeholder="Edit Last Name"
                                   defaultValue={this.state.user.lastName || ''}
                                   onChange={e => this.setState({
                                       user: {...this.state.user, lastName: e.target.value}
                                   })}
                                   className="form-control wbdv-field"/>
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
                                   placeholder="Edit Email"
                                   defaultValue={this.state.user.email || ''}
                                   onChange={e => this.setState({
                                       user: {...this.state.user, email: e.target.value}
                                   })}
                                   className="form-control wbdv-field wbdv-email"/>
                        </div>
                    </div>
                </div>

                <br/>

                <a className="btn btn-danger wbdv-button wbdv-update" href="/profile/watchlist">
                    Back To Profile
                </a>
                {/*disabled if no changes*/}
                <button
                    onClick={this.updateUser}
                    // onClick={() => console.log(this.state.user)}
                    className="btn btn-success float-right wbdv-button wbdv-update">
                    Update Profile
                </button>
            </div>
        )
    }
}


export default ProfileSettingsComponent