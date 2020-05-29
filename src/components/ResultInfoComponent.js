import React from "react";

export default class ResultInfoComponent extends React.Component {

    state = {
        result: {title: "a", year: "a", score: "a", }
        // this.props.result
    }

    render() {
        return(
            <div>
                <h3>{this.state.result.title}</h3>
                <h3>{this.state.result.year}</h3>
                <h3>{this.state.result.score}</h3>
            </div>
        )
    }
}