import React, {useState, useEffect} from "react";
import './tabellen.css';
function Tabellen(){
    const [tabellen, setTabellen]=useState([]);
    const [openTables, setOpenTables] = useState({});
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
    const toggleTable = (key) => {
        setOpenTables((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };
    return (
        <div className="container">
            {Object.keys(tabellen).map((key) => (
                <div key={key} className="table-container">
                    <p className="table-header" onClick={() => toggleTable(key)}>
                        {key}
                    </p>
                    {openTables[key] && (
                        <div className="columns-container">
                            {tabellen[key].map((spalte, index) => (
                                <div key={index} className="column">
                                    {spalte[1]}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
export default Tabellen;