import React from "react";

const ProgressComponent = (props) =>
    <div>
        <div className="form-row">
            <div className="col-8">
                <h5 className="text-left">Progress</h5>
            </div>
            <div className="col-4">
                <h6 className="text-right text-muted mt-2">156 Episodes</h6>
            </div>
        </div>
        <div className="progress"
            style={{ height: 25 }}>
            <div className="progress-bar progress-bar-striped bg-info progress-bar-animated w-25"
                role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                <h6 style={{ marginTop: 5 }}>Episode 32</h6>
            </div>
        </div>

        <div>
            <button className="mt-3 btn btn-sm btn-outline-success float-left">Update Progress</button>
            <button className="mt-3 btn btn-sm btn-outline-danger float-right">Remove Show</button>
        </div>
    </div>

export default ProgressComponent