import React from "react";

const ProgressComponent = (props) =>
    <div>
        <div className="form-row">
            <div className="col-8">
                <h5 className="text-left">Progress</h5>
            </div>
            <div className="col-4">
                <h6 style={{marginTop: 5}} className="text-right text-muted">156 Episodes</h6>
            </div>
        </div>
        <div className="progress"
             style={{height: 25}}>
            <div className="progress-bar progress-bar-striped bg-info progress-bar-animated w-25"
                 role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                <h6 style={{marginTop: 5}}>Episode 32</h6>
            </div>
        </div>

        <button style={{marginTop: 10}} className="btn btn-sm btn-outline-danger float-right">Update Progress</button>
    </div>

export default ProgressComponent