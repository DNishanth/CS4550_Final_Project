import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import UserService from "../services/UserService";
import * as WatchPartyService from "../services/WatchPartyService";
import ShowListComponent from "./ShowListComponent";
import ShowPosterComponent from "./ShowPosterComponent";
import MediaQuery from "react-responsive";

class WatchPartyTabComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            watchParty: {},
            members: [],
            watchlist: [],
            watchPartyLeaderId: '',
            hasGroup: false,
            userQuery: "",
            groupQuery: "",
            editingRole: false
        }
    }

    componentDidMount() {
        UserService.getCurrentUser().then()
            .then(user => {
                if (user != null) {
                    this.setState({
                        user: user
                    })
                    WatchPartyService.findUserWatchParty(user)
                        .then(watchParty => {
                            if (watchParty != null) {
                                this.setState({
                                    watchParty: watchParty,
                                    hasGroup: true,
                                    watchPartyLeaderId: watchParty.leaderId
                                })
                                WatchPartyService.findWatchPartyMembers(watchParty)
                                    .then(members => {this.setState({
                                        members: members
                                    })})
                                WatchPartyService.findWatchPartyWatchlist(watchParty)
                                    .then(watchlist => {this.setState({
                                        watchlist: watchlist
                                    })})
                            }
                    })
                }
            })
    }

    createWatchParty(userId, user) {
        WatchPartyService.createWatchParty(user)
            .then(watchParty => {
                this.addToGroup(userId, watchParty.id)
            })
    }

    addToGroup(userId, watchPartyId) {
        WatchPartyService.findWatchPartyById(watchPartyId)
            .then(watchParty =>
                WatchPartyService.addPartyToUser(userId, watchParty)
                .then(watchParty =>
                    this.setState({
                        watchParty: watchParty,
                    })
                ).then(status => UserService.findUser(userId)).then(user => window.location.reload(true)))
    }

    removeUser(userId, watchPartyId) {
        WatchPartyService.removeUserFromParty(userId, watchPartyId)
            .then(watchParty => WatchPartyService.removePartyFromUser(userId, watchParty.id))
            .then(watchParty => {this.setState({watchParty: watchParty})
                window.location.reload(true)})
    }

    render() {
        return (
            <div>
                {/*{console.log(this.state)}*/}
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
                                {console.log(this.state.watchlist)}
                            </div>
                        </div>
                        <div className="col-5">
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
                                                                    onClick={()=> this.setState({editingRole: false})}
                                                                    className="btn btn-success btn-sm float-right">
                                                                        <i className="fa fa-save"/>
                                                                </button>
                                                                <button
                                                                    onClick={()=> this.removeUser(member.id, this.state.watchParty.id)}
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
                }
                {
                    !this.state.hasGroup &&
                    <div>
                        {
                            this.state.user.role === "LEADER" &&
                            <button
                            onClick={() => this.createWatchParty(
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