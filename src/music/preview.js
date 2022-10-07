import { guitar, frenchHorn, piano, drums, toneObject } from "./instruments.js";

/** Notes used to create samples. */
export const notes = ["B4", "A4", "G3", "F3", "E3", "D3", "C3"];

/**
 * Plays the given sample using the given instrument.
 * 
 * @param {boolean[]} data recording data used to represent the sample
 * @param {string} type typ op instrument used to compose the sample
 */
export function preview(data, type) {
    function playNoteFromBars(note, bars) {
        const now = toneObject.now();
        bars.forEach((bar, time) => {
            bar && instrument.triggerAttackRelease(note, "8n", now + (time / 4)); // Plays 0.25s apart
        });
    }

    let instrument;
    switch (type) {
        case "piano":
            instrument = piano;
            break;

        case "guitar":
            instrument = guitar;
            break;

        case "french_horn":
            instrument = frenchHorn;
            break;

        case "drums":
            instrument = drums;
            break;

        default:
            throw new Error("Unknown instrument: " + type);
    }

    notes.forEach(note => playNoteFromBars(note, data[note]));
}

/**
 * Stops all audio playback.
 * 
 * NOTE: currently does not work as expected.
 */
export function cancelPreview() {
    toneObject.Transport.stop();
    toneObject.Transport.cancel(toneObject.now());
}