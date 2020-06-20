import React from "react";
import {Link} from "react-router-dom";
import {createShowDiscussion} from "../services/DiscussionService";
import PrototypeService from "../services/PrototypeService";

export default class SearchRowComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            show: {imdbId: '', userId: ''},
            loggedOut: true
        }

        this.createNewDiscussion = this.createNewDiscussion.bind(this);
    }

    createNewDiscussion = () => createShowDiscussion(this.state.show);

    componentDidMount() {
        fetch("https://wbdv-team18-final-project.herokuapp.com/api/profile", {
            method: 'POST',
            credentials: "include"
        })
            .then(response => {
                return response.json()
            })
            .catch(e => {
            })
            .then(user => {
                if (user != null) {
                    let showId = this.props.show.ids.imdb
                    let userId = user.id
                    this.setState({
                        userId: user.id,
                        show: {imdbId: showId, userId: userId},
                        loggedOut: false
                    })
                } else {
                    this.setState({
                        loggedOut: true
                    })
                }
            })
    }

    addShow = () => {
        fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${this.state.userId}/shows`, {
            method: 'POST',
            body: JSON.stringify(this.state.show),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json());
        
        this.createNewDiscussion();
    }

    render() {
        return (
            <tr key={this.props.show.key}>
                <td className="text-md-left">
                    <Link to={`/result/${this.props.show.ids.imdb}`}>
                        {this.props.show.title}
                    </Link>

                    {
                        !this.state.loggedOut &&
                        <div className="float-right">
                            <button
                                onClick={this.addShow}
                                className="btn btn-outline-primary" type="button">Add Show
                            </button>
                        </div>
                    }
                </td>
            </tr>
        )
    }
}