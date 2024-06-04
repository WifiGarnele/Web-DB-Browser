import React from 'react';
import ReactDOM from 'react-dom/client';

import Body from "./body";
import Main from "./main";


const bearbeitung=window.sessionStorage.getItem("bearbeitung")
const root = ReactDOM.createRoot(document.getElementById('root'));
if (!bearbeitung){
    root.render(
        <Main />
    );
}else {
    root.render(
        <Body />
    );
}


