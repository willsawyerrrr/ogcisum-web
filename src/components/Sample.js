import { Link } from 'react-router-dom';

import { preview } from "../music/preview.js";

import "../css/samples.css";

function Sample({ id, name, data, type, date, time, shared }) {
    const handlePreview = (e) => {
        e.preventDefault();
        preview(data, type);
    };

    return (
        <div className="box sample">
            <div className="left">
                <h2>{name}</h2>
                <p>{time} on {date}</p>
            </div>
            <div className="right">
                {shared || <Link to={`share/${id}`} className="primary">Share</Link>}
                {shared && <Link to={`share/${id}`} className="primary greyed">Shared</Link>}
                <Link to="#" className="primary" onClick={handlePreview}>Preview</Link>
                <Link to={`edit/${id}`} className="secondary">Edit</Link>
            </div>
        </div>
    );
}

export default Sample;
