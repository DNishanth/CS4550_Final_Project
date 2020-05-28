import React from "react";
import PrototypeService from "../services/PrototypeService";

export default class Prototype extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_query: ""
        };
      }

    findMovies = (query) => {
        PrototypeService.findMovies(query)
            .then(movies =>
                this.setState( {
                    movies: movies
                }))}

    render() {
        return (
            <div>
                <input 
                    type="form-control"
                    placeholder="Search shows and movies"
                    value={this.state.search_query}
                    onChange={e => this.setState({search_query: e.target.value})}/>
                <button
                    onClick={() => this.findMovies(this.state.search_query)}>
                        <i className="fa fa-search"> </i>
                </button>
                {console.log(this.state.movies)}
            </div>
        )
    }
}