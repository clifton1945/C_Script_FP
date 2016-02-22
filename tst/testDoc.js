"use strict";


var book = GET_book();
var C_Grp_NL = GET_C_Grp_NL(book);
var V_Grp_NL = GET_V_Grp_NL(book);

// *** TESTS FOR Verse Styles
// start at the end with FP
// get one Verse grp NL - use FUT for now
var V_FUT_Tmpl = '.ChptrReadGrps .cur  .VerseReadGrps > .fut div';
var V_Fut_NL = [...book.querySelectorAll(V_FUT_Tmpl)];
var fTRACE_Tmpl = (v, n, a)=> `[v.style,n,a.len]: ${ v.style.fontSize}, ${n}, ${a.length}`;
// map fn_setStyle(v,n,a)
var MOD_1_verse = function MOD_1_verse(v, n, a) {
    var fWt = (val, ndx, arr)=> {
        var lrgWt = .9;
        var smlWt = .5;
        let len = arr.length - 1;
        // TODO compare with PST to consoledate!
        return (len > 0)
            ? (-(lrgWt - smlWt) / len * ndx + lrgWt)
            : lrgWt;  // start small grow larger.
    };
    var wt = fWt(v, n, a);
    TRACE_Both(fTRACE_Tmpl(v, n, a));
    v.style.fontSize = `${wt * 100}%`;
    TRACE_Both(fTRACE_Tmpl(v, n, a)), V_Fut_NL;
};
//var MAP_
var VerseArr = R.mapObjIndexed(MOD_1_verse, V_Fut_NL);
//  TEST


// *** TESTING just testDoc.html Events
//SET_All_Verse_Styles(V_Grp_NL);
BindHandlers(book);
