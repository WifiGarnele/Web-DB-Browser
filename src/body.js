import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./main";
import Tabellen from "./tabellen";
import Navbar from "./navbar";
function Body(){
    return(
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/tabellen" element={<Tabellen />} />
                </Routes>
            </div>
        </Router>
    )
}
export default Body;

