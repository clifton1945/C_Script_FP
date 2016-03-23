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
    tstCode(true);
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
var MSG = '';

/**
 *   ----------------------------------------- TEST REQUIRED FUNCTIONS  -----
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
var NodeList_ = R.flip(cssQuery_)(document); // partial
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
            , calcWt (sObj, vObj) {
                //noinspection JSUnusedLocalSymbols
                let {ver, ndx, ary} = vObj;
                let {smlWt, lrgWt} = sObj;
                let len = ary.length - 1;
                return (len > 0)
                    ? (-(lrgWt - smlWt) / len * ndx + lrgWt)
                    : lrgWt;  // always lrgWt
            }
            , wt: 1
            , styleStr: ` backgroundColor: "rgba(145, 248, 29, 0.29)", opacity: "0.6", fontSize: "0.75%"`
            //, styleTmpl: ` backgroundColor: "rgba(145, 248, 29, 0.29)", opacity: "${this.wt}", fontSize: "${this.wt}%"`
        }
    };

    /**
     *          aStyleWt (styleState)(ndx, coll) -> Wt
     * @param min
     * @param max
     * @returns {*}
     */
    var aStyleWt_ = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
        //REFACT THIS TO full  param sty0, val, ndx, coll
    };

    /**
     *          aStyleCssStr_:: Str Template FOR aVerse FROM the Style Constants Object
     *          o -> Str
     * @param styleConstants
     * @returns {*} string literal template READY TO FULFILL WITH a Weight
     * @private
     */
    var aStyleCssStr_ = function (styleConstants) {
        return R.pipe(
            R.prop('2'),
            R.prop('styleStr'),
            TRACE_((obj) => `   IN  aStyleCssStr_:${JSON.stringify(obj)}`)
        );
    };

    /**
     *          aStyleCSS_FROM(template)(wt)-> CSS object
     * @param cssTmpl
     * @param wt
     * @returns {Function|*}
     */
    var aStyleCSS_ = R.curry(function (cssTmpl, wt) {
        return cssTmpl;  // hard coded testing only
    });

    /**
     *              actually SET the Element's CSS style
     */
    var setStyle_FROM_styleCSS_ = R.curry(function (css, node) {
        return setStyle(css, node)
    });

    /**
     *          aStyle_SET_FOR_aVerse_FROM_(styleCSS, node, ndx, coll) -> setStyle
     * :: function (o)(v,n,c)-> v
     * // Verse State IS
     * @param styleCnstnts
     * @param node
     * @param ndx
     * @param coll
     * @returns {*}  - node.style MUTATED
     * @constructor
     * @private
     */
    var aStyle_FOR_aVerse_ = function aStyleFORaVerse_(styleCnstnts, node, ndx, coll) {
        // this is the callBack FOR R_forEach || map
        // aStyleWt( styleCnstnts, ndx, coll)
        // aStyleCssStr_(styleConstants)
        // aStyleCSS_(styleCnstnts, aStyleWt)
        // setStyle_FROM_styleCSS_(aStyleCSS_, node)
        // 1. properly pipe wt -> css -> set in this

        var aStyleCSS = aStyleCSS_(12345);
        var setStyle_FROM_styleCSS = setStyle_FROM_styleCSS_();
        var f, f_ = (styCnts) => R.pipe(
            aStyleCssStr_
            , TRACE(', #1')
            , aStyleCSS  // hardcoded for test
            , TRACE(', #2')
            , setStyle_FROM_styleCSS
            ,TRACE(', #3')
        );
        f = f_(styleCnstnts)(node);
        return f()
    };
    var aStyle_FOR_aVerse_c_ = R.curry(aStyle_FOR_aVerse_);

    var DOM_SET_FOR_aVerse_ = () => (elmnt, ndx, coll) => {};

    /**
     *          DOM_SET_FOREACH_Verse
     * StyledVerseList OF MUTATED Node.style FROM NodeList.
     */
    var DOM_SET_FOREACH_Verse = function (qrySlct) {
        return R.mapObjIndexed(
            aStyle_FOR_aVerse_c_(tstStyleConstants)      // partial. WANTS aNode FROM the NL below.
            , NodeList_(qrySlct)               // this SATISFIES each aStyle_FOR_aVerse_
        )
    };
//  ------------------ INVOKE TEST ------------
    DOM_SET_FOREACH_Verse(NodeList_fut);
};

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