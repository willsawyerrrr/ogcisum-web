import { Link } from "react-router-dom";

/**
 * New sample banner which directs the user to the new sample page.
 * 
 * @returns new sample component
 */
export default function NewSample() {
    return (
        <div className="box greyed center">
            <Link to="edit/new" className="secondary">Create Sample</Link>
        </div>
    );
}
