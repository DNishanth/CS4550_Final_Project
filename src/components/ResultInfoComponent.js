import React from "react";

export default class ResultInfoComponent extends React.Component {

    componentDidMount() {
        const imdb_id = this.props.match.params.imdbID
        const tmdb_key = "54fa45f317f011fa4fd57c4d1840485c"
        const tmdb_img_path = "https://image.tmdb.org/t/p/w200"
        fetch(`https://api.themoviedb.org/3/find/${imdb_id}?api_key=${tmdb_key}&language=en-US&external_source=imdb_id`)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    result: result.movie_results[0],
                    poster_path: tmdb_img_path + result.movie_results[0].poster_path
                })
            })
    }

    state = {
        result: {},
        poster_path: ""
    }

    render() {
        return(
            <div>
                <h1> 
                    {this.state.result.title}
                    {" (" + this.state.result.release_date + ")"}
                </h1>
                <img src={this.state.poster_path}/>
                <h4>
                    {this.state.result.vote_average}
                </h4>
                <p> 
                    {this.state.result.overview}
                </p>
            </div>
        )
    }
}