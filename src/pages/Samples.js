import { useState } from "react";

import Sample from "../components/Sample";

import initialSamples from "../data/samples.js";

import "../css/samples.css";

function Samples() {
    // eslint-disable-next-line no-unused-vars
    const [samples, setSamples] = useState(initialSamples);

    return (
        <>
            <h1>Samples You've Created</h1>
            <div className="samples">
                {samples.map(sample => (<Sample key={sample.id} {...sample} />))}
            </div>
        </>
    );
}

export default Samples;
