import { useParams } from 'react-router-dom';

import "../css/edit.css";


function Edit({ samples }) {
    function InstrumentSelector({ type }) {
        const instruments = ["Piano", "French Horn", "Guitar", "Drums"];
        const instrumentCodes = instruments.map(instrument => instrument.toLowerCase().replace(" ", "_"));
        return (
            <div className="selector">
                <p>Type</p>
                <div className="instruments">
                    {instruments.map((instrument, index) => (
                        <div key={instrument} className={(instrumentCodes[index] === type) ? "secondary instrument" : "primary instrument"}>
                            <input type="radio" name="instruments" value={instrumentCodes[index]} />
                            <label htmlFor={instrumentCodes[index]}>{instrument}</label>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const notes = ["B", "A", "G", "F", "E", "D", "C"];
    function NoteSelector({ note, bars }) {
        return (
            <div className="selector">
                <p>
                    {note}
                </p>
                <div className="bars">
                    {bars.map((bar, index) => (
                        <div key={index} className={bar ? "secondary bar" : "primary bar"}>
                            <input type="checkbox" name={note} value={index} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const { id } = useParams(); // string | undefined
    if (id === undefined) {
        return <div>Creating New...</div>;
    }

    // eslint-disable-next-line eqeqeq
    let sample = samples.find(_sample => _sample.id == id);
    if (sample === undefined) {
        return <div>Sample not found</div>;
    }

    return (
        <>
            <h1>Editing This Sample:</h1>
            <div className="banner box">
                <input type="text" value={sample.recording_data.name} />
                <div className="right">
                    <button className="primary">Preview</button>
                    <button className="secondary">Save</button>
                </div>
            </div>
            <div className="selectors">
                <InstrumentSelector type={sample.type} />
                {notes.map(note => <NoteSelector key={note} note={note} bars={sample.recording_data[note]} />)}
            </div>
        </>
    );
}

export default Edit;