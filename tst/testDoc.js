"use strict";

/**
 * ***** TEST FRAMEWORK **************
 *   a Dashboard for selecting tests,
 */
/**
 * tst_DOM_NL
 * NOTE: IN js, UNPACKING IS CALLED Destructuring
 * @param tst
 */
var tst_DOM_NL = function (tst = false) { tstCode();};
function main() {
    var all = false;
    tst_DOM_NL(true);
    //tst_COMBINE_VGrp_Style_List_AND_VGrp_Verse_List_INTO_VGrp_List(all);
    //tst_SEPARATE_StyleConst_BY_VGrpClass_INTO_List(all);
    //tst_SELECT_StyleConstants_forEach_VerseGrp(all);
    //tst_CHANGE_VerseNodeStyle(all); // require STYLE_Verses.js
    ////tst_coll_len_gt_1(all);
}

/**
 * GLOBAL vars
 * require functions-compiled.js, objects-compiled.js
 * */
//  *********** DOM  DATA    REQUIRE functions.js
var book = GET_book();
//var V_Grp_Tmpl = '.book .ChptrReadGrps .cur  .VerseReadGrps > div';
//var VG_NL = GET_V_Grp_NL(GET_book());
//var VG_AR = [...VG_NL];
//var C_Grp_NL = GET_C_Grp_NL(book);
//var V_Grp_NL_ = GET_V_Grp_NL(book);
//var Tst_DivFut_Vrs4 = V_Grp_NL_.item(2).children.item(5);
var MSG = '';

/**
 *   --------------- TEST REQUIRED FUNCTIONS  --------------------------
 * */
/**
 * Get all descendants that match selector
 * cssQuery :: String -> Node -> NodeList
 * Note: NodeList is array-like so you can run ramda list functions on it.
 */
var cssQuery = R.invoker(1, 'querySelectorAll');
/**
 * Mutate style properties on an element
 */
var setStyle = R.curry( (value, node) => {
        return Object.assign(
            node.style, value)
    });
/**
 * V_Grp_Tmpl:: template Str FOR document.cssQuery
 *
 * @type {Function|*}
 * @private
 */
var V_Grp_Tmpl = '.book .ChptrReadGrps .cur  .VerseReadGrps > .fut .vers';
/**
 * styleTmpl_() :: hardCoded Style Template FROM typically StyleConstants
 * @type {Function|*}
 * @private
 */
var styleTmpl_ = R.compose(R.prop('styleTmpl'),  R.prop('2'));

/**
 *   --------------- CURRENT TEST --------------------------
 * */
var tstCode = function () {
    MSG = 'tst_DOM_NL-> ';
    var tstStyleConst = {    2: {
        name: 'fut'
        , smlWt: .4
        , lrgWt: .8
        , calcWt: (sObj, vObj) => {
            //noinspection JSUnusedLocalSymbols
            let {ver, ndx, ary} = vObj;
            let {smlWt, lrgWt} = sObj;
            let len = ary.length - 1;
            return (len > 0)
                ? (-(lrgWt - smlWt) / len * ndx + lrgWt)
                : lrgWt;  // always lrgWt
        }
    }};

    var thisStyle = styleTmpl_(StyleConstants);
    var CUT = R.pipe(
        cssQuery(V_Grp_Tmpl),
        R.map(setStyle(
                thisStyle)
        )
    )(document);
    C_Both(JSON.stringify(thisStyle));
};


//  ------------------ INVOkE TEST ------------

main();
//  ------------------ old MAYBE USEFUL -------
/**
 * SEPARATE_StyleConst_BY_VGrpClass_INTO_List
 * @param StyObj
 * @returns {*}
 * @constructor
 */
var SEPARATE_StyleConst_BY_VGrpClass_INTO_List = function (StyObj) {
    var PST = 0, CUR = 1, FUT = 2;
    var f_ = (n)=> {
        return StyObj[n]
    };
    return R.map(f_, [PST, CUR, FUT]);  // note GIVEN LIST:[INT] -> [OBJ]
};
/**
 * TRANSFORM_VGrp_NL_INTO_Vrs_List:: {} -> []
 * @returns {*}
 * @constructor
 */
var TRANSFORM_VGrp_NL_INTO_Vrs_List = function (NL) {
    var f_ = (val, key, obj)=> NL[key].children;
    return R_forEachIndexed(f_, NL);
};