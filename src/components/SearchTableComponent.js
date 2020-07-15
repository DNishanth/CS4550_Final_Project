import React from "react";
import SearchRowComponent from "./SearchRowComponent";
import * as WatchPartyService from "../services/WatchPartyService";


export default class SearchTableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasWatchParty: false,
            watchParties: []
        }
    }

    componentDidMount() {
        if (this.props.currentUser) {
            WatchPartyService.findUsersWatchParties(this.props.currentUser).then(
                watchParties => {
                    this.setState({
                        watchParties: watchParties,
                        hasWatchParty:
                            typeof watchParties !== "undefined" &&
                            this.props.currentUser.role === "LEADER"
                    })
                })
        } else {
            this.setState({
                hasWatchParty: false
            })
        }
    }

    render() {
        return (
            <div /*className="row"*/>
                {/*<div className="col-3">*/}
                {/*    <div style={{height: 1000 }} className="border">Maybe the filter stuff</div>*/}
                {/*</div>*/}
                <div /*className="col-9"*/>
                    <table className="table table-striped table-hover
                table-bordered">
                        <thead>
                            <tr>
                                <th className="text-md-left">
                                    <label>Results
                                </label>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.shows.map(show =>
                                    <SearchRowComponent
                                        key={show.ids.trakt} show={show}
                                        hasWatchParty={this.state.hasWatchParty}
                                        watchParties={this.state.watchParties}
                                        currentUser={this.props.currentUser} />
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}