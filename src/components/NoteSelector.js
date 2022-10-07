/**
 * Note selector which allows the user to select the timing of bars to
 * be played within the sample.
 * 
 * @param {note} note the note for which the timing is to be updated
 * @param {sample} sample the sample to be updated
 * @param {function} setSample function to update the sample
 * 
 * @returns note selector component
 */
export default function NoteSelector({ note, sample, setSample }) {
    const handleNoteChange = (e) => {
        let newBars = [...bars];
        newBars[e.target.value] = e.target.checked;
        let updatedSample = { ...sample };
        updatedSample.data[note] = newBars;
        setSample(updatedSample);
    };

    let bars = sample.data[note];

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
