import { Link } from "react-router-dom";

import Sample from "../components/Sample";

import useDocumentTitle from "../helpers/useDocumentTitle.js";

import "../css/samples.css";

function Samples({ samples, updateSample, samplesToLocations, setHome }) {
    function NewSample() {
        return (
            <div className="box greyed center">
                <Link to="edit/new" className="secondary">Create Sample</Link>
            </div>
        );
    }

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

export default Samples;
