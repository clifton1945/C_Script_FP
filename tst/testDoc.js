"use strict";

//  *********** DOM  DATA    REQUIRE functions.js
var book = GET_book();
var C_Grp_NL = GET_C_Grp_NL(book);
var V_Grp_NL = GET_V_Grp_NL(book);
var Tst_DivFut_Vrs4 = V_Grp_NL.item(2).children.item(5);


/**
 *    --------------- CODE FOR STYLING Verses  ------------
 */
/**
 * :: nodeNdx[Int], nodeColl[collection] -> wt [Int]
 * @param ndx
 * @param arr
 * @returns {number}
 */
var fCALC_Wt = (ndx, arr)=> {

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
    vNode.style.fontSize = fSET_Style_Str(ndx, arr);
    return vNode;
}; // -> UPDATED vNode.style
//*** var MAP_
//
//var VerseArr = R.mapObjIndexed(RESTYLE_1_verse, V_FUT_NL); // fn, NL->NL
////  TEST


/**
 * BEGINNING, SIMPLE node:: styleProperty, styleValue, node -> node CHANGED
 * @param propKey
 * @param propVal
 * @param node
 * @returns {*}
 * @constructor
 */
const CHANGE_VerseNodeStyle = function (propKey, propVal, node) {
    //R.assoc('color', 'red', node.style); // CHANGES copy NOT node
    node.style[propKey] = propVal; // note: not FP style
    return node
};
var tst_CHANGE_VerseNodeStyle = function (tst = false) {
    if (tst) {
        C_Both(
            `tst_CHANGE_VerseNodeStyle
     EXP TO SEE changes in testDoc.html.`
        );
        var VSO = Tst_DivFut_Vrs4.style;
        //TEST BEFORE
        VSO.fontSize = "200%"; //FORCE fontSize
        VSO.color = "green"; //FORCE fontSize
        var b = R.prop('color', Tst_DivFut_Vrs4.style);
        C_Both("style.before IS " + JSON.stringify(b));
        // TEST  CODE UNDER TEST

        //CHANGE_VerseNodeStyle = function(prop, val, node);
        // REQUIRE set_verse_style.js
        Tst_DivFut_Vrs4 = CHANGE_VerseNodeStyle("color", "red", Tst_DivFut_Vrs4);

        // TEST AFTER
        var a = R.prop('color', Tst_DivFut_Vrs4.style);
        C_Both("style.after IS " + JSON.stringify(a));
        console.assert(a === 'red' && a !== b, "EXP VerseStyle color:'red' NOT ${a}")
    }
};

/**
 * :: STY: obj, NL: [node] -> null
 *
 * @constructor
 */
const _UPDATE_All_Verses = function (NL, so = StyleConstants) {
    //SELECT_StyleConstants_FOR_each_VerseGrp
    var cut = (SC, node, ndx, nl) => sc[ndx];
    R_forEachIndexed()
    return cut
};
function UPDATE_All_Verses_(styleConstants, NL) {
    R.flip(_UPDATE_All_Verses(NL, styleConstants))
}
var tstUPDATE_All_Verses_ =
    function tst__UPDATE_All_Verses_(tst = false) {
        // require objects.js StyleConstants
        var tstNL = GET_V_Grp_NL(book);
        // CODE UNDER TEST
        RET = UPDATE_All_Verses_(StyleConstants, tstNL);
        // TEST
        C_Both(RET.fut.name);
        //ASSERT
    };


/**
 *   -------------- TESTS --------------
 * */
/**
 * ***** TEST FRAMEWORK **************
 *   a Dashboard for selecting tests,
 */
function main() {
    tstUPDATE_All_Verses_(true);
    tst_CHANGE_VerseNodeStyle(true); // require set_verse_styles.js
    tst_coll_len_gt_1(true);
}
//  ------------------ TEST FUNCTIONS ------------
var RET, EXP;
//var fTRACE_Tmpl = (v, n, a)=> `[v.style,n,a.len]: ${ v.style.fontSize}, ${n}, ${a.length}`;

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
var tst_coll_len_gt_1 = function tst_coll_len_gt_1(tst = false) {
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
/**
 * *** TESTING just testDoc.html Events
 */
main();
//SET_All_Verse_Styles(V_Grp_NL);
BindHandlers(book);
