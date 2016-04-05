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
 * require DEPRfunctions-compiled.js, objects-compiled.js
 * */
//  *********** DOM  DATA    REQUIRE DEPRfunctions.js
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
     *          TEST_ONLY A subset, IN this case 'fut' OF objects/StyleConstants
     * @type {{2: {name: string, smlWt: number, lrgWt: number, calcWt: Function, styleTmpl: {backgroundColor: string, opacity: string, fontSize: string}}}}
     */
    let tstStyleDict = {
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
     *          SET_aVerse_Style_;; DECLARED HERE
     */
    //var SET_aVerse_Style_;          // Declaration NEEDED-before DOM_SET_FOREACH_Verse

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
        MSG = 'tst_SET_aVerse_Style_->';
        MSG += '\n CALC_wt ->  ';
        let aSty_Str_4
            , aSty_Str_c4
            , aSty_Str_c3
            , aVers_Styl_Lens
            , aVers_Styl_Css
            , set_anElemStyl
            ,DOM_mapObjIndexed_Verse
        ;

        set_anElemStyl = (propName, aVers_Styl_Css, elem) => {//::-> MUTATED elem
            return elem.style[propName] = aVers_Styl_Css.style[propName]
        };

        aVers_Styl_Css = (aLens, aStyl_Str, elem)=> { //::-> aVers_Styl_Css
            return R.set(
                aLens
                , aStyl_Str
                , elem
            );
        };  //::-> aVers_Styl_Css

        aVers_Styl_Lens = (stylProp) => R.lensPath(['style', stylProp]); //:: a -> Lens:a

        aSty_Str_4 = (StylDict, elem, ndx, coll) => { //::-> aSty_Str
            let f = x => C_It(JSON.stringify(`:${x}`));
            let y = (x)=> C_Both(x);
            let msg = (msg) => ` ${msg}`;

            // begin calc Wt WITH vCoeff:: ndx/(coll.len-1)
            let vDenom = R.pipe(
                R.length
                , R.unless(R.equals(1), R.dec) // DO NOT DECRIMENT IF Len == 1
                , R.divide(1)
            );
            let vCoeff2 = R.curry(
                (denom, numer) =>
                round(R.divide(numer, denom))
                );
            let vCoeff1 = vCoeff2(vDenom(coll));
            MSG += msg(vCoeff1(ndx));
            //
            let smlWt = R.pipe(R.prop('2'), R.prop('smlWt'));
            let lrgWt = R.pipe(R.prop('2'), R.prop('lrgWt'));

            //  end calc Wt WITH sCoeff:: vCoeff*(lrgWt - smlWt) + smlWt
            //  end calc Wt WITH sCoeff:: vCoeff*lrgWt + smlWt(1 - vCoeff)
            let sCoeff = (stylD, versCoeff) => {
                return 555555555
                // AND FIX the Wt calc 0-100 OR 0-1
            };
        };

        aSty_Str_c4 = R.curry(aSty_Str_4);
        aSty_Str_c3 = aSty_Str_c4(tstStyleDict);

        DOM_mapObjIndexed_Verse = (cbFn, qrySlct) => {
            return R.mapObjIndexed(
                cbFn
                , NodeList_(qrySlct)   // this SATISFIES each aStyle_FOR_aVerse_
            )
        };

        //  ------------------ INVOKE TEST ------------
        DOM_mapObjIndexed_Verse(aSty_Str_c3, NodeList_fut);
    }
    C_Both(MSG);
    var noop = true;
};

main();
