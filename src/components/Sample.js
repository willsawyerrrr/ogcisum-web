import "../css/samples.css";

function Sample({ name, time, date, shared }) {
    return (
        <div className="box sample">
            <div className="left">
                <h2>{name}</h2>
                <p>{time} at {date}</p>
            </div>
            <div className="right">
                {shared && <button className="primary" disabled={true}>Shared</button>}
                {shared || <button className="primary">Share</button>}
                <button className="primary">Preview</button>
                <button className="secondary">Edit</button>
            </div>
        </div>
    );
}

export default Sample;
