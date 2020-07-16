import React from "react";

const GenreBadgesComponent = (props) =>
    <div>
        <a href={`/search/${props.genre}`}
           className="badge badge-secondary bg-info wbdv-favorite-genre-tag">{props.genre}</a>
    </div>

export default GenreBadgesComponent