import { useState } from "react";

import Sample from "../components/Sample";

function Samples() {
    const [samples, setSamples] = useState([]);

    return (
        <>
            {samples.map(sample => (<Sample {...sample} />))}
        </>
    );
}

export default Samples;
