import React from "react";
import {withRouter} from "react-router-dom";
import ShowPosterComponent from "./ShowPosterComponent";
import * as WatchPartyService from "../services/WatchPartyService";
import UserService from "../services/UserService";

class WatchPartyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watchParty: {},
            user: {},
            watchlist: [],
            watchPartyLeaderId: {},
            members: []
        }

    }

    componentDidMount() {
        UserService.getCurrentUser()
            .then(user => {
                    if (user && !user.status) {
                        this.setState({
                            user: user
                        })
                    } else {
                        this.props.history.push("/")
                    }
                }
            ).then(status => {
            WatchPartyService.findWatchPartyById(this.props.match.params.watchPartyId)
                .then(watchParty => {
                    if (watchParty.users.some(u => u.id === this.state.user.id)) {
                        this.setState({
                            watchParty: watchParty,
                            watchlist: watchParty.watchlist,
                            watchPartyLeaderId: watchParty.leaderId,
                            members: watchParty.users
                        })
                    } else {
                        this.props.history.push("/")
                    }
                })
        })
    }

    addToGroup(userId, watchPartyId) {
        UserService.findUser(userId).then(user => {
            console.log(user)
            WatchPartyService.addUserToParty(user, watchPartyId)
                .then(watchParty => {
                    console.log(watchParty)
                })
        })
    }

    removeUser(userId, watchPartyId) {
        WatchPartyService.removeUserFromParty(userId, watchPartyId)
            .then(watchParty => WatchPartyService.removePartyFromUser(userId, watchParty.id))
            .then(watchParty => {
                this.setState({watchParty: watchParty})
                window.location.reload(true)
            })
    }

    render() {
        return (
            <div className="row">
                <div className="col-4">
                    <h1>Other Watch Parties</h1>
                </div>
                <div className="col-8">
                    <h1>{this.state.watchParty.name}</h1>
                    {/*{console.log(this.state.user)}*/}
                    {/*{console.log(this.state.watchParty)}*/}

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
                                <button
                                    onClick={() => this.addToGroup(this.state.userQuery, this.state.watchParty.id)}
                                    className="btn btn-outline-success">
                                    Add Member
                                </button>
                            </div>
                        </div>
                    }
                    <h6>Group Watchlist</h6>

                    <div className="row">
                        {
                            this.state.watchlist.map(show =>
                                <ShowPosterComponent mobileView={true}
                                                     layout={this.props.layout}
                                                     key={show.imdbId}
                                                     _id={show.imdbId}/>
                            )

                        }
                    </div>

                    <h6>Group Members</h6>
                    <ul className="list-group list-group-flush">
                        {
                            this.state.members.map(member =>
                                <li
                                    key={member.id}
                                    className="list-group-item">
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
                                        <span>
                                                        {
                                                            !this.state.editingRole &&
                                                            <button
                                                                onClick={() => this.setState({editingRole: true})}
                                                                className="btn btn-warning btn-sm float-right">
                                                                <i className="fa fa-pencil"/>
                                                            </button>
                                                        }
                                            {
                                                this.state.editingRole &&
                                                <span>
                                                                <button
                                                                    onClick={() => this.setState({editingRole: false})}
                                                                    className="btn btn-success btn-sm float-right">
                                                                        <i className="fa fa-save"/>
                                                                </button>
                                                                <button
                                                                    onClick={() => this.removeUser(member.id, this.state.watchParty.id)}
                                                                    className="btn btn-danger btn-sm float-right">
                                                                        <i className="fa fa-user-times"/>
                                                                </button>
                                                            </span>
                                            }
                                                    </span>
                                    }
                                </li>
                            )
                        }
                    </ul>

                </div>
            </div>
        )
    }
}

export default withRouter(WatchPartyComponent)