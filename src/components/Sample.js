import { Link } from 'react-router-dom';

import "../css/samples.css";

function Sample({ id, name, date, time }) {
    return (
        <div className="box sample">
            <div className="left">
                <h2>{name}</h2>
                <p>{time} on {date}</p>
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
