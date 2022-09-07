import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import Samples from "./components/Samples.js";
import Footer from "./components/Footer.js";

import "./css/App.css";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Samples />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
