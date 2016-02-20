/**
 * Created by CLIF on 2/19/2016.
 */
"use strict";
// *********** TRACE HELPERS
const Cnt = R.curry(
    function (NDX, coll) {
    return R.prop('childElementCount', coll[NDX]);
});
const C_GrpStateCnt = R.curry(
    function (nameStr, coll) {
        C_Both(`${nameStr}.stateCnt:p,c,f [${Cnt([PST], coll)},${Cnt([CUR], coll)},${Cnt([FUT], coll)}]`);
        return coll
    });
// ***********  CODE DOM && DATA REFERENCE
const C_Grp_Tmpl = '.ChptrReadGrps > div';
const V_Grp_Tmpl = '.ChptrReadGrps .cur  .VerseReadGrps > div';
const book = document.querySelector('.book');
var C_Grp_NL = book.querySelectorAll(C_Grp_Tmpl); // NL:: 3 div.classes: pst, cur, fut
var V_Grp_NL = book.querySelectorAll(V_Grp_Tmpl); // NL:: 3 div.classes: pst, cur, fut
const GET_V_Grp_NL = (book) =>  book.querySelectorAll(V_Grp_Tmpl);

// *********** OLD BUT STILL IN USE
const Doc_It = (txt) => document.querySelector(".console").textContent = txt;
const C_It = (txt) => console.log(txt);
const C_Both = (txt) => {
    C_It (txt);
    Doc_It (txt);
};

