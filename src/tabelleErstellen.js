import React, { useState, useEffect, useCallback } from "react";

function TabelleErstellen() {
    const [spalten, setSpalten] = useState([]);
    const [ausgewaehlteSpalte, setAusgewaehlteSpalte] = useState(null);

    const neueSpalte = () => {
        let vorherigerindex=0;
        if (spalten.length>0){

            vorherigerindex=spalten[spalten.length-1].index+1;
        }
        console.log(vorherigerindex)
        const neueAnzahl = [...spalten, {index:vorherigerindex, name: null, typ:null, PK:0}];
        console.log("test")
        setSpalten(neueAnzahl);
        console.log(spalten)
    };

    useEffect(() => {
        console.log();

    }, []);

    function spalteSetzen(index, event) {
        event.preventDefault(); // Verhindert das Standardverhalten des Ereignisses
        console.log("Ausgeführt mit Index:"+index);
        setAusgewaehlteSpalte(index);
    }

    const spalteEntfernen = () => {
        console.log(ausgewaehlteSpalte)
        if (ausgewaehlteSpalte !== null) {
            console.log(spalten)
            const neueAnzahl = spalten.filter(element => element.index !== ausgewaehlteSpalte);
            console.log(neueAnzahl)
            setSpalten(neueAnzahl);
            console.log("test")
            setAusgewaehlteSpalte(null);
        }
    };
    function setName(index, event, name){
        event.preventDefault();
        let spaltenKopie=spalten
        for (let i=0; i<spaltenKopie.length;i++){
            if (spaltenKopie[i].index ==index){
                spaltenKopie[i].name=name;
            }
        }
        setSpalten(spaltenKopie)
        console.log(spalten)

    }
    function setTyp(index, event, typ){
        event.preventDefault();
        let spaltenKopie=spalten
        for (let i=0; i<spaltenKopie.length;i++){
            if (spaltenKopie[i].index ==index){
                spaltenKopie[i].typ=typ;
            }
        }
        setSpalten(spaltenKopie)
        console.log(spalten)

    }
    function setPK(index, event){
        event.preventDefault();
        let spaltenKopie=spalten
        for (let i=0; i<spaltenKopie.length;i++){
            if (spaltenKopie[i].index ==index){
                if (spaltenKopie[i].PK==0){
                    spaltenKopie[i].PK=1;
                }else{
                    spaltenKopie[i].PK=0;
                }
            }
        }
        setSpalten(spaltenKopie)
        console.log(spalten)
    }
    function tabelleErstellen(){
        if (spalten.length==0){
            window.alert("Fehler: Keine Spalten erstellt")
        }else {
            let test=null;
            for (let i =0; i<spalten.length;i++){
                if (spalten[i].name==null || spalten[i].typ==null){
                    test=spalten[i]
                }
            }
            if (test!=null){
                window.alert("Fehler: Kein null-Wert erlaubt")
            }else {
                let PKCount=0;
                for (let i =0; i<spalten.length;i++){
                    if (spalten[i].PK==1){
                        PKCount++;
                    }
                }
                if (PKCount==0){
                    window.alert("Fehler: Kein Primary Key")
                }else{

                }
            }
        }
    }

    return (
        <div id="container">
            <div id="button-container">
                <button id="neueSpalte" onClick={neueSpalte}>Neue Spalte</button>
                <button id="spalteEntfernen" onClick={spalteEntfernen}>Spalte entfernen</button>
                <button>Tabelle erstellen</button>
            </div>
            <div id="input-container">
                <label htmlFor="tabellenNamen">Tabellenname: </label>
                <input type="text" id="tabellenNamen" />
            </div>
            <div id="spalten-container">
                {spalten.map((spalte) => (
                    <div id="spalte-container" key={spalte.index} onClick={(event) => spalteSetzen(spalte.index, event)}>

                    <label htmlFor="spaltennamen">{spalte.index}. Spaltennamen: </label>
                        <input type="text" id="spaltennamen" required onChange={(event) => setName(spalte.index, event, event.target.value)}/>
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
                        <input type="checkbox" id="pk-input" name="pk" onClick={(event) => setPK(spalte.index, event)}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TabelleErstellen;
