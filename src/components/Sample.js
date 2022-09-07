import "../css/samples.css";

function Sample({ name, time, date, shared }) {
    return shared ? (
        <div className="sample">
            <div className="left">
                <h2>{name}</h2>
                <p>{time} at {date}</p>
            </div>
            <div className="right">
                <button className="shared" disabled={true}>Shared</button>
                <button className="preview">Preview</button>
                <button className="edit">Edit</button>
            </div>
        </div>
    ) : (
        <div className="sample">
            <div className="left">
                <h2>{name}</h2>
                <p>{time} at {date}</p>
            </div>
            <div className="right">
                <button className="share">Share</button>
                <button className="preview">Preview</button>
                <button className="edit">Edit</button>
            </div>
        </div>
    );
}

export default Sample;
