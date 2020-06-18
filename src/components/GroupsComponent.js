import React from "react";
import GroupCardComponent from "./GroupCardComponent";

class GroupsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
                <div className="row">
                    <GroupCardComponent/>
                    <GroupCardComponent/>
                    <GroupCardComponent/>
                    <GroupCardComponent/>
                    <GroupCardComponent/>
                    <GroupCardComponent/>
                    <GroupCardComponent/>
                    <GroupCardComponent/>
                </div>
        )
    }
}

export default GroupsComponent