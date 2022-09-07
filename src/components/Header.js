import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import "../css/header.css";

function Header({ back }) {
    return back ? (
        <header>
            <Link to="/">
                <h1 className="logo">
                    <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; OgCiSum
                </h1>
            </Link>

            <p>Create &amp; Share Samples, Listen in Mobile App!</p>
        </header >
    ) : (
        <header>
            <Link to="/">
                <h1 className="logo">OgCiSum</h1>
            </Link>

            <p>Create &amp; Share Samples, Listen in Mobile App!</p>
        </header>
    );
}

export default Header;
