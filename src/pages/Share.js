import { Link, useParams } from 'react-router-dom';

import { createSamplesToLocations, deleteSamplesToLocations } from '../api/api.js';

import useDocumentTitle from "../helpers/useDocumentTitle.js";

import "../css/share.css";

function Share({ samples, locations, samplesToLocations, setSamplesToLocations, setHome }) {
    function SharedSelector({ sampleId, locationId, locationName, samplesToLocations, setSamplesToLocations }) {
        let shared = samplesToLocations.filter(sampleToLocation =>
            sampleToLocation.sample === sampleId
            && sampleToLocation.location === locationId
        ).length > 0;

        const handleSharedChange = async (e) => {
            if (e.target.value === "shared") {
                let response = await createSamplesToLocations(sampleId, locationId);
                let others = samplesToLocations.filter(sampleToLocation =>
                    sampleToLocation.sample !== sampleId
                    || sampleToLocation.location !== locationId
                );
                setSamplesToLocations([...others, { id: response.insertedID, sample: sampleId, location: locationId }]);
            } else {
                // get IDs of samples to locations to delete
                let filtered = samplesToLocations.filter(_sampleToLocation =>
                    _sampleToLocation.sample === sampleId
                    && _sampleToLocation.location === locationId
                );
                let remaining = samplesToLocations.filter(() => true);
                for (let deleteId of filtered.map(_sampleToLocation => _sampleToLocation.id)) {
                    // delete from API
                    await deleteSamplesToLocations(deleteId);

                    // prepare to delete from `global` state
                    remaining = remaining.filter(rem => rem.id !== deleteId);
                }
                // set new `global` state
                setSamplesToLocations([...remaining]);
            }
        };

        return (
            <div className="selector selector-share">
                <p><strong>{locationName}</strong></p>
                <div className="button-group">
                    <div className={shared ? "primary button" : "secondary button"}>
                        <input type="radio" name={`shared-${locationName}`} value="not-shared" id={`not-shared-${locationName}`} onChange={handleSharedChange} checked={!shared} />
                        <label htmlFor={`not-shared-${locationName}`} >Not Shared</label>
                    </div>
                    <div className={shared ? "secondary button" : "primary button"}>
                        <input type="radio" name={`shared-${locationName}`} value="shared" id={`shared-${locationName}`} onChange={handleSharedChange} checked={shared} />
                        <label htmlFor={`shared-${locationName}`} >Shared</label>
                    </div>
                </div>
            </div>
        )
    }

    setHome(false);
    const { id } = useParams(); // string | undefined
    useDocumentTitle(`Share Sample ${id}`);
    const sample = samples.find(_sample => _sample.id === id);

    return (
        <>
            <h1>Share This Sample:</h1>
            <div className="box sample">
                <div className="left">
                    <h2>{sample.name}</h2>
                    <p>{sample.time} on {sample.date}</p>
                </div>
                <div className="right">
                    <Link to={`preview/${id}`} className="primary">Preview</Link>
                </div>
            </div>
            <div className="selectors">
                {locations.map(location => (
                    <SharedSelector
                        key={location.id}
                        sampleId={sample.id}
                        locationId={location.id}
                        locationName={location.name}
                        samplesToLocations={samplesToLocations}
                        setSamplesToLocations={setSamplesToLocations}
                    />
                ))}
            </div>
        </>
    );
}

export default Share;