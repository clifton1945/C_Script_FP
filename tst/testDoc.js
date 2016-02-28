"use strict";

/**
 * ***** TEST FRAMEWORK **************
 *   a Dashboard for selecting tests,
 */
function main() {
    tst_CHANGE_VerseNodeStyle(true); // require set_verse_styles.js
    tst_coll_len_gt_1();
}
// **********************************

//  DOM  DATA    REQUIRE functions.js
var book = GET_book();
var C_Grp_NL = GET_C_Grp_NL(book);
var V_Grp_NL = GET_V_Grp_NL(book);
var Tst_DivFut_Vrs4 = V_Grp_NL.item(2).children.item(5);

/**
 * TEST DATA FOR Verse Styles
 * */
var V_FUT_Tmpl = '.ChptrReadGrps .cur  .VerseReadGrps > .fut div';
var V_FUT_NL = book.querySelectorAll(V_FUT_Tmpl);
var V_FUT_Ar = [...book.querySelectorAll(V_FUT_Tmpl)];
//
var V_PST_Tmpl = '.ChptrReadGrps .cur  .VerseReadGrps > .pst div';
var V_PST_NL = book.querySelectorAll(V_PST_Tmpl);
var V_PST_Ar = [...book.querySelectorAll(V_PST_Tmpl)];
// *** TEST FUNCTIONS
var fTRACE_Tmpl = (v, n, a)=>
    `[v.style,n,a.len]: ${ v.style.fontSize}, ${n}, ${a.length}`;


/**
 *    *** CODE FOR STYLING Verses
 */
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
 * :: Node, vNdx, NL -> RESTYLED vNode
 * @param vNode
 * @param ndx
 * @param arr
 * @returns {*}
 * @constructor
 */
var RESTYLE_1_verse = function RESTYLE_1_verse(vNode, ndx, arr) {
    //TRACE_Both('before ' + fTRACE_Tmpl(vNode, ndx, arr));
    vNode.style.fontSize = fSET_Style_Str(ndx, arr);
    //TRACE_Both(' after ' + fTRACE_Tmpl(vNode, ndx, arr));
    return vNode;
}; // -> UPDATED vNode.style
//*** var MAP_
//
var VerseArr = R.mapObjIndexed(RESTYLE_1_verse, V_FUT_NL); // fn, NL->NL
//  TEST


/**
 * ********* TESTS *******************
 * */
var RET, EXP;


/**
 * BEGINNING, SIMPLE node:: styleProperty, styleValue, node -> node CHANGED
 * @param prop
 * @param val
 * @param node
 * @returns {*}
 * @constructor
 */
const CHANGE_VerseNodeStyle = function(prop, val, node) {
    //R.assoc('color', 'red', node.style); // CHANGES copy NOT node
    node.style[prop] = val;
    return node
};
var tst_CHANGE_VerseNodeStyle = function (tst = false) {
    // DID NOT USE lens
    //var classLens = R.lensProp('class');
    //var styleLens = R.lensProp('style');
    //var colorLens = R.lensProp('color');
    ////var futLens = R.lensProp('fut');
    //var fontSizeLens = R.lensProp('fontSize');
    //var so_ = (n) => n.style;
    if (tst) {
        var VSO = Tst_DivFut_Vrs4.style;
        // CODE UNDER TEST
        //function CHANGE_VerseNodeStyle(prop, val, node) {
        //    // below CHANGES copy NOT node
        //    //R.assoc('color', 'red', node.style);
        //    node.style[prop] = val;
        //    return node
        //}
        //TEST BEFORE
        VSO.fontSize = "200%"; //FORCE fontSize
        VSO.color = "green"; //FORCE fontSize
        var b = R.prop('color', Tst_DivFut_Vrs4.style);
        C_Both("style.before " + JSON.stringify(b));
        // TEST  CODE UNDER TEST

        //CHANGE_VerseNodeStyle = function(prop, val, node);
        // REQUIRE set_verse_style.js
        Tst_DivFut_Vrs4 = CHANGE_VerseNodeStyle("color", "red", Tst_DivFut_Vrs4);

        // TEST AFTER
        var a = R.prop('color', Tst_DivFut_Vrs4.style);
        C_Both("style.after " + JSON.stringify(a));
        console.assert(a === 'red' && a !== b, "EXP VerseStyle color:'red' NOT ${a}")
    }
};



/**
 * :: collection -> Bool: t | f
 * @param coll
 * @returns {*}
 */
const coll_len_gt_1 = function coll_len_gt_1(coll) {
    var f = R.pipe(
        R.prop('length')
        , R.dec
        , R.lt(2)
        //TRACE(x=>x)
    );
    return f(coll)
};

var tst_coll_len_gt_1 = function(tst = false) {
    if (tst) {
        C_Both('tst_coll_len_gt_1, EXP NO FAIL. ');
        // TEST: coll_len_gt_1(nodelist)
        console.assert(coll_len_gt_1(V_FUT_NL) && R.not(coll_len_gt_1(V_PST_NL))
            , "FUT:true && PST:false");
        // TEST: coll_len_gt_1(Array of nodes)
        console.assert(coll_len_gt_1(V_FUT_Ar) && R.not(coll_len_gt_1(V_PST_Ar))
            , "FUT:true && PST:false");
    }
};
// ****************************
//
var Style_Wt = function StyleWt(nl) {
    // thisStyleConstants: lrgWt, smlWt, calcCode OR thisStyleObj
    // thisNode vars: node, nodeNdx, nodeList
    //R.if(coll_len_gt_1(nl)
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
        , R.prop('style'
            , NL[R.prop('length', NL) - 1]
        ));
})(V_FUT_NL);
EXP = "50%";
console.assert(RET === EXP
    , `lastVerse.fontSize-EXP:${EXP}, NOT ${RET}'`
);


/**
 * *** TESTING just testDoc.html Events
 */
main();
//SET_All_Verse_Styles(V_Grp_NL);
BindHandlers(book);
