// The below code has been adapted from the file `useDocumentTitle.js`
// from within the COMP2140 week 6 lecture demonstration.

import { useRef, useEffect } from "react";

export default function useDocumentTitle(title, prevailOnUnmount = false) {
    const defaultTitle = useRef(document.title);

    useEffect(() => {
        document.title = `${title} | OgCiSum`;
    }, [title]);

    useEffect(() => () => {
        if (!prevailOnUnmount) {
            document.title = defaultTitle.current;
        }
    }, [prevailOnUnmount]);

}
