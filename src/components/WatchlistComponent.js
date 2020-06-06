import React from "react";

export default class WatchlistComponent extends React.Component {
    render() {
        return(
            <div>
                <h1>Watchlist</h1>
                <div className="input-group mb-3">
                    <input
                        className="form-control"
                        type="form-control"
                        placeholder="Search watched shows"/>
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-success">
                            <i className="fa fa-search"/>
                        </button>
                    </div>
                </div>

                <div className="row container">
                    <div className="card" style={{width: 135, marginRight: 10, marginBottom:10}}>
                        <a href="#"><img src={require('../assets/GoldenWind-Promo.png')} className="img-fluid img-responsive"/></a>
                    </div>
                    <div className="card" style={{width: 135, marginRight: 10, marginBottom:10}}>
                        <img src={require('../assets/GoldenWind-Promo.png')} className="img-fluid"/>
                    </div>
                    <div className="card" style={{width: 135, marginRight: 10, marginBottom:10}}>
                        <img src={require('../assets/GoldenWind-Promo.png')} className="img-fluid"/>
                    </div>
                    <div className="card" style={{width: 135, marginRight: 10, marginBottom:10}}>
                        <img src={require('../assets/GoldenWind-Promo.png')} className="img-fluid"/>
                    </div>
                    <div className="card" style={{width: 135, marginRight: 10, marginBottom:10}}>
                        <img src={require('../assets/GoldenWind-Promo.png')} className="img-fluid"/>
                    </div>
                    <div className="card" style={{width: 135, marginRight: 10, marginBottom:10}}>
                        <img src={require('../assets/GoldenWind-Promo.png')} className="img-fluid"/>
                    </div>
                    <div className="card" style={{width: 135, marginRight: 10, marginBottom:10}}>
                        <img src={require('../assets/GoldenWind-Promo.png')} className="img-fluid"/>
                    </div>
                    <div className="card" style={{width: 135, marginRight: 10, marginBottom:10}}>
                        <img src={require('../assets/GoldenWind-Promo.png')} className="img-fluid"/>
                    </div>
                    <div className="card" style={{width: 135, marginRight: 10, marginBottom:10}}>
                        <img src={require('../assets/GoldenWind-Promo.png')} className="img-fluid"/>
                    </div>
                </div>
            </div>
        )
    }
}