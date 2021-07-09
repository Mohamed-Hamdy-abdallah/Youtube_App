import React from 'react'
import {Link} from '@reach/router'
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

function Video({title , dateAdded,channel ,thumbnail , description , id}) {
    const timeAgo = new TimeAgo("en-us");
  const DateAdded = new Date(dateAdded);
   
    return (
        <Link to={`/watch/${id}`} className='video-container'>
            <div className='video-image'>
            <img src={thumbnail.url} />
            </div>
            <div className='video-info'>
            <h3>{title}</h3>
            <h5>{timeAgo.format(DateAdded)}</h5>
            <h4>{channel}</h4>
            <p>{description}</p>
            </div>
        </Link>
    )
}

export default Video
