import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./main";
import Tabellen from "./tabellen";
import Navbar from "./navbar";
import TabelleErstellen from "./tabelleErstellen";
function Body(){
    return(
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/tabellen" element={<Tabellen />} />
                    <Route path="/tabelleErstellen" element={<TabelleErstellen />} />
                </Routes>
            </div>
        </Router>
    )
}
export default Body;

