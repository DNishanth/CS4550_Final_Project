import React from "react";
import {Link} from "react-router-dom";
import PrototypeService from "../services/PrototypeService";

export default class SearchRowComponent extends React.Component {

    render() {
        return (
            <tr key={this.props.movie.key}>
                <td>
                    {this.props.movie.title}
                    {console.log(this.props.movie.title)}
                </td>
            </tr>
        )
    }
}