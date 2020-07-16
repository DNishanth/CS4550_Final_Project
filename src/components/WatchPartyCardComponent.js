import React from "react";
import {Link} from "react-router-dom";

class WatchPartyCardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Link to={`/watch-party/${this.props.watchParty.id}`} style={{textDecoration: 'none', color: 'black'}}>
                <div className="card m-1" id="foundShowContainer" style={{width: 240}}>
                    {/*<span className="badge badge-secondary">New</span>*/}
                    {/*<h5 className="card-header">{this.props.watchParty.name}</h5>*/}
                    <div className="card-body">
                        {
                            this.props.isLeader &&
                            <span className="badge badge-danger w-auto mb-2">Group Leader</span>
                        }
                        {
                            !this.props.isLeader &&
                            <span className="badge badge-info w-auto mb-2">Member</span>
                        }
                        <h5 className="card-title">{this.props.watchParty.name}</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional
                            content.</p>
                        {/*show cards preview*/}
                        {/*members preview*/}
                    </div>
                </div>
            </Link>
        )
    }
}

export default WatchPartyCardComponent