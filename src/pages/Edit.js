import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { createSample, updateSample } from '../api/api.js';
import useDocumentTitle from '../useDocumentTitle.js';

import "../css/edit.css";

/** Notes used to create samples. */
const notes = ["B", "A", "G", "F", "E", "D", "C"];

/** Default ID for new samples. */
const DEFAULT_ID = 0;
/** Default name for new samples. */
const DEFAULT_NAME = "";
/** Default instrument for new samples. */
const DEFAULT_TYPE = "piano";
/** Returns the default bars for notes. */
const DEFAULT_BARS = () => [
    false, false, true, false, false, false, true, false,
    false, false, true, false, false, false, true, false
];
/** Returns the default data for a new sampele. */
const DEFAULT_DATA = () => {
    let data = {};
    notes.forEach(note => data[note] = DEFAULT_BARS());
    return data;
};


function Edit({ samples, setSamples }) {
    function InstrumentSelector({ instrument, setSample }) {
        const instruments = ["Piano", "French Horn", "Guitar", "Drums"];
        const instrumentCodes = instruments.map(instrument => instrument.toLowerCase().replace(" ", "_"));

        const handleInstrumentChange = (e) => {
            setSample({ ...sample, type: e.target.value });
        };

        return (
            <div className="selector selector-edit">
                <p><strong>Type</strong></p>
                <div className="button-group">
                    {instruments.map((_instrument, index) => (
                        <div key={_instrument} className={(instrumentCodes[index] === instrument) ? "secondary button" : "primary button"}>
                            <input type="radio" name="instruments" value={instrumentCodes[index]} id={instrumentCodes[index]} onChange={handleInstrumentChange} checked={instrumentCodes[index] === instrument} />
                            <label htmlFor={instrumentCodes[index]} >{_instrument}</label>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    function NoteSelector({ note, bars, setSample }) {
        const handleNoteChange = (e) => {
            let newBars = [...bars];
            newBars[e.target.value] = e.target.checked;
            setSample({ ...sample, data: { ...sample.data, note: newBars } });
        };

        return (
            <div className="selector selector-edit">
                <p><strong>{note}</strong></p>
                <div className="button-group">
                    {bars.map((bar, index) => (
                        <div key={index} className={bar ? "secondary button" : "primary button"}>
                            <input type="checkbox" name={note} value={index} id={`${note}-${index}`} checked={bar} onChange={handleNoteChange} />
                            <label htmlFor={`${note}-${index}`}></label>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const handleNameChange = (e) => {
        setSample({ ...sample, name: e.target.value });
    };

    const handleSave = async () => {
        if (id) {
            // update existing sample in API
            await updateSample(id, sample.data, sample.type, sample.name);
            // update existing sample in 'global' state
            setSamples(samples.map(_sample => (_sample.id === id) ? { ...sample, data: sample.data, type: sample.type, name: sample.name } : _sample));
        } else {
            // create new sample in API
            let response = await createSample(sample.data, sample.type, sample.name);
            // create new sample in 'global' state
            setSamples([...samples, { id: response.insertedID, data: sample.data, type: sample.type, name: sample.name }]);
        }
    };

    const { id } = useParams(); // string | undefined
    useDocumentTitle(id ? `Edit Sample ${id}` : "Create New Sample");

    let initialSample = samples.find(_sample => _sample.id == id) || {
        id: DEFAULT_ID,
        data: DEFAULT_DATA(),
        type: DEFAULT_TYPE,
        name: DEFAULT_NAME
    };
    const [sample, setSample] = useState(initialSample);

    return (
        <>
            <h1>Editing This Sample:</h1>
            <div className="banner box">
                <input type="text" value={sample.name} onChange={handleNameChange} />
                <div className="right">
                    <button className="primary">Preview</button>
                    <button className="secondary" onClick={handleSave}>Save</button>
                </div>
            </div>
            <div className="selectors">
                <InstrumentSelector instrument={sample.type} setSample={setSample} />
                {notes.map(note => <NoteSelector key={note} note={note} bars={sample.data[note]} setSample={setSample} />)}
            </div>
        </>
    );
}

export default Edit;