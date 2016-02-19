/**
 * Created by CLIF on 2/19/2016.
 */
"use strict";
// *********** TRACE HELPERS

const Doc_It = (txt) => document.querySelector(".console").textContent = txt;
const C_It = (txt) => console.log(txt);
const C_Both = (txt) => {
    C_It (txt);
    Doc_It (txt);
};

