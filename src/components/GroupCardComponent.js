import React from "react";
import { Link } from "react-router-dom";

const GroupCardComponent = (props) =>
    <div className="col-lg-2 mb-4">
        <div className="card text-center"
            id="foundShowContainer">
            {/*src will be the most recently updated show*/}
            <Link
                to={`/groups/${props.group.groupId}`}
                style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <img className="card-img-top img-fluid img-responsive image"
                    src="https://img.freepik.com/free-vector/group-young-people-posing-photo_52683-18823.jpg?size=338&ext=jpg"
                    alt="Card image cap" />
                <div className="card-footer">
                    <h6 className="card-title">${props.group.name}</h6>
                </div>
            </Link>
        </div>
    </div>

export default GroupCardComponent