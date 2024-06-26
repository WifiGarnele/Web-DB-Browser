import React, {useState, useEffect} from "react";
import './tabellen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
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
    const GoldKeyIcon = () => (
        <FontAwesomeIcon icon={faKey} style={{ color: 'gold' }} />
    );
    const GreyKeyIcon = () => (
        <FontAwesomeIcon icon={faKey} style={{ color: 'grey' }} />
    );
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
                                <div>
                            {spalte[5]==0?
                                (
                                    <div key={index} className="column">
                                        {spalte[1]} {"      "} {spalte[2]}
                                    </div>
                                ): spalte[5]>0?(
                                    <div key={index} className="column">
                                        {spalte[1]} {"      "} {spalte[2]} <GoldKeyIcon />
                                    </div>
                                ):(
                                    <div key={index} className="column">
                                        {spalte[1]} {"      "} {spalte[2]} <GreyKeyIcon />
                                    </div>
                                )
                            }
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