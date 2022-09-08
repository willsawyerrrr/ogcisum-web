import { Link } from 'react-router-dom';
import { useState } from 'react';

import "../css/samples.css";

function Sample({ name, time, date, shared }) {
    const [isShared, setIsShared] = useState(shared);

    return (
        <div className="box sample">
            <div className="left">
                <h2>{name}</h2>
                <p>{time} at {date}</p>
            </div>
            <div className="right">
                {isShared && <Link to="share" className="primary" disabled={true}>Shared</Link>}
                {isShared || <Link to="share" className="primary">Share</Link>}
                <button className="primary">Preview</button>
                <Link to="edit" className="secondary">Edit</Link>
            </div>
        </div>
    );
}

export default Sample;
