//"use strict";
//var R = require('ramda-maybe');
//import { testStr, C_It } from '..//src//modules-compiled'; // WORKS but throws Inspection 'can't resolve

/**
 * ***** TEST FRAMEWORK **************
 *   a Dashboard for selecting tests,
 */
function main() {
    var all = false;
    tstCode(true);
    tst_R_Lens(all);
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
 *          tst_R_Lens 1st LEARNING Lens:
 *          similar if not the same as test in ramda_tests.js
 * @param tst
 * @returns {*}
 */
var tst_R_Lens = function (tst = false) {
    if (tst) {
        MSG = 'tst_R_Lens/';
        /**
         *          Style Constants for testing: a  subset, IN this case 'fut' OF objects/StyleConstants
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
                , aStyleObj: {
                    backgroundColor: "rgba(145, 248, 29, 0.29)"
                    , fontSize: '70%'
                    , opacity: 0.5
                }
                , styleStr: `{"backgroundColor": "rgba(145, 248, 29, 0.29)", "opacity": "0.6", "fontSize": "75%"}`
                //, styleTmpl: ` backgroundColor: "rgba(145, 248, 29, 0.29)", opacity: "${this.wt}", fontSize: "${this.wt}%"`
            }
        };
//  ------------------ SET TEST ------------
//  ------------------ INVOKE TEST ------------
        MSG += '\n......Style lensPath W/ aStyleObj...........';
        var Lens2SO_ = R.lensPath(['2', 'aStyleObj', 'fontSize']);
        var SO1 = R.view(Lens2SO_, tstStyleConstants);
        //MSG += '\n' + `  BEFORE: expect fontSize: ${JSON.stringify(SO1)}===70% `;
        var SO2 = R.set(Lens2SO_, '25%', SO1);
        var SO3 = R.view(Lens2SO_, SO2);
        //MSG += '\n' + `  AFTER:  expect fontSize: ${JSON.stringify(SO3)}===25% `;

        MSG += '\n USE Lens in DOM ->  ';
        var aVerse_tmplt = '.book .ChptrReadGrps .cur  .VerseReadGrps > .fut div';
        var aVerseNodeList = document.querySelectorAll(aVerse_tmplt);
        //var EXPLORE R.invoker(1, 'querySelectorAll')

        MSG += '\n' + `...USE headLens = R.lensIndex(0)`;
        var headLens = R.lensIndex(0);
        var lst5 = R.pipe(
            R.prop('innerText')
            , R.slice(16, 21)
        )(
            R.view(headLens, aVerseNodeList)
        );
        var exp = R.equals(lst5, 'ndx:2');
        MSG += '\n' + `    expect ${lst5} === ndx:2 [${exp}]`;
        //        TEST DATA
        //NOTE: POSSIBLE REMOVED + of += REMOVED WHILE Focus Here
        MSG += '\n\n' + "...USE a Style Lens TO MUTATE a Verse.style Property";
        var theFirstVerse = aVerseNodeList.item(0);
        //theFirstVerse.style.color = 'pink';
        //        CODE UNDER TEST
        /**
         *  NOTE there IS NO theFirstVerse.style.color AT this point
         */
        var colorLens = R.lensPath(['style', 'color']);
        MSG += '\n' + `BEFORE R.set color IS:[${R.view(colorLens, theFirstVerse)}]`;
        // SETS the color property here.
        var newStyle = R.set(colorLens, 'blue', theFirstVerse);
        MSG += '\n' + ` AFTER R.set color IS:[${R.view(colorLens, theFirstVerse)}]
     the DOM Verse WAS NOT MUTATED.`;
        var ret = R.view(colorLens, newStyle);
        MSG += '\n' + ` BUT R.set RETURNS a new Color Property: [${R.view(colorLens, newStyle)}]
     which CAN BE USED TO ASSIGN TO theFirstVerse.style.color.`;

        // APPLY this TO theVerse
        theFirstVerse.style.color = ret;
        C_Both(MSG);
        var noop = true;

    }
};

/**
 *   ------   TEST REQUIRED FUNCTIONS  -----
 * */
/**
 *          Get all descendants that match selector
 * cssQuery_ :: String -> Node -> NodeList
 * Note: NodeList is array-like so you can run ramda list functions on it.
 */
var cssQuery_ = R.invoker(1, 'querySelectorAll');
/**
 *          setStyle:: (styleObj) => (node) -> node.style MUTATED
 * @param (styleObj) => (node) -> node.style MUTATED
 */
var setStyle = R.curry((styleObj) => (node) => {
    var trc = Object.assign(
        node.style, styleObj);
    return trc
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

var tstCode = function (tst = false) {
    if (tst) {

        /**
         *          aRandom_min_TO_max_(val, val)-> val
         * @param min
         * @param max
         * @returns {*}
         */
        var aRandom_min_TO_max_ = function (min, max) {
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
        //
        ///**
        // *          aStyleCSS_FROM(template)(wt)-> CSS object
        // * @param cssTmpl
        // * @param wt
        // * @returns {Function|*}
        // */
        //var aStyleCSS_ = R.curry(function (cssTmpl, wt) {
        //    return cssTmpl;  // hard coded testing only
        //});
        //
        ///**
        // *              actually SET the Element's CSS style
        // */
        //var setStyle_FROM_styleCSS_ = R.curry(function (css, node) {
        //    return setStyle(css, node)
        //});
        //
        ///**
        // *          aStyle_SET_FOR_aVerse_FROM_(styleCSS, node, ndx, coll) -> setStyle
        // * :: function (o)(v,n,c)-> v
        // * // Verse State IS
        // * @param styleCnstnts
        // * @param node
        // * @param ndx
        // * @param coll
        // * @returns {*}  - node.style MUTATED
        // * @constructor
        // * @private
        // */
        //var aStyle_FOR_aVerse_ = function aStyleFORaVerse_(styleCnstnts, node, ndx, coll) {
        //    // this is the callBack FOR R_forEach || map
        //    // aStyleWt( styleCnstnts, ndx, coll)
        //    // aStyleCssStr_(styleConstants)
        //    // aStyleCSS_(styleCnstnts, aStyleWt)
        //    // setStyle_FROM_styleCSS_(aStyleCSS_, node)
        //    // 1. properly pipe wt -> css -> set in this
        //
        //    var aStyleCSS = aStyleCSS_(12345);
        //    var setStyle_FROM_styleCSS = setStyle_FROM_styleCSS_();
        //    var f, f_ = (styCnts) => R.pipe(
        //        aStyleCssStr_
        //        , TRACE(', #1')
        //        , aStyleCSS  // hardcoded for test
        //        , TRACE(', #2')
        //        , setStyle_FROM_styleCSS
        //        , TRACE(', #3')
        //    );i
        //    f = f_(styleCnstnts)(node);
        //    return f()
        //};
        //var aStyle_FOR_aVerse_c_ = R.curry(aStyle_FOR_aVerse_);

        /**
         *          TEST_ONLY A subset, IN this case 'fut' OF objects/StyleConstants
         * @type {{2: {name: string, smlWt: number, lrgWt: number, calcWt: Function, styleTmpl: {backgroundColor: string, opacity: string, fontSize: string}}}}
         */
        var tstStyleDict = {
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
                , aStyleObj: {
                    backgroundColor: "rgba(145, 248, 29, 0.29)"
                    , fontSize: '70%'
                    , opacity: 0.5
                }
                , styleStr: `{"backgroundColor": "rgba(145, 248, 29, 0.29)", "opacity": "0.6", "fontSize": "75%"}`
                //, styleTmpl: ` backgroundColor: "rgba(145, 248, 29, 0.29)", opacity: "${this.wt}", fontSize: "${this.wt}%"`
            }
        };      // test data

        /**
         *          SET_aVerse_Style_;; DECLARED HERE
         */
        var SET_aVerse_Style_;          // Declaration NEEDED-before DOM_SET_FOREACH_Verse

        /**
         *          DOM_SET_FOREACH_Verse
         * STYLED_VerseList OF MUTATED Verse Element.style FROM NodeList.
         * MAP SET_aVerse_Style_(styleDict) ONTO NodeList_(qrySlct)
         * @param styleDict
         * @param qrySlct
         * @return {*}
         */
        var DOM_SET_FOREACH_Verse = (styleDict, qrySlct) => {
            return R.mapObjIndexed(
                SET_aVerse_Style_(styleDict)      // partial. WANTS aNode FROM the NL below.
                , NodeList_(qrySlct)               // this SATISFIES each aStyle_FOR_aVerse_
            )
        };
        /**
         * ----------- BEGIN Test Code here ------------------------
         * @type {string}
         */
        MSG = 'tst_DOM_NL.CREATE_StyleTmpl->\n --- ';
        MSG += '\n REFACT: SET_aVerse_Style_ ->  ';

        SET_aVerse_Style_ = function SET_aVerse_Style_(elmnt, ndx, coll) {
            // (Str prop) => Obj Lens
            var SET_a_fontSize_Lens_ = (prop) => R.lensPath(['style', prop]);
            var a_fontSizeLens = SET_a_fontSize_Lens_('fontSize'); // this is a lens_ obj

            // (Str: propStr) -> Str: formatted propStr
            var FORMAT_fontSize_ = n => `${n}%`;

            // (min, max) => Str: formatted propStr
            var FORMAT_aStyleObj_ = R.pipe(
                aRandom_min_TO_max_ // expect (min, max)
                , FORMAT_fontSize_
            );

            var a_TEST_formatted_fontSize = FORMAT_aStyleObj_(51, 100);

            var lens_ = SET_a_fontSize_Lens_('fontSize'); // partial

            var SET_a_StyleObject_ = R.set( // (lens_)  (StyleObj: min, max) (element) ->
                lens_
                , FORMAT_aStyleObj_(51, 100)
                , elmnt
            );
            //   :: Obj:lens_, StyleObj_ -> (elmnt) -
            var VIEW_a_StyleObject_ = R.view(SET_a_fontSize_Lens_('fontSize'), SET_a_StyleObject_);

            /**
             *          THIS IS THE CALL BACK FUNCTION !!!!!!
             * @param styleStr
             * @param elmnt
             * @returns {*}
             * @constructor
             */
            var STYLE_an_Element = R.curry(
                function STYLE_an_Element(styleStr, elmnt) {
                    // todo REFACT: MAKE this a ramda SET && VIEW.._a_StyleObject_
                    // as it is now This does not use the two functions
                    var lens_ = SET_a_fontSize_Lens_(styleStr);
                    var ret = R.view( //
                        lens_
                        , R.set( // (lens_)  (StyleObj: min, max) (element) ->
                            lens_
                            , FORMAT_aStyleObj_(51, 100)  // this is a test stub for style weight
                            , elmnt
                        )
                    );
                    return elmnt.style[styleStr] = ret
                }
            );
            MSG += a_TEST_formatted_fontSize;
            return STYLE_an_Element('fontSize')
        };

        //  ------------------ SET TEST ------------
//  ------------------ INVOKE TEST ------------
        DOM_SET_FOREACH_Verse(SET_aVerse_Style_, NodeList_fut);
    }
};

C_Both(MSG);
var noop = true;
main();
