import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

import Samples from "./pages/Samples.js";

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
