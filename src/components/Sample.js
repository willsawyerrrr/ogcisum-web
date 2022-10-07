import { Link } from "react-router-dom";

import { preview, cancelPreview } from "../music/preview.js";

import "../css/samples.css";

/**
 * Sample card to be displayed on the home page. The sample allows the user
 * to preview the sample and navigate to the edit and share pages.
 * 
 * @param {boolean} shared whether or not the given sample is shared
 * @param {object} sample sample to be updated
 * @param {function} updateSample function to update the sample
 * 
 * @returns sample card component
 */
export default function Sample({ shared, sample, updateSample }) {
    const handlePreview = (e) => {
        e.preventDefault();
        preview(sample.data, sample.type);
        updateSample({ ...sample, previewing: true });
        setTimeout(() => updateSample({ ...sample, previewing: false }), 4000);
    };

    const handleStopPreview = (e) => {
        e.preventDefault();
        cancelPreview();
        updateSample({ ...sample, previewing: false });
    }

    return (
        <div className="box sample">
            <div className="left">
                <h2>{sample.name}</h2>
                <p>{sample.time} on {sample.date}</p>
            </div>
            <div className="right">
                {shared || <Link to={`share/${sample.id}`} className="primary">Share</Link>}
                {shared && <Link to={`share/${sample.id}`} className="primary greyed">Shared</Link>}

                {sample.previewing || <Link to="#" className="primary" onClick={handlePreview}>Preview</Link>}
                {sample.previewing && <Link to="#" className="primary greyed" onClick={handleStopPreview}>Stop Previewing</Link>}

                <Link to={`edit/${sample.id}`} className="secondary">Edit</Link>
            </div>
        </div>
    );
}
