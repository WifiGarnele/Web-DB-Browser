import React,{useState} from "react";

function Bearbeitung(){
    const [datei,setDatei]=useState(null)
    const [dateiname,setDateiname]=useState(null)

    async function getDatei(){
        try{
            const response= await fetch('http://localhost:3002/datei');
            const data= await response.blob()
            setDatei(data)
        }catch (err){
            console.log(err)
        }
    }
    async function getDateinamen(){
        try{
            const response= await fetch('http://localhost:3002/dateiname')
            const dateiname= await response.json()
            console.log(dateiname)
            setDateiname(dateiname)
        }catch (err){
            console.log(err)
        }
    }

    async function beenden(){
        await getDatei()
        await getDateinamen()
        const url = window.URL.createObjectURL(datei);
        const link = document.createElement('a');
        link.href = url;
        link.download = dateiname;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.sessionStorage.removeItem("bearbeitung")
        window.location.href="/"
    }
    return(
        <div id="container">
            <button onClick={() => beenden()}>Bearbeitung beenden</button>
        </div>
    )
}
export default Bearbeitung