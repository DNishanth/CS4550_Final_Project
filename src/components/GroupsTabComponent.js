import React from "react";
import GroupCardComponent from "./GroupCardComponent";
import {Link} from "react-router-dom";

class GroupsTabComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            watchGroup: {},
            members: [],
            hasGroup: false,
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
            })
            .then(user => {
                if (user != null) {
                    this.setState({
                        user: user
                    })
                    fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${user.id}/group`)
                        .then(response => response.json()).catch(e=> {}).then(group => {
                            if (group != null) {
                            this.setState({
                                watchGroup: group,
                                hasGroup: true
                            })
                            console.log(this.state.watchGroup)

                            fetch(`https://wbdv-team18-final-project.herokuapp.com/api/groups/${group.id}/users`)
                                .then(response => response.json()).then(members => {
                                this.setState({
                                    members: members
                                })})}
                    })
                }
            })
    }

    createGroup(userId, user) {
        fetch(`https://wbdv-team18-final-project.herokuapp.com/api/groups`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }}).then(response => response.json()).then(watchGroup => {
                console.log(watchGroup)
                fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${userId}/group`, {
                    method: 'PUT',
                    body: JSON.stringify(watchGroup),
                    headers: {
                        'content-type': 'application/json'
                    }})
                    .then(response => response.json()).then(watchGroup => {
                        console.log(watchGroup)
                        this.setState({
                            watchGroup: watchGroup,
                            hasGroup: true
                        })
            })
        })
    }

    render() {
        return (
            <div>
                {console.log(this.state)}
                {/*{console.log(this.state.watchGroup)}*/}
                {
                    this.state.hasGroup &&
                    <div>
                        <h1>{this.state.watchGroup.name}</h1>
                        <ul>{this.state.members.map(member => <li>{member.username}</li>)}</ul>
                    </div>
                }
                {
                    !this.state.hasGroup &&
                    <div>
                        <button
                            onClick={() => this.createGroup(
                                this.props.userId, this.state.user)}
                            className="btn btn-secondary mb-2">Create Group
                        </button>
                    </div>
                }
            </div>
        )
    }
}

export default GroupsTabComponent