import { Link } from 'react-router-dom';

import "../css/samples.css";

function Sample({ id, datetime, recording_data }) {
    let date = new Date(datetime);
    let hours = date.getHours();
    hours = hours % 12;
    hours = hours ? hours : 12;
    let time = `${hours}:${date.getMinutes()} ${date.getHours() >= 12 ? "pm" : "am"}`;
    let dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    return (
        <div className="box sample">
            <div className="left">
                <h2>{recording_data.name}</h2>
                <p>{time} on {dateString}</p>
            </div>
            <div className="right">
                <Link to={`share/${id}`} className="primary">Share</Link>
                <Link to={`preview/${id}`} className="primary">Preview</Link>
                <Link to={`edit/${id}`} className="secondary">Edit</Link>
            </div>
        </div>
    );
}

export default Sample;
