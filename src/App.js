import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

import Edit from "./pages/Edit.js";
import Samples from "./pages/Samples.js";
import Share from "./pages/Share.js";

import { readSamples, readLocations, readSamplesToLocations } from "./api/api.js";

import "./css/colours.css";
import "./css/main.css";

function App() {
    const [samples, setSamples] = useState([]);
    const [locations, setLocations] = useState([]);
    const [samplesToLocations, setSamplesToLocations] = useState([]);

    useEffect(() => {
        const fetchSamples = async () => setSamples(await readSamples());
        fetchSamples();
    }, []);
    useEffect(() => {
        const fetchLocations = async () => setLocations(await readLocations());
        fetchLocations();
    }, []);
    useEffect(() => {
        const fetchSamplesToLocations = async () => setSamplesToLocations(await readSamplesToLocations());
        fetchSamplesToLocations();
    }, []);

    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Samples samples={samples} />} />
                    <Route path="edit/new" element={<Edit samples={samples} setSamples={setSamples} />} />
                    <Route path="edit/:id" element={<Edit samples={samples} setSamples={setSamples} />} />
                    <Route path="share/:id" element={<Share samples={samples} locations={locations} samplesToLocations={samplesToLocations} setSamplesToLocations={setSamplesToLocations} />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
