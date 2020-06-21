import React from "react";
import DiscussionBoardComponent from "./DiscussionBoardComponent";

export default class ResultInfoComponent extends React.Component {

    componentDidMount() {
        const imdb_id = this.props.match.params.imdb_id
        const tmdb_key = "54fa45f317f011fa4fd57c4d1840485c"
        const tmdb_img_path = "https://image.tmdb.org/t/p/w200"
        fetch(`https://api.themoviedb.org/3/find/${imdb_id}?api_key=${tmdb_key}&language=en-US&external_source=imdb_id`)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.movie_results.length > 0) {
                    this.setState({
                        result: result.movie_results[0],
                        poster_path: tmdb_img_path + result.movie_results[0].poster_path
                    })
                }
                else {
                    this.setState({
                        result: result.tv_results[0],
                        poster_path: tmdb_img_path + result.tv_results[0].poster_path
                    })
                }
            })
    }

    state = {
        result: {},
        poster_path: ""
    }

    render() {
        return (
            <div>
                <h1>
                    {this.state.result.title}
                    {" (" + this.state.result.release_date ? this.state.result.release_date : this.state.result.release_date + ")"}
                </h1>
                <img src={this.state.poster_path} alt="Poster" />
                <h4>
                    {this.state.result.vote_average}
                </h4>
                <p>
                    {this.state.result.overview}
                </p>

                <DiscussionBoardComponent movieID={this.props.match.params.imdb_id} />
            </div>
        )
    }
}