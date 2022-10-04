import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { createSamplesToLocations, deleteSamplesToLocations } from '../api/api.js';

import "../css/share.css";

function Share({ samples, locations, samplesToLocations, setSamplesToLocations }) {
    function SharedSelector({ sampleId, locationId, locationName, samplesToLocations, setSamplesToLocations }) {
        let shared = samplesToLocations.filter(sampleToLocation =>
            sampleToLocation.samples_id === sampleId
            && sampleToLocation.locations_id === locationId
        ).length === 1;

        const handleSharedChange = async (e) => {
            if (e.target.value === "shared") {
                await createSamplesToLocations(sampleId, locationId);
                let others = samplesToLocations.filter(sampleToLocation =>
                    sampleToLocation.samples_id !== sampleId
                    || sampleToLocation.locations_id !== locationId
                );
                setSamplesToLocations([...others, { samples_id: sampleId, locations_id: locationId }]);
            } else {
                // get ID of sample to location to delete
                let deletedId = samplesToLocations.filter(sampleToLocation =>
                    sampleToLocation.samples_id === sampleId
                    && sampleToLocation.locations_id === locationId
                )[0].id;

                // delete from API
                await deleteSamplesToLocations(deletedId);

                // delete from `global` state
                let others = samplesToLocations.filter(_sampleToLocation =>
                    _sampleToLocation.id !== deletedId);
                setSamplesToLocations([...others, { samples_id: sampleId, locations_id: locationId }]);
            }
        };

        return (
            <div className="selector selector-share">
                <h3>{locationName}</h3>
                <div className="shares">
                    <div className={shared ? "primary share" : "secondary share"}>
                        <input type="radio" name={`shared-${locationName}`} value="not-shared" onChange={handleSharedChange} checked={shared} />
                        <label htmlFor="not-shared" >Not Shared</label>
                    </div>
                    <div className={shared ? "secondary share" : "primary share"}>
                        <input type="radio" name={`shared-${locationName}`} value="shared" onChange={handleSharedChange} checked={!shared} />
                        <label htmlFor="shared" >Shared</label>
                    </div>
                </div>
            </div>
        )
    }

    const { id } = useParams(); // string | undefined
    const [sample, setSample] = useState(samples.find(_sample => _sample.id == id));

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
                {locations.map(location => <SharedSelector key={location.id} sampleId={sample.id} locationId={location.id} locationName={location.name} samplesToLocations={samplesToLocations} setSamplesToLocations={setSamplesToLocations} />)}
            </div>
        </>
    );
}

export default Share;