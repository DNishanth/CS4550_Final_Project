import React from "react";
import ProgressComponent from "./ProgressComponent";
import PrototypeService from "../services/PrototypeService";

class SummaryCardComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            poster: "",
            title: "",
            description: ""
        }
    }

    componentDidMount() {
        PrototypeService.getIMDBDetails(this.props._id)
            .then(details =>
                this.setState({
                    poster: `https://image.tmdb.org/t/p/w200${details.movie_results[0].poster_path}`,
                    title: details.movie_results[0].title,
                    description: details.movie_results[0].overview
                })
            )
    }

    render() {
        return (
            <div className="card position-fixed w-25 ml-5">

                <div className="card-body" style={{top: 0}}>
                    <div className="form-row">
                        {/*<div className="col-lg-6">*/}
                        <h5 className="card-title">{this.state.title}</h5>
                        <p className="card-text">{this.state.description}</p>
                        {/*</div>*/}
                        {/*<div className="col-lg-6">*/}
                        {/*    <img src={require('../assets/GoldenWind-Promo.png')} className="img-fluid"/>*/}
                        {/*</div>*/}
                    </div>

                    <a href={`/discussions/${this.props._id}`}
                       className="card-link btn btn-primary btn-block mt-2 mb-3">{`Go to Discussion Board`}</a>

                    <ProgressComponent/>
                    {/*<button className="btn btn-outline-warning">Start Watching</button>*/}
                </div>
            </div>
        )
    }
}

export default SummaryCardComponent