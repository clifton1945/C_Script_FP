//"use strict";
//var R = require('ramda-maybe');
//import { testStr } from '..//src//modules-compiled'; // WORKS but throws Inspection 'can't resolve

/**
 *      ***** TEST FRAMEWORK **************
 *   a Dashboard for selecting tests,
 */
function main() {
    tstCode(true);
}
/**
 *          GLOBAL vars
 * require functions-compiled.js, objects-compiled.js
 * */
//  *********** DOM  DATA    REQUIRE functions.js
var book = GET_book();
var MSG = '';

var fut_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .fut .vers';
var cur_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .cur .vers';
var pst_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .pst .vers';
/**
 *          testData::  A subset, IN this case 'fut' OF objects/StyleConstants
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
 *          testCode::
 * @param tst
 */
var tstCode = function (tst = false) {
    if (tst) {
        /**
         * ----------- BEGIN Test Code here ----------
         * today, 12 Apr 2016 I EXPECT TO CONFIRM
         *  that FP Code IS BASED ON definitions, timeless or at least not sequential Definitions.
         *  SO
         *  I WILL BEGIN WITH Code TO MUTATE_aClasVersStyle USING .map
         *     TO APPLY MUTATE_aClasVerseStyle TO theseVerses.
         *     I WILL NEED
         *     (1) a function TO DELIVER theseClasVerses FROM theDOM
         *     (2) a function TO DELIVER theseClasStylConst FROM theStylConst
         *     (3) a function TO MUTATE_clasVersStyl
         *
         */

        MSG = 'MUTATE_aVersStyle.';
        var theseClasVerses = function () {// ::
            
        };

        /**  ------------INVOKE TEST here------------ */
        MSG += 'I HAVE FINISHED.';
        C_Both(MSG);
    }
};

main();
