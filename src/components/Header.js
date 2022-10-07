import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "../css/header.css";

/**
 * Header to be displayed at the top of every page. Whether or not the
 * back arrow is shown depends on the `home` prop.
 * 
 * @param {boolean} home whether or not the header is on the home page
 *  
 * @returns header component
 */
export default function Header({ home }) {
    return (
        <header>
            <Link to="/">
                {!home && <FontAwesomeIcon icon={faArrowLeft} />}
                <h1 className="logo">
                    OgCiSum
                </h1>
            </Link>

            <p>Create &amp; Share Samples, Listen in Mobile App!</p>
        </header >
    );
}
