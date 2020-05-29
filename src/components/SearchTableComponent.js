import React from "react";
import SearchRowComponent from "./SearchRowComponent";


export default class SearchTableComponent
    extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>
                                <label>Results
                                </label>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.shows.map(show =>
                                <SearchRowComponent
                                    key={show.ids.trakt} show={show}/>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}