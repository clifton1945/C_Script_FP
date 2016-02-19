/**
 * Created by CLIF on 2/19/2016.
 */
"use strict";
// *********** TRACE HELPERS
const Cnt = R.curry(function (NDX, coll) {
    return R.prop('childElementCount', coll[NDX]);
});
const C_GrpStateCnt = R.curry(
    function C_GrpStateCnt (nameStr, coll) {
    C_Both(`${nameStr}.stateCnt:p,c,f [${Cnt([PST], coll)},${Cnt([CUR], coll)},${Cnt([FUT], coll)}]`);
    return coll
});

// OLDER
const Doc_It = (txt) => document.querySelector(".console").textContent = txt;
const C_It = (txt) => console.log(txt);
const C_Both = (txt) => {
    C_It (txt);
    Doc_It (txt);
};

