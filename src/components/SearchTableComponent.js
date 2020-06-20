import React from "react";
import SearchRowComponent from "./SearchRowComponent";


export default class SearchTableComponent
    extends React.Component {
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
                                    key={show.ids.trakt} show={show} currentUser={this.props.currentUser}/>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}