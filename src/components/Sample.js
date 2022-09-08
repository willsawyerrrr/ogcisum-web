import "../css/samples.css";

function Sample({ name, time, date, shared }) {
    return (
        <div className="sample">
            <div className="left">
                <h2>{name}</h2>
                <p>{time} at {date}</p>
            </div>
            <div className="right">
                {shared && <button className="shared" disabled={true}>Shared</button>}
                {shared || <button className="share">Share</button>}
                <button className="preview">Preview</button>
                <button className="edit">Edit</button>
            </div>
        </div>
    );
}

export default Sample;
