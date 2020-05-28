import React from "react";
import {Link} from "react-router-dom";
import PrototypeService from "../services/PrototypeService";

export default class SearchRowComponent extends React.Component {
    state = {
        movie: this.props.movie
    }

    render() {
        return (
            <tr key={this.state.movie._id}>
                <td>
                    {this.state.movie.title}
                </td>
            </tr>
        )
    }
}