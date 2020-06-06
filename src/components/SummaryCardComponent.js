import React from "react";

const SummaryCardComponent = (props) =>
    <div className="card position-fixed" style={{width: 425, height: 450}}>

        <div className="card-body" style={{top: 0}}>

            <div className="form-row">
                <div className="col">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">The story of the Joestar family,
                        who are possessed with intense psychic strength,
                        and the adventures each member encounters throughout their lives.</p>
                </div>
                <div className="col">
                    <img src={require('../assets/GoldenWind-Promo.png')} className="img-fluid"/>
                </div>
            </div>

            <br/>
            <a href="#" className="card-link btn btn-primary btn-block">{`Go to ${props.title}'s Discussion Board`}</a>

            <br/>
            <div className="form-row">
                <div className="col-8">
                    <h5 className="text-left">Progress</h5>
                </div>
                <div className="col-4">
                    <h6 className="text-right text-muted">156 Episodes</h6>
                </div>
            </div>

            <div className="progress"
                 style={{height: 30}}>
                <div className="progress-bar progress-bar-striped bg-info progress-bar-animated w-25"
                     role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <h6>Episode 32</h6>
                </div>
            </div>

            <button className="btn btn-sm btn-outline-danger float-right">Update Progress</button>
        </div>
    </div>

export default SummaryCardComponent