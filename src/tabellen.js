import React, {useState, useEffect} from "react";
function Tabellen(){
    const [tabellen, setTabellen]=useState([]);
    async function tabellenAusgeben(){
        try{
            const response=await fetch('http://localhost:3002/tabellen');
            const data=await response.json();
            console.log(data);
            setTabellen(data)
        }catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        tabellenAusgeben()

    }, []);
    return(
        <div>
            {Object.keys(tabellen).map(key => (
                <div>
                <p>{key}</p>
                    <div>
                        {tabellen[key].map(spalte => (
                            <div>{spalte}</div>
                        ))

                        }
                    </div>
                </div>
                ))}
        </div>
    )
}
export default Tabellen;