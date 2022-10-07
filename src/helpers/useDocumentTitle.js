// The below code has been adapted from the file `useDocumentTitle.js`
// from within the COMP2140 week 6 lecture demonstration.

import { useEffect } from "react";

/**
 * Sets the document title to the given title.
 * 
 * @param {string} title document title to be set
 */
export default function useDocumentTitle(title) {
    useEffect(() => {
        document.title = `${title} | OgCiSum`;
    }, [title]);
}
