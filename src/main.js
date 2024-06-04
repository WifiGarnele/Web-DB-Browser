

import React, { useState } from 'react';

function Main() {
    const [datei, setDatei] = useState(null);
    const [meldung, setMeldung]=useState(null)

    const sqlChange = (event) => {
        const file = event.target.files[0];
        setDatei(file);
        console.log(file);
    };

    async function abschicken() {
        try {
            if (!datei) {
                console.log("Keine Datei ausgewählt");
                return;
            }
            console.log(datei);
            const formData = new FormData();
            formData.append('file', datei);
            console.log(formData);
            const response = await fetch('http://localhost:3002/upload', {
                method: 'POST',
                mode: 'cors',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP-Fehler! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setMeldung("Erfolg")
        } catch (err) {
            console.log(err);
            setMeldung("Fehler")
        }
    }
    function zuBearbeitung(){
        window.sessionStorage.setItem("bearbeitung", true)
        window.location.href="/"

    }


    return (
        <div>
            <input type="file" onChange={sqlChange} />
            <button onClick={abschicken}>Abschicken</button>

            {
                meldung==="Erfolg"?(
                    <div>
                        <p>{meldung}</p>
                        <button onClick={zuBearbeitung}>zur Bearbeitung</button>
                    </div>
                ):(
                    <div>
                        <p>{meldung}</p>
                    </div>
                )
            }
        </div>
    );
}

export default Main;
