import React from "react";
import { Link } from "react-router-dom";
import { createShowDiscussion } from "../services/DiscussionService";
import PrototypeService from "../services/APIService";
import * as WatchPartyService from "../services/WatchPartyService";

export default class SearchRowComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            show: { imdbId: '', userId: '' },
            loggedOut: true,
            hasWatchParty: false,
            watchParty: {}
        }

        this.createNewDiscussion = this.createNewDiscussion.bind(this);
    }

    createNewDiscussion = () => createShowDiscussion({
        imdbId: this.props.show.ids.imdb
    });

    componentDidMount() {
        if (this.props.currentUser) {
            WatchPartyService.findUserWatchParty(this.props.currentUser).then(
                watchParty => {
                    this.setState({
                            watchParty: watchParty,
                            hasWatchParty:
                                typeof watchParty !== "undefined" &&
                                this.props.currentUser.role === "LEADER"
                    })
                })
        } else {
            this.setState({
                hasWatchParty: false
            })
        }
    }

    addShow = () => {
        fetch(`http://localhost:8080/api/users/${this.props.currentUser.id}/shows`, {
            // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${this.props.currentUser.id}/shows`, {
            method: 'POST',
            body: JSON.stringify({
                imdbId: this.props.show.ids.imdb
            }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json());
    }

    addShowToGroup = (user) => {
        if (this.state.watchParty) {
            fetch(`http://localhost:8080/api/watch-parties/${this.state.watchParty.id}/shows`, {
            // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/watch-parties/${watchParty.id}/shows`, {
                method: 'POST',
                body: JSON.stringify({
                    imdbId: this.props.show.ids.imdb
                }),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => response.json())
        }
    }

    render() {
        return (
            <tr key={this.props.show.key}>
                {console.log(this.props.currentUser)}
                {console.log(this.state.watchParty)}
                <td className="text-md-left">
                    <Link to={`/result/${this.props.show.ids.imdb}`}>
                        {this.props.show.title}
                    </Link>

                    {
                        this.props.currentUser &&
                        <div className="float-right">
                            <button
                                onClick={this.addShow}
                                className="btn btn-outline-primary" type="button">Add Show
                            </button>
                            {
                                this.state.hasWatchParty &&
                                <button
                                    onClick={() => this.addShowToGroup(this.props.currentUser)}
                                    className="btn btn-outline-primary" type="button">Add Show To Group
                                </button>
                            }
                        </div>
                    }
                </td>
            </tr>
        )
    }
}