import React from "react";
import { Link } from "react-router-dom";
import { createShowDiscussion } from "../services/DiscussionService";
import PrototypeService from "../services/APIService";
import * as WatchPartyService from "../services/WatchPartyService";

export default class SearchRowComponent extends React.Component {
    constructor(props) {
        super(props);
        this.createNewDiscussion = this.createNewDiscussion.bind(this);
    }

    createNewDiscussion = () => createShowDiscussion({
        imdbId: this.props.show.ids.imdb
    });

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
        // if (this.props.watchParty) {
        //     fetch(`http://localhost:8080/api/watch-parties/${this.props.watchParty.id}/shows`, {
        //     // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/watch-parties/${watchParty.id}/shows`, {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             imdbId: this.props.show.ids.imdb
        //         }),
        //         headers: {
        //             'content-type': 'application/json'
        //         }
        //     }).then(response => response.json())
        // }
        alert("Create Modal for Groups")
    }

    render() {
        return (
            <tr key={this.props.show.key}>
                {console.log(this.props.currentUser)}
                {console.log(this.props.watchParties)}
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
                                this.props.hasWatchParty &&
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