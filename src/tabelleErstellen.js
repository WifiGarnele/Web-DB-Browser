import React, { useState, useEffect } from "react";

function TabelleErstellen() {
    const [spalten, setSpalten] = useState([]);
    const [ausgewaehlteSpalte, setAusgewaehlteSpalte] = useState(null);
    const [tabellenName, setTabellenName] = useState(null);

    const neueSpalte = () => {
        let vorherigerindex = 0;
        if (spalten.length > 0) {
            vorherigerindex = spalten[spalten.length - 1].index + 1;
        }
        const neueAnzahl = [...spalten, { index: vorherigerindex, name: null, typ: null, PK: 0 }];
        setSpalten(neueAnzahl);
    };

    useEffect(() => {
        console.log(spalten);
    }, [spalten]);

    function spalteSetzen(index, event) {
        event.preventDefault();
        setAusgewaehlteSpalte(index);
    }

    const spalteEntfernen = () => {
        if (ausgewaehlteSpalte !== null) {
            const neueAnzahl = spalten.filter(element => element.index !== ausgewaehlteSpalte);
            setSpalten(neueAnzahl);
            setAusgewaehlteSpalte(null);
        }
    };

    function setName(index, event, name) {
        event.preventDefault();
        setSpalten(spalten.map(spalte => spalte.index === index ? { ...spalte, name } : spalte));
    }

    function setTyp(index, event, typ) {
        event.preventDefault();
        setSpalten(spalten.map(spalte => spalte.index === index ? { ...spalte, typ } : spalte));
    }

    function setPK(index) {
        setSpalten(spalten.map(spalte => spalte.index === index ? { ...spalte, PK: spalte.PK === 0 ? 1 : 0 } : spalte));
    }

    async function tabelleErstellen() {
        if (spalten.length === 0) {
            window.alert("Fehler: Keine Spalten erstellt");
        } else {
            let test = null;
            for (let i = 0; i < spalten.length; i++) {
                if (spalten[i].name == null || spalten[i].typ == null) {
                    test = spalten[i];
                }
            }
            if (test != null) {
                window.alert("Fehler: Kein null-Wert erlaubt");
            } else {
                let PKCount = 0;
                for (let i = 0; i < spalten.length; i++) {
                    if (spalten[i].PK === 1) {
                        PKCount++;
                    }
                }
                if (PKCount === 0) {
                    window.alert("Fehler: Kein Primary Key");
                } else {
                    if (tabellenName == null) {
                        window.alert("Fehler: Kein Tabellennamen");
                    } else {
                        await senden();
                        window.location.href = "/tabellen";
                    }
                }
            }
        }
    }

    async function senden() {
        try {
            const response = await fetch('http://localhost:3002/neueTabelle', {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tabellenName: tabellenName, spalten: spalten }),
            });
            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div id="container">
            <div id="button-container">
                <button id="neueSpalte" onClick={neueSpalte}>Neue Spalte</button>
                <button id="spalteEntfernen" onClick={spalteEntfernen}>Spalte entfernen</button>
                <button onClick={tabelleErstellen}>Tabelle erstellen</button>
            </div>
            <div id="input-container">
                <label htmlFor="tabellenNamen">Tabellenname: </label>
                <input type="text" id="tabellenNamen" onChange={(e) => setTabellenName(e.target.value)} />
            </div>
            <div id="spalten-container">
                {spalten.map((spalte) => (
                    <div id="spalte-container" key={spalte.index} onClick={(event) => spalteSetzen(spalte.index, event)}>
                        <label htmlFor="spaltennamen">{spalte.index}. Spaltennamen: </label>
                        <input type="text" id="spaltennamen" required onChange={(event) => setName(spalte.index, event, event.target.value)} />
                        <label htmlFor="spaltenTyp">Spaltentyp: </label>
                        <select id="spaltenTyp" name="spalte" autoComplete="on" required defaultValue="" onChange={(event) => setTyp(spalte.index, event, event.target.value)}>
                            <option value="" disabled hidden>Bitte auswählen</option>
                            <option value="INTEGER">INTEGER</option>
                            <option value="TEXT">TEXT</option>
                            <option value="REAL">REAL</option>
                            <option value="BLOB">BLOB</option>
                            <option value="NUMERIC">NUMERIC</option>
                        </select>
                        <label htmlFor="pk-input">PK:</label>
                        <input type="checkbox" id="pk-input" name="pk" checked={spalte.PK === 1} onChange={() => setPK(spalte.index)} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TabelleErstellen;


