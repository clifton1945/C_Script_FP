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
}
/**
 * GLOBAL vars
 * require functions-compiled.js, objects-compiled.js
 * */
//  *********** DOM  DATA    REQUIRE functions.js
var book = GET_book();
var MSG = '';

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

    if (tst) {

        /**
         * ----------- BEGIN Test Code here ------------------------
         * @type {string}
         */
        MSG = 'tst_MUTATE_allVerses->';
        MSG += '\n CALC_wt ->  ';

        SET_aVerse_Style_ = function SET_aVerse_Style_(elmnt, ndx, coll) {

            // (Str prop) => Obj Lens
            var SET_a_Sty_Lens_ = (prop) => R.lensPath(['style', prop]);

            // (Str: propStr) -> Str: formatted propStr
            var FORMAT_fontSize_ = n => `${n}%`;

            var CALC_a_StyPropWt = aRandom_min_TO_max_;

            // (min, max) => Str: formatted propStr
            var SET_a_CssStyle_ = R.pipe(
            CALC_a_StyPropWt
                , FORMAT_fontSize_
            );

            var a_TEST_formatted_fontSize = SET_a_CssStyle_(51, 100);

            var lens_ = SET_a_Sty_Lens_('fontSize'); // partial

            var STYLE_a_Verse = function STYLE_a_Verse(propName, propCSS, elmnt) {
                return elmnt.style[propName] = propCSS.style[propName];
            };
            var SET_a_VerseCssStyle = function (styleStr, elmnt) {
                return R.set(
                    SET_a_Sty_Lens_(styleStr)
                    , SET_a_CssStyle_(51, 100)  // this is a test stub for style weight
                    , elmnt
                );
            };

            /**
             *          THIS IS THE CALL BACK FUNCTION !!!!!!
             * @param styleStr
             * @param elmnt
             * @returns {*}
             * @constructor
             */
            var cSTYLE_an_Element = R.curry(
                function STYLE_an_Element(styleStr, elmnt) {  // PARTIAL: WAITS4 elmnt
                    return STYLE_a_Verse(
                        styleStr
                        , SET_a_VerseCssStyle(styleStr, elmnt)
                        , elmnt)
                }
            );

            MSG += a_TEST_formatted_fontSize;
            return cSTYLE_an_Element('fontSize'); // WAIT4: elmnt

            //  ------------------ SET TEST ------------

        };
        //  ------------------ INVOKE TEST ------------
        DOM_SET_FOREACH_Verse(SET_aVerse_Style_, NodeList_fut);
    }
    C_Both(MSG);
    var noop = true;
};

main();
