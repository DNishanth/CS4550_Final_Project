import React from "react";
import {Link} from "react-router-dom";
import PrototypeService from "../services/PrototypeService";

export default class SearchRowComponent extends React.Component {

    render() {
        return (
            <tr key={this.props.show.key}>
                <td>
                <Link to={`/result/${this.props.show.ids.imdb}`}>
                    {this.props.show.title}
                </Link>
                    {console.log(this.props.show.title)}
                </td>
            </tr>
        )
    }
}