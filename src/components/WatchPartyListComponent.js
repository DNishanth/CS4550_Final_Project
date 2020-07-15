import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import UserService from "../services/UserService";
import * as WatchPartyService from "../services/WatchPartyService";
import ShowListComponent from "./ShowListComponent";
import ShowPosterComponent from "./ShowPosterComponent";
import MediaQuery from "react-responsive";
import WatchPartyCardComponent from "./WatchPartyCardComponent";

class WatchPartyListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watchParties: []
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
            .then(status => this.findWatchParties(user)/*window.location.reload(true)*/)
    }

    render() {
        return (
            <div>
                <h1>Watch Parties</h1>
                {/*{console.log(this.state.user)}*/}
                {/*{console.log(this.state.watchParties)}*/}
                <div className="row">
                {
                    this.state.watchParties.map(watchParty =>
                        <WatchPartyCardComponent watchParty={watchParty}/>
                        // <h2>{watchParty.name}</h2>
                    )
                }
                </div>
                {
                    <button
                        onClick={() => this.createWatchParty(
                            this.props.userId, this.state.user)}
                        className="btn btn-secondary mb-2">Create Group
                    </button>
                }
            </div>
        )
    }
}

export default WatchPartyListComponent