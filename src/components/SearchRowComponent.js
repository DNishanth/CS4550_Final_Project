import React from "react";
import {Link} from "react-router-dom";
import PrototypeService from "../services/PrototypeService";

export default class SearchRowComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            show: {imdbId: '', userId: ''}
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
                alert(e)
                // this.props.history.push("/")
            })
            .then(user => {
                if (user) {
                    let showId = this.props.show.ids.imdb
                    let userId = user.id
                    this.setState({
                        userId: user.id,
                        show: {imdbId: showId, userId: userId}
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
        }).then(response => response.json())

        console.log(this.state.watchlist)
    }

    render() {
        return (
            <tr key={this.props.show.key}>
                <td className="text-md-left">
                    <Link to={`/result/${this.props.show.ids.imdb}`}>
                        {this.props.show.title}
                    </Link>
                    <div className="float-right">
                        <button
                            onClick={this.addShow}
                            className="btn btn-outline-primary" type="button">Add Show
                        </button>
                    </div>
                </td>
            </tr>
        )
    }
}