"use strict";


var book = GET_book();
var C_Grp_NL = GET_C_Grp_NL(book);
var V_Grp_NL = GET_V_Grp_NL(book);

// *** TESTS FOR Verse Styles
// start at the end with FP
// get one Verse grp NL - use FUT for now
var V_FUT_Tmpl = '.ChptrReadGrps .cur  .VerseReadGrps > .fut div';
var V_Fut_NL = [...book.querySelectorAll(V_FUT_Tmpl)];
// map fn_setStyle(v,n,a)
var MOD_verse = function (v, n, a) {
    TRACE_Both("v.cls,n,a.len: " + v.className + "," + n + "," + a.length), V_Fut_NL;
};
var verseArr = R.mapObjIndexed(MOD_verse, V_Fut_NL);
//  TEST


// *** TESTING just testDoc.html Events
//SET_All_Verse_Styles(V_Grp_NL);
BindHandlers(book);
