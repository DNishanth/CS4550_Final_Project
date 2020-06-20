import React from "react";
import GroupCardComponent from "./GroupCardComponent";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

class GroupsTabComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            watchGroup: {},
            members: [],
            groupLeaderId: '',
            hasGroup: false,
            editingTitle: false,
            title: '',
            userQuery: ""
        }
    }

    componentDidMount() {
        fetch("https://wbdv-team18-final-project.herokuapp.com/api/profile", {
            method: 'POST',
            credentials: "include"
        })
            .then(response => {
                console.log(response)
                return response.json()
            })
            .catch(e => {
            })
            .then(user => {
                if (user != null) {
                    this.setState({
                        user: user
                    })
                    fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${user.id}/group`)
                        .then(response => response.json()).catch(e=> {}).then(group => {
                            if (group != null) {
                            this.setState({
                                watchGroup: group,
                                hasGroup: true,
                                groupLeaderId: group.leaderId
                            })
                            fetch(`https://wbdv-team18-final-project.herokuapp.com/api/groups/${group.id}/users`)
                                .then(response => response.json()).then(members => {
                                this.setState({
                                    members: members
                                })})}
                    })
                }
            })
    }

    createGroup(userId, user) {
        fetch(`https://wbdv-team18-final-project.herokuapp.com/api/groups`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }}).then(response => response.json()).then(watchGroup => {
                fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${userId}/group`, {
                    method: 'PUT',
                    body: JSON.stringify(watchGroup),
                    headers: {
                        'content-type': 'application/json'
                    }})
                    .then(response => response.json()).then(watchGroup => {
                        this.setState({
                            watchGroup: watchGroup,
                            hasGroup: true,
                            groupLeaderId: userId
                        })
            })
        })
    }

    findUser(queryId) {
        fetch(`https://wbdv-team18-final-project.herokuapp.com/api/groups/${this.state.watchGroup.id}/users/${queryId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }}).then(response => response.json()).then(newUser => {
            fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${queryId}/group`, {
                method: 'PUT',
                body: JSON.stringify(this.state.watchGroup),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => response.json()).then(watchGroup => {
                this.setState({
                    watchGroup: watchGroup,
                    userQuery: ""
                })
            }).finally(this.props.history.push("/profile/group"))
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.hasGroup &&
                    <div className="row">
                        <div className="col-6">
                            <div className="float-left">
                                <h4>{this.state.watchGroup.name}</h4>
                            </div>
                            {
                                this.state.groupLeaderId === this.state.user.id &&
                                <button
                                    className="btn ml-1">
                                    <i className="fa fa-pencil"/>
                                </button>
                            }
                        </div>
                        <div className="col-6">
                            {
                                this.state.groupLeaderId === this.state.user.id &&
                                <div className="input-group mb-3">
                                    <input
                                        className="form-control"
                                        type="form-control"
                                        placeholder="Enter User ID"
                                        value={this.state.userQuery}
                                        onChange={e => this.setState(
                                            {userQuery: e.target.value})
                                        }/>
                                    <div className="input-group-append">
                                        <a href="/profile/group">
                                            <button
                                                onClick={() => this.findUser(this.state.userQuery)}
                                                className="btn btn-outline-success">
                                                Add Member
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            }
                            </div>

                        <div className="col-5">
                            <h6>Group Members</h6>
                            <ul className="list-group list-group-flush">
                                {
                                    this.state.members.map(member =>
                                        <li className="list-group-item">
                                            <Link
                                                to={member.id === this.state.user.id ?
                                                    `/profile/watchlist` : `/profile/${member.id}`}>
                                                {
                                                    member.id === this.state.groupLeaderId ? `Group Leader: ` : `Member: `
                                                }
                                                {
                                                        member.id === this.state.user.id ?
                                                        `(You) ${member.username}` : member.username
                                                    }
                                            </Link>
                                            {
                                                this.state.groupLeaderId === this.state.user.id &&
                                                <button className="btn btn-danger btn-sm float-right">
                                                    <i className="fa fa-user-times"/>
                                                </button>
                                            }

                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                        <div className="col-7">
                            <h6>Group Watchlist</h6>
                        </div>
                    </div>
                }
                {
                    !this.state.hasGroup &&
                    <div>
                        <button
                            onClick={() => this.createGroup(
                                this.props.userId, this.state.user)}
                            className="btn btn-secondary mb-2">Create Group
                        </button>
                    </div>
                }
            </div>
        )
    }
}

export default GroupsTabComponent