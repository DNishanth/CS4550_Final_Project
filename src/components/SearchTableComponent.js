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
                            <th className="wbdv-header wbdv-title">
                                <label>Results
                                </label>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.movies.map(movie =>
                                <SearchRowComponent
                                    key={movie.ids.trakt}  movie={movie}/>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}