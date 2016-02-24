"use strict";

var book = GET_book();
var C_Grp_NL = GET_C_Grp_NL(book);
var V_Grp_NL = GET_V_Grp_NL(book);

// *** TESTS FOR Verse Styles
// start at the end with FP
// get one Verse grp NL - use FUT for now
var V_FUT_Tmpl = '.ChptrReadGrps .cur  .VerseReadGrps > .fut div';
var V_FUT_NL = book.querySelectorAll(V_FUT_Tmpl);
var V_FUT_Ar = [...book.querySelectorAll(V_FUT_Tmpl)];

var V_PST_Tmpl = '.ChptrReadGrps .cur  .VerseReadGrps > .pst div';
var V_PST_NL = book.querySelectorAll(V_PST_Tmpl);
var V_PST_Ar = [...book.querySelectorAll(V_PST_Tmpl)];
var fTRACE_Tmpl = (v, n, a)=>
    `[v.style,n,a.len]: ${ v.style.fontSize}, ${n}, ${a.length}`;
//
var fCALC_Wt = (ndx, arr)=> {
    //:: nodeNdx, NL -> wt Int
    var lrgWt = .9;
    var smlWt = .5;
    let delta = lrgWt - smlWt;
    let len = arr.length - 1;  // OR nl.childElementCount
    return (len > 1)
        // below is code for CUR|FUT>>fut:start large grow smaller.
        ? lrgWt - delta / len * ndx
        : lrgWt;  // ALWAYS lrgWt:
    // below is code for CUR|CUR>>CUR:
    //? smlWt + delta / len * ndx
    //: lrgWt;  // ALWAYS lrgWt:
    // below is code for pst>>PST|CUR. start small grow larger..
    //? smlWt + delta / len * ndx
    //: lrgWt;  // ALWAYS lrgWt:

}; // -> wt Int
//
/**
 * :: [Int] index of verse Node, [Obj]verses NodeList -> [Str]style
 * @param nodeNdx
 * @param NL
 * @returns {*}
 */
var fSET_Style_Str = function fSET_style_Str(nodeNdx, NL) {
    //:: Vndx, NL->Style Str
    return `${fCALC_Wt(nodeNdx, NL) * 100}%`
}; // [Str] style string

/**
 * :: Node, vNdx, NL -> vNode-UPDATED
 * @param vNode
 * @param ndx
 * @param arr
 * @returns {*}
 * @constructor
 */
var MOD_1_verse = function MOD_1_verse(vNode, ndx, arr) {
    //:: vNode, ndx, arr -> UPDATED vNode.style.
    //TRACE_Both('before ' + fTRACE_Tmpl(vNode, ndx, arr));
    // this is THE PRIME CODE::
    vNode.style.fontSize = fSET_Style_Str(ndx, arr);
    //TRACE_Both(' after ' + fTRACE_Tmpl(vNode, ndx, arr));
    return vNode;
}; // -> UPDATED vNode.style
//*** var MAP_
//
var VerseArr = R.mapObjIndexed(MOD_1_verse, V_FUT_NL); // fn, NL->NL
//  TEST

// *********** TESTS ********************
var RET, EXP;
var nl_gt_1 = function nl_gt_1(coll) {
    return R.lt(2, TRACE((x)=>x)(R.dec(R.prop('length', coll))))
};

//var nl_gt_1 = function nl_gt_1 (coll) {
//        return R.lt(2, TRACE((x)=>x)(R.dec(R.prop('length', coll ))))
//};
// TEST: nl_gt_1(nodelist)
console.assert(nl_gt_1(V_FUT_Ar) && R.not(nl_gt_1(V_PST_Ar))
    , "FUT:true && PST:false");

var Style_Wt = function StyleWt(nl) {
    // thisStyleConstants: lrgWt, smlWt, calcCode OR thisStyleObj
    // thisNode vars: node, nodeNdx, nodeList
    //R.if(nl_gt_1(nl)
    //    , ()=> "gt 1"
    //    , ()=> "lte 1"
    //)
};

/**
 * a FP_STYLE TEST: V_FUT_NL :: nodelist -> Str: targetNode.style.fontSize >>
 * style_fontSizefNode:: targetNode->fontSize>>
 * = (R.prop('fontSize', tNodeStyle))(styleObj) //-> fontSize of target Node
 *          (R.prop('style', tNode)(tNode)) -> the  styleObj of the targetNode
 * targetNode:: NL->lastNode
 * >> (NL)=> NL[R.prop('length', NL) - 1]
 */
RET = ((NL) => {
    return R.prop('fontSize'
        , R.prop('style', NL[R.prop('length', NL) - 1]
        ));
})(V_FUT_NL);
EXP = "50%";
console.assert(RET === EXP, `lastVerse.fontSize-EXP:${EXP}, NOT ${RET}'`);
// *** TESTING just testDoc.html Events
//SET_All_Verse_Styles(V_Grp_NL);
BindHandlers(book);
