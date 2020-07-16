import React from "react";
import UserService from "../services/UserService";

export const removeShow = function (showId, props) {
    UserService.getCurrentUser().then(user =>
        fetch(`http://localhost:8080/api/users/${user.id}/shows`)
            // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${this.state.userId}/shows`)
            .then(response => response.json())
            .then(watchlist => {
                let selectedShow = watchlist.find(show => show.imdbId === showId)
                console.log(selectedShow)
                fetch(`http://localhost:8080/api/shows/${selectedShow.id}`, {
                    method: 'DELETE'
                }).catch(e => {
                }).then(response => (props.history.push("/profile/watchlist")))
            })
    )
}

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
             style={{height: 25}}>
            <div className="progress-bar progress-bar-striped bg-info progress-bar-animated w-25"
                 role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                <h6 style={{marginTop: 5}}>Episode 32</h6>
            </div>
        </div>

        <div>
            <button className="mt-3 btn btn-sm btn-outline-success float-left">Update Progress</button>
            <button
                onClick={() => removeShow(props.match.params.showId, props)}
                className="mt-3 btn btn-sm btn-outline-danger float-right">
                Remove Show
            </button>
        </div>
    </div>

export default ProgressComponent