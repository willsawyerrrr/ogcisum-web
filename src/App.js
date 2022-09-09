import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

import Edit from "./pages/Edit.js";
import Samples from "./pages/Samples.js";

import { readSamples } from "./api/api.js";

import "./css/colours.css";
import "./css/main.css";

function App() {
    const [samples, setSamples] = useState([]);
    useEffect(() => {
        let fetchSamples = async () => {
            let samples = await readSamples();
            setSamples(samples);
        }
        fetchSamples();
    }, []);

    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Samples samples={samples} setSamples={setSamples} />} />
                    <Route path="edit/new" element={<Edit />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
