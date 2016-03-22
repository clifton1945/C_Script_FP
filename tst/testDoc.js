//"use strict";
//var R = require('ramda-maybe');
//import { testStr, C_It } from '..//src//modules-compiled'; // WORKS but throws Inspection 'can't resolve

/**
 * ***** TEST FRAMEWORK **************
 *   a Dashboard for selecting tests,
 */
/**
 * tst_DOM_NL
 * NOTE: IN js, UNPACKING IS CALLED Destructuring
 * @param tst
 */
var tst_DOM_NL = function (tst = false) {
    tstCode(true);
};
function main() {
    var all = false;
    tst_DOM_NL(all);
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
//var NodeListTmpl = '.book .ChptrReadGrps .cur  .VerseReadGrps > div';
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
 *          Get all descendants that match selector
 * cssQuery_ :: String -> Node -> NodeList
 * Note: NodeList is array-like so you can run ramda list functions on it.
 */
var cssQuery_ = R.invoker(1, 'querySelectorAll');
/**
 *          Mutate style properties on an element
 */
var setStyle = R.curry((value, node) => {
    return Object.assign(
        node.style, value)
});
//   ------------------ my Names  -----------------------------------
/**
 *          NodeListTmpl:: template Str FOR document.cssQuery_
 *
 * @type {Function|*}
 * @private
 */
var NodeList_fut = '.book .ChptrReadGrps .cur  .VerseReadGrps > .fut .vers';
var NodeList_cur = '.book .ChptrReadGrps .cur  .VerseReadGrps > .cur .vers';
/**
 *           NodeList_:: n -> o -> n
 *  Get all descendants that match selector
 */
var NodeList_ = R.flip(cssQuery_)(document);


/**
 *   --------------- CURRENT --------------------------
 * */
var tstCode = function () {
    MSG = 'tst_DOM_NL.CREATE_StyleTmpl->\n --- ';
    /**
     *          TEST_ONLY A subset, IN this case 'fut' OF objects/StyleConstants
     * @type {{2: {name: string, smlWt: number, lrgWt: number, calcWt: Function, styleTmpl: {backgroundColor: string, opacity: string, fontSize: string}}}}
     */
    var tstStyleConstants = {
        2: {
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
            , styleTmpl: {
                backgroundColor: "rgba(145, 248, 29, 0.29)"
                , opacity: ".75"
                , fontSize: "75%"
            }
        }
    };

    // aStyleWt (styleState)(ndx, coll) -> Wt
    function aStyleWt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }  //REFACT THIS TO full  param sty0, val, ndx, coll

    // aStyleObj (wt)-> obj
    function aStyleCss (wt) {
        R.pipe(// ADD WT
            R.prop('2'),
            R.prop('styleTmpl'),
            TRACE_((obj) => ` a Style:${JSON.stringify(obj)} FOR Verse[${ndx}]`)
        );
    }  // partial

    // NOW actually SET the Element's style
    function setStyle_FROM_styleCSS (styleCSS, node) {

    }

    /**
     *          aStyle_SET_FOR_aVerse_FROM_(styleCSS, node, ndx, coll) -> setStyle
     * :: function (o)(v,n,c)-> v
     * @param StyleStt
     * // Verse State IS
     * @param node
     * @param ndx
     * @param coll
     * @returns {*}  - node.style MUTATED
     * @constructor
     * @private
     */
    var aStyle_FOR_aVerse_ = R.curry(
        function aStyleFORaVerse_(styleState, node, ndx, coll) {
            //MAYBE R_forEach || map
            // aStyleWt( styleState, ndx, coll)
            // aStyleCSS
            // setStyle_FROM_styleCSS
            // FIX THIS 1st just get it working w/ th three functions
            // 1. properly pipe wt -> css -> set in this
            return setStyle(aStyleCSS, node)
        });

    /**
     *          aStyle FOR_eachVerse_
     * StyledVerseList OF MUTATED Node.style FROM NodeList.
     */
    var aStyle_FOR_eachVerse = R.mapObjIndexed(
        aStyle_FOR_aVerse_(StyleConstants) // partial. WANTS aNode FROM the NL below.
        , NodeList_(NodeList_fut)               // this SATISFIES each aStyle_FOR_aVerse_
    );

    aStyle_FOR_eachVerse;
    // NOTE: this is a collection that is not needed
    // NOTE: this is a collection of verse CSSStyleDeclarations, not a function
    //C_Both(MSG);
};
//  ------------------ INVOkE TEST ------------
main();
// Modules
//import * as fn from '../src/modules-compiled.js'; // WORKS
//C_It(testStr);  // OK
// ------------- MODULES ---------------------
//R.find(R.is(String), [ 1, 'a', 'b', 12 ]);
//R.add(1, 'tt'); //=> 3
//  ------------------ old MAYBE USEFUL WHEN I GET TO ALL THREE NODELISTS -------
/**
 * _____HOLDING_SEPARATE_StyleConst_BY_VGrpClass_INTO_List
 * @param StyObj
 * @returns {*}
 * @constructor
 */
var _____HOLDING_SEPARATE_StyleConst_BY_VGrpClass_INTO_List = function (StyObj) {
    var PST = 0, CUR = 1, FUT = 2;
    var f_ = (n)=> {
        return StyObj[n]
    };
    return R.map(f_, [PST, CUR, FUT]);  // note GIVEN LIST:[INT] -> [OBJ]
};
/**
 * _____HOLDING_TRANSFORM_VGrp_NL_INTO_Vrs_List:: {} -> []
 * @returns {*}
 * @constructor
 */
var _____HOLDING_TRANSFORM_VGrp_NL_INTO_Vrs_List = function (NL) {
    var f_ = (val, key, obj)=> NL[key].children;
    return R_forEachIndexed(f_, NL);
};