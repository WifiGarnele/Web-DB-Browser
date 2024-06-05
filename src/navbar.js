import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-custom">
            <Link className="navbar-brand" to="/">Web DB Browser</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/tabellen" >Datenbankstruktur</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tabelleErstellen" >Tabelle erstellen</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/sql" >SQL</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default Navbar;
