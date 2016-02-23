"use strict";


var book = GET_book();
var C_Grp_NL = GET_C_Grp_NL(book);
var V_Grp_NL = GET_V_Grp_NL(book);

// *** TESTS FOR Verse Styles
// start at the end with FP
// get one Verse grp NL - use FUT for now
var V_FUT_Tmpl = '.ChptrReadGrps .cur  .VerseReadGrps > .fut div';
var V_Fut_NL = [...book.querySelectorAll(V_FUT_Tmpl)];
var fTRACE_Tmpl = (v, n, a)=>
    `[v.style,n,a.len]: ${ v.style.fontSize}, ${n}, ${a.length}`;
//
var fCALC_Wt = (ndx, arr)=> {
    //:: ndxNode, NL -> wt Int
    var lrgWt = .9;
    var smlWt = .5;
    let len = arr.length - 1;
    // TODO compare with PST to consoledate!
    return (len > 0)
        ? (-(lrgWt - smlWt) / len * ndx + lrgWt)
        : lrgWt;  // start small grow larger.
}; // -> wt Int
//
var fSET_Style_Str = function fSET_style_Str(ndxNode, NL) {
    //:: Vndx, NL->Style Str
        return `${fCALC_Wt(ndxNode, NL) * 100}%`
};//-> style Str

var MOD_1_verse = function MOD_1_verse(vNode, ndx, arr) {
    //:: vNode, ndx -> UPDATED vNode.style.
    TRACE_Both('before ' + fTRACE_Tmpl(vNode, ndx, arr));
    // this is THE PRIME CODE
    vNode.style.fontSize = fSET_Style_Str(ndx, arr);
    TRACE_Both(' after ' + fTRACE_Tmpl(vNode, ndx, arr));
    return vNode;
}; // -> UPDATED vNode.style
//
//*** var MAP_
var VerseArr = R.mapObjIndexed(MOD_1_verse, V_Fut_NL); // fn, NL->NL
//  TEST

// *** TESTING just testDoc.html Events
//SET_All_Verse_Styles(V_Grp_NL);
BindHandlers(book);
