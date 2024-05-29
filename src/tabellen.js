import React, {useState} from "react";
function Tabellen(){
    const [tabellen, setTabellen]=useState([]);
    async function tabellenAusgeben(){
        try{
            const response=await fetch('http://localhost:3002/tabellen');
            const data=await response.json();
            console.log(data);
        }catch (err){
            console.log(err)
        }
    }
    tabellenAusgeben()
    return(
        <div>
            <p>hallo</p>
        </div>
    )
}
export default Tabellen;