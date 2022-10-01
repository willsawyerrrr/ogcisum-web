import { Link } from 'react-router-dom';

import "../css/samples.css";

function Sample({ id, name, updated }) {
    const months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    }

    let date = new Date(updated);
    let hours = date.getHours();
    hours = hours % 12;
    hours = hours ? hours : 12;
    let time = `${hours}:${date.getMinutes()} ${date.getHours() >= 12 ? "pm" : "am"}`;
    let dateString = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

    return (
        <div className="box sample">
            <div className="left">
                <h2>{name}</h2>
                <p>{time} on {dateString}</p>
            </div>
            <div className="right">
                <Link to={`share/${id}`} className="primary">Share</Link>
                <Link to={`preview/${id}`} className="primary">Preview</Link>
                <Link to={`edit/${id}`} className="secondary">Edit</Link>
            </div>
        </div>
    );
}

export default Sample;
