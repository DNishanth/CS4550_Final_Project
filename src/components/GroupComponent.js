import React from "react";
import ShowListComponent from "./ShowListComponent";
import SummaryCardComponent from "./SummaryCardComponent";
import ProfileTabsComponent from "./ProfileTabsComponent";
import GenreBadgesComponent from "./GenreBadgesComponent";
import MediaQuery from "react-responsive";
import PostListComponent from "./PostListComponent";
import GroupsTabComponent from "./GroupsTabComponent";

export default class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userRole: '',
            // groupId: this.props.match.params.groupId,

            watchlist: [],
            posts: [],

            showId: this.props.match.params.showId,
            layout: this.props.match.params.layout
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/profile", {
            // fetch("https://wbdv-team18-final-project.herokuapp.com/api/profile", {
            method: 'POST',
            credentials: "include"
        })
            .then(response => {
                console.log(response)
                return response.json()
            })
            .catch(e => {
                this.props.history.push("/")
            })
            .then(user => {
                if (user) {
                    this.setState({
                        userId: user.id,
                        userRole: user.role
                    })
                }
            }).then(status =>
                // fetch(`http://localhost:8080/api/users/${this.state.userId}/shows`)
                fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${this.state.userId}/shows`)
                    .then(response => response.json())
                    .then(watchlist => this.setState({
                        watchlist: watchlist
                    })
                    )
            )

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.showId !== this.props.match.params.showId) {
            this.setState({
                showId: this.props.match.params.showId
            })
        }
        if (prevProps.match.params.layout !== this.props.match.params.layout) {
            this.setState({
                layout: this.props.match.params.layout
            })
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Group Page</h1>
            </div>
        );
    }
}