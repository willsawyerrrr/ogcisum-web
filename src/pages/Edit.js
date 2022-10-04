import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { createSample, updateSample } from '../api/api.js';

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
    function InstrumentSelector({ instrument, setInstrument }) {
        const instruments = ["Piano", "French Horn", "Guitar", "Drums"];
        const instrumentCodes = instruments.map(instrument => instrument.toLowerCase().replace(" ", "_"));

        const handleInstrumentChange = (e) => {
            setInstrument(e.target.value);
        };

        return (
            <div className="selector selector-edit">
                <h3>Type</h3>
                <div className="button-group">
                    {instruments.map((_instrument, index) => (
                        <div key={_instrument} className={(instrumentCodes[index] === instrument) ? "secondary button" : "primary button"}>
                            <input type="radio" name="instruments" value={instrumentCodes[index]} onChange={handleInstrumentChange} checked={instrumentCodes[index] === instrument} />
                            <label htmlFor={instrumentCodes[index]} >{_instrument}</label>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    function NoteSelector({ note, bars, setData }) {
        const handleNoteChange = (e) => {
            let newBars = [...bars];
            newBars[e.target.value] = e.target.checked;
            setData({ ...newBars, note: newBars });
        };

        return (
            <div className="selector selector-edit">
                <h3>{note}</h3>
                <div className="button-group">
                    {bars.map((bar, index) => (
                        <div key={index} className={bar ? "secondary button" : "primary button"}>
                            <input type="checkbox" name={note} value={index} checked={bar} onChange={handleNoteChange} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const handleNameChange = (e) => setName(e.target.value);
    const handleSave = async () => {
        if (id) {
            // update existing sample in API
            await updateSample(id, data, instrument, name);
            // update existing sample in local state
            setSample({ id, data, type: instrument, name });
            // update existing sample in 'global' state
            setSamples(samples.map(sample => (sample.id === id) ? { id, data, type: instrument, name } : sample));
        } else {
            // create new sample in API
            let response = await createSample(data, instrument, name);
            // create new sample in local state
            setSample({ id: response.insertedID, data, type: instrument, name });
            // create new sample in 'global' state
            setSamples([...samples, { id: response.insertedID, data, type: instrument, name }]);
        }
    };

    const { id } = useParams(); // string | undefined

    // eslint-disable-next-line eqeqeq
    let initialSample = samples.find(_sample => _sample.id == id) || {
        id: DEFAULT_ID,
        data: DEFAULT_DATA(),
        type: DEFAULT_TYPE,
        name: DEFAULT_NAME
    };
    const [sample, setSample] = useState(initialSample);

    const [instrument, setInstrument] = useState(sample.instrument);
    const [name, setName] = useState(sample.name);
    const [data, setData] = useState(sample.data);

    return (
        <>
            <h1>Editing This Sample:</h1>
            <div className="banner box">
                <input type="text" value={name} onChange={handleNameChange} />
                <div className="right">
                    <button className="primary">Preview</button>
                    <button className="secondary" onClick={handleSave}>Save</button>
                </div>
            </div>
            <div className="selectors">
                <InstrumentSelector type={instrument} setType={setInstrument} />
                {notes.map(note => <NoteSelector key={note} note={note} bars={data[note]} setData={setData} />)}
            </div>
        </>
    );
}

export default Edit;