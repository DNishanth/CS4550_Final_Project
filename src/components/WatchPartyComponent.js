import React from "react";
import {Link} from "react-router-dom";

class WatchPartyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-4">
                    <h1>Other Watch Parties</h1>
                </div>
                <div className="col-8">
                    <h1>Current Watch Party</h1>
                </div>
            </div>
        )
    }
}

export default WatchPartyComponent