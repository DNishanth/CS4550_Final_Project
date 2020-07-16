import React from "react";
import UserService from "../services/UserService";
import * as WatchPartyService from "../services/WatchPartyService";
import WatchPartyCardComponent from "./WatchPartyCardComponent";

class WatchPartyListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watchParties: [],
            groupQuery: ""
        }
    }

    componentDidMount() {
        UserService.getCurrentUser().then()
            .then(user => {
                if (user != null) {
                    this.setState({
                        user: user
                    })
                    this.findWatchParties(user)
                }
            })
    }

    findWatchParties(user) {
        WatchPartyService.findUsersWatchParties(user)
            .then(watchParties => {
                if (watchParties != null) {
                    this.setState({
                        watchParties: watchParties,
                    })
                }
            })
    }

    createWatchParty(userId, user) {
        WatchPartyService.createWatchParty(user)
            .then(watchParty => {
                this.addToGroup(user, watchParty.id)
            })
    }

    addToGroup(user, watchPartyId) {
        WatchPartyService.addUserToParty(user, watchPartyId)
            .then(status => {
                this.findWatchParties(user)
            })
    }

    render() {
        return (
            <div>
                <h1>Watch Parties</h1>
                {/*{console.log(this.state.user)}*/}
                {/*{console.log(this.state.watchParties)}*/}
                {
                    <button
                        onClick={() => this.createWatchParty(
                            this.props.userId, this.state.user)}
                        className="btn btn-secondary mb-2">Create Group
                    </button>
                }
                {
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
                            <button
                                onClick={() => this.addToGroup(this.state.user, this.state.groupQuery)}
                                className="btn btn-secondary mb-2">Join Group
                            </button>
                        </div>
                    </div>
                }
                <div className="row">
                    {
                        this.state.watchParties.map(watchParty =>
                            <WatchPartyCardComponent isLeader={this.props.userId === watchParty.leaderId}
                                                     watchParty={watchParty}/>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default WatchPartyListComponent