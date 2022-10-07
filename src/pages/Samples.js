import NewSample from "../components/NewSample.js";
import Sample from "../components/Sample.js";

import useDocumentTitle from "../helpers/useDocumentTitle.js";

import "../css/samples.css";

/**
 * Home page which displays the user's samples.
 * 
 * @param {object[]} samples list of samples
 * @param {function} updateSample function to update sample during previewing
 * @param {function} setSamples function to update list of samples on save
 * @param {function} setHome function to update home state
 * 
 * @returns home page
 */
export default function Samples({ samples, updateSample, samplesToLocations, setHome }) {
    setHome(true);
    useDocumentTitle("Home");

    return (
        <>
            <h1>Samples You've Created</h1>
            <div className="samples">
                {samples.map(sample => {
                    let shared = samplesToLocations.filter(sampleToLocation =>
                        sampleToLocation.sample === sample.id).length > 0;
                    return (
                        <Sample
                            key={sample.id}
                            shared={shared}
                            sample={sample}
                            updateSample={updateSample}
                        />
                    );
                })}
                {<NewSample />}
            </div>
        </>
    );
}
