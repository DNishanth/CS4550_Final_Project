import React from "react";
import GroupCardComponent from "./GroupCardComponent";

class GroupsTabComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    createGroup(userId) {
        fetch(`https://wbdv-team18-final-project.herokuapp.com/api/groups`, {
            method: 'POST',
            body: JSON.stringify({leaderId: userId, name: "New Group"}),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
    }

    render() {
        return (
            <div>
                <div className="row col-10 float-left">
                    {
                        this.props.groups.map(group =>
                        <GroupCardComponent group={group}/>)
                    }
                </div>
                <div className="col-2 float-right">
                    <button
                        onClick={() => this.createGroup(this.props.userId)}
                        className="btn btn-secondary mb-2">Create Group
                    </button>
                </div>
            </div>
        )
    }
}

export default GroupsTabComponent