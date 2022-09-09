import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import "../css/header.css";

function Header({ previous }) {
    return (
        <header>
            {
                previous &&
                <Link to={previous || "temp"}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
            }
            <Link to="/">
                <h1 className="logo">
                    OgCiSum
                </h1>
            </Link>

            <p>Create &amp; Share Samples, Listen in Mobile App!</p>
        </header >
    );
}

export default Header;
