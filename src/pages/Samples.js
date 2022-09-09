import { Link } from "react-router-dom";

import Sample from "../components/Sample";

import "../css/samples.css";

function Samples({ samples, setSamples }) {
    function NewSample() {
        return (
            <div className="box sample new">
                <Link to="edit/new" className="secondary">Create Sample</Link>
            </div>
        );
    }

    return (
        <>
            <h1>Samples You've Created</h1>
            <div className="samples">
                {samples.map(sample => (<Sample key={sample.id} {...sample} />))}
                {<NewSample />}
            </div>
        </>
    );
}

export default Samples;
