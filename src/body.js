import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./main";
import tabellen from "./tabellen";
import Tabellen from "./tabellen";
function Body(){
    return(
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/tabellen" element={<Tabellen />} />
                </Routes>
            </div>
        </Router>
    )
}
export default Body;

