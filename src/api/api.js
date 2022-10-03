/** Base URL for the API */
const apiUrl = "http://wmp.interaction.courses/api/v1/";
/** Personal API key from Blackboard */
const apiKey = "iw1GgfCK";

/** Allowed endpoints for the API read mode. */
const readEndpoints = ["locations", "samples", "samples_to_locations"];
/** Lower bound for the return limit for the API read mode. */
const readLimitLowerBound = 1;
/** Upper bound for the return limit for the API read mode. */
const readLimitUpperBound = 9999;
/** Allowed orders for the API read mode. */
const readOrders = ["asc", "desc"];

/** Allowed sample types for the API create mode. */
const sampleTypes = ["piano", "french horn", "guitar", "drums"];

/** Allowed endpoints for the API delete mode. */
const deleteEndpoints = ["samples", "samples_to_locations"];


/**
 * Creates a URL used to interact with the API.
 * 
 * @param {object} params URL parameters defining the interaction
 * 
 * @returns {string} URL used to interact with the API
 */
function createUrl(params) {
    let url = `${apiUrl}?apiKey=${apiKey}`;
    for (let param in params) {
        url += `&${param}=${params[param]}`;
    }
    return url;
}


/**
 * Reads items from the API.
 * 
 * @param {string} endpoint endpoint to get from
 * @param {number} [limit = readLimitUpperBound] maximum number of items to return
 * @param {string} [order = "asc"] order in which to return items
 * 
 * @returns {Promise<object>} data returned from the API
 */
async function read(endpoint, limit = readLimitUpperBound, order = "asc") {
    if (!readEndpoints.includes(endpoint)) {
        throw new Error(`Invalid endpoint: ${endpoint}`);
    } else if (limit < readLimitLowerBound || limit > readLimitUpperBound) {
        throw new Error(`Invalid limit: ${limit}`);
    } else if (!readOrders.includes(order)) {
        throw new Error(`Invalid order: ${order}`);
    }

    const url = createUrl(
        {
            mode: "read",
            endpoint: endpoint,
            limit: limit,
            order: order
        }
    );
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


/**
 * Reads locations from the API.
 * 
 * @param {number} [limit = readLimitUpperBound] maximum number of items to return
 * @param {string} [order = "asc"] order in which to return items
 * 
 * @returns {Promise<object[]>} locations returned from the API
 */
export async function readLocations(limit = readLimitUpperBound, order = "asc") {
    if (limit < readLimitLowerBound || limit > readLimitUpperBound) {
        throw new Error(`Invalid limit: ${limit}`);
    } else if (!readOrders.includes(order)) {
        throw new Error(`Invalid order: ${order}`);
    }

    let data = await read("locations", limit, order);
    if ("locations" in data) {
        return data.locations.map(location => {
            return {
                id: location.id,
                name: location.location
            };
        });
    }
    return data;
}


/**
 * Reads samples from the API.
 * 
 * @param {number} [limit = readLimitUpperBound] maximum number of items to return
 * @param {string} [order = "asc"] order in which to return items
 * 
 * @returns {Promise<object>} samples returned from the API
 */
export async function readSamples(limit = readLimitUpperBound, order = "asc") {
    if (limit < readLimitLowerBound || limit > readLimitUpperBound) {
        throw new Error(`Invalid limit: ${limit}`);
    } else if (!readOrders.includes(order)) {
        throw new Error(`Invalid order: ${order}`);
    }

    let data = await read("samples", limit, order);
    if ("samples" in data) {
        return data.samples.map(sample => {
            return {
                id: sample.id,
                name: sample.name,
                type: sample.type,
                data: JSON.parse(sample.recording_data),
                updated: sample.datetime
            };
        });
    }
    return data;
}


/**
 * Reads samples to locations from the API.
 * 
 * @param {number} [limit = readLimitUpperBound] maximum number of items to return
 * @param {string} [order = "asc"] order in which to return items
 * 
 * @returns {Promise<object>} data returned from the API
 */
export async function readSamplesToLocations(limit = readLimitUpperBound, order = "asc") {
    if (limit < readLimitLowerBound || limit > readLimitUpperBound) {
        throw new Error(`Invalid limit: ${limit}`);
    } else if (!readOrders.includes(order)) {
        throw new Error(`Invalid order: ${order}`);
    }

    let data = await read("samples_to_locations", limit, order);
    if ("samples_to_locations" in data) {
        return data.samples_to_locations.map(sampleToLocation => {
            return {
                id: sampleToLocation.id,
                location: sampleToLocation.locations_id,
                sample: sampleToLocation.samples_id
            };
        });
    }
    return data;
}


/**
 * Creates a sample to the API.
 * 
 * The sample to create must be of the form:
 * ```javascript
 *   {
 *   	"B": [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
 *   	"A": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
 *   	"G": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
 *   	"F": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
 *   	"E": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
 *   	"D": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
 *   	"C": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
 *   }
 * ```
 * Where each of the 7 notes is an array of 16 bars, where `true` is a bar toggled on and `false` is a bar toggled off.
 * 
 * @param {object} sample sample to create
 * @param {string} sampleType instrument used to create the sample
 * @param {string} sampleName name of the sample to create
 * 
 * @returns {Promise<object>} data returned from the API
 */
export async function createSample(sample, sampleType, sampleName) {
    if (!sampleTypes.includes(sampleType)) {
        throw new Error(`Invalid sample type: ${sampleType}`);
    }

    const url = createUrl(
        {
            mode: "create",
            endpoint: "samples",
            sampleType: sampleType,
            sampleName: sampleName
        }
    );
    const response = await fetch(url, { method: "POST", body: JSON.stringify(sample) });
    const data = await response.json();
    return data;
}


/**
 * Creates a sample to location to the API.
 * 
 * @param {number} sampleId the number of an existing ID from the samples endpoint
 * @param {number} locationId the number of an existing ID from the locations endpoint
 * 
 * @returns {Promise<object>} data returned from the API
 */
export async function createSamplesToLocations(sampleId, locationId) {
    const url = createUrl(
        {
            mode: "create",
            endpoint: "samples_to_locations",
            sampleID: sampleId,
            locationID: locationId
        }
    );
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


/**
 * Updates a sample to the API.
 * 
 * The sample to update must be of the form specified in the `createSample` function.
 * 
 * @param {string} sampleId unique ID of the sample to update
 * @param {object} sample sample to update
 * @param {string} sampleType instrument used to create the updated sample
 * @param {string} sampleName name of the sample to update
 * 
 * @returns {Promise<object>} data returned from the API
 */
export async function updateSample(sampleId, sample, sampleType, sampleName) {
    if (!sampleTypes.includes(sampleType)) {
        throw new Error(`Invalid sample type: ${sampleType}`);
    }

    const url = createUrl(
        {
            mode: "update",
            endpoint: "samples",
            sampleType: sampleType,
            sampleName: sampleName,
            id: sampleId
        }
    );

    const response = await fetch(url, { method: "POST", body: JSON.stringify(sample) });
    const data = await response.json();
    return data;
}


/**
 * Deletes an item from the API.
 * 
 * @param {string} endpoint endpoint to delete from
 * @param {number} id the number of an existing ID from the selected endpoint
 * 
 * @returns {Promise<object>} data returned from the API
 */
async function del(endpoint, id) {
    if (!deleteEndpoints.includes(endpoint)) {
        throw new Error(`Invalid endpoint: ${endpoint}`);
    }

    const url = createUrl(
        {
            mode: "delete",
            endpoint: endpoint,
            id: id
        }
    )
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


/**
 * Deletes a sample from the API.
 * 
 * @param {number} id the number of an existing ID from the samples endpoint
 * 
 * @returns {Promise<object>} data returned from the API
 */
export async function deleteSample(id) {
    let data = await del("samples", id);
    return data;
}


/**
 * Deletes a sample to location from the API.
 * 
 * @param {number} id the number of an existing ID from the samples to locations endpoint
 * 
 * @returns {Promise<object>} data returned from the API
 */
export async function deleteSamplesToLocations(id) {
    let data = await del("samples_to_locations", id);
    return data;
}
