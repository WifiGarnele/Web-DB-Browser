import React,{useState} from "react";
import './sql.css'

function SQL(){
    const[query, setQuery]=useState(null)
    const[ergebnis, setErgebnis]=useState([])
    const [keys, setKeys]=useState([])
    const [fehler, setFehler]=useState(null)
    async function ausfuehren(){
        if (query!=null){
            try {
                console.log("start")
                const response = await fetch('http://localhost:3002/sql', {
                    method: 'POST',
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({query: query}),

                });
                const data=await response.json();
                console.log(data)
                if(data.ergebnis==undefined){
                    setFehler(data.fehler)
                }else {
                    setErgebnis(data.ergebnis)
                    setFehler(null)
                    let schluessel = [];
                    Object.keys(data.ergebnis[0]).forEach(key => {
                        schluessel.push(key);
                        console.log(key);
                    });
                    setKeys(schluessel)
                    console.log(data)
                }



            }catch (err){
                console.log(err)
            }
        }
    }
    return(
        <div id="container">
            <div id="query-container">
                <textarea placeholder={"Gib die SQL-Query ein"} onChange={(e)=>setQuery(e.target.value)}></textarea>

            </div>
            <div id="button-container">
                <button onClick={()=> ausfuehren()}>Ausführen</button>
            </div>
            <div id="ergebnis-container">
                <div className="tabelle">
                    {ergebnis.length > 0 && fehler==null? (
                        <table>
                            <thead>
                            <tr>
                                {keys.map((key, index) => (
                                    <th key={index} className="header">{key}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {ergebnis.map((zeile, rowIndex) => (
                                <tr key={rowIndex}>
                                    {keys.map((key, cellIndex) => (
                                        <td key={cellIndex} className="zelle">{zeile[key]}</td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className={"fehler-container"}>
                            {fehler}
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
export default SQL