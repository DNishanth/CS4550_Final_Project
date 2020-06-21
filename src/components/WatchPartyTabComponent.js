import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class WatchPartyTabComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            watchParty: {},
            members: [],
            watchPartyLeaderId: '',
            hasGroup: false,
            editingTitle: false,
            title: '',
            userQuery: "",
            groupQuery: ""
        }
    }

    componentDidMount() {
        // fetch("https://wbdv-team18-final-project.herokuapp.com/api/profile", {
        fetch("http://localhost:8080/api/profile", {
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
                    fetch(`http://localhost:8080/api/users/${user.id}/watch-party`)
                    // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${user.id}/watch-party`)
                        .then(response => response.json()).catch(e=> {}).then(watchParty => {
                            if (watchParty != null) {
                            this.setState({
                                watchParty: watchParty,
                                hasGroup: true,
                                watchPartyLeaderId: watchParty.leaderId
                            })
                            fetch(`http://localhost:8080/api/watch-parties/${watchParty.id}/users`)
                            // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/watch-parties/${watchParty.id}/users`)
                                .then(response => response.json()).then(members => {
                                this.setState({
                                    members: members
                                })})}
                    })
                }
            })
    }

    createGroup(userId, user) {
        fetch(`http://localhost:8080/api/watch-parties`, {
        // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/watch-parties`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }}).then(response => response.json()).then(watchParty => {
                fetch(`http://localhost:8080/api/users/${userId}/watch-party`, {
                // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${userId}/watch-party`, {
                    method: 'PUT',
                    body: JSON.stringify(watchParty),
                    headers: {
                        'content-type': 'application/json'
                    }})
                    .then(response => response.json()).then(watchParty => {
                        this.setState({
                            watchParty: watchParty,
                            hasGroup: true,
                            watchPartyLeaderId: userId
                        })
            })
        })
    }

    addToGroup(userId, watchPartyId) {
        console.log(`${userId} ${watchPartyId}`)
        // fetch(`http://localhost:8080/api/watch-parties/${watchPartyId}/users/${userId}`, {
        fetch(`https://wbdv-team18-final-project.herokuapp.com/api/watch-parties/${watchPartyId}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }}).then(response => response.json()).then(watchParty => {
            fetch(`http://localhost:8080/api/users/${userId}/watch-party`, {
            // console.log(watchParty)
            // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${userId}/watch-party`, {
                method: 'PUT',
                body: JSON.stringify(watchParty),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => response.json()).then(watchParty => {
                this.setState({
                    watchParty: watchParty,
                    userQuery: ""
                })
            }).finally(this.props.history.push("/profile/watch-party"))
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.hasGroup &&
                    <div className="row">
                        <div className="col-6">
                            {
                                this.state.watchPartyLeaderId === this.state.user.id &&
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
                                        <a href="/profile/watch-party">
                                            <button
                                                onClick={() => this.addToGroup(this.state.userQuery, this.state.watchParty.id)}
                                                className="btn btn-outline-success">
                                                Add Member
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            }
                            <h6>Group Watchlist</h6>
                        </div>
                        <div className="col-5">
                            <h6>Group Members</h6>
                            <ul className="list-group list-group-flush">
                                {
                                    this.state.members.map(member =>
                                        <li className="list-group-item">
                                            <a
                                                href={member.id === this.state.user.id ?
                                                    `/profile/watchlist` : `/profile/${member.id}`}>
                                                {
                                                    member.id === this.state.watchPartyLeaderId ? `Group Leader: ` : `Member: `
                                                }
                                                {
                                                    member.id === this.state.user.id ?
                                                        `(You) ${member.username}` : member.username
                                                }
                                            </a>
                                            {
                                                this.state.watchPartyLeaderId === this.state.user.id &&
                                                <button className="btn btn-danger btn-sm float-right">
                                                    <i className="fa fa-user-times"/>
                                                </button>
                                            }

                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                }
                {
                    !this.state.hasGroup &&
                    <div>
                        {
                            this.state.user.role === "LEADER" &&
                            <button
                            onClick={() => this.createGroup(
                            this.props.userId, this.state.user)}
                            className="btn btn-secondary mb-2">Create Group
                            </button>
                        }
                        {
                            this.state.user.role === "MEMBER" &&
                            <div className="input-group mb-3">
                                <input
                                    className="form-control"
                                    type="form-control"
                                    placeholder="Enter Group ID"
                                    value={this.state.groupQuery}
                                    onChange={e => this.setState(
                                        {groupQuery: e.target.value})
                                    }/>
                                <div className="input-group-append">
                                    <a href="/profile/watch-party">
                                        <button
                                            onClick={() => this.addToGroup(this.props.userId, this.state.groupQuery)}
                                            className="btn btn-secondary mb-2">Join Group
                                        </button>
                                    </a>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default WatchPartyTabComponent