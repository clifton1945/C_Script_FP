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
/**
 *          testData::  A subset, IN this case 'fut' OF objects/StyleConstants
 * @type {{2: {name: string, smlWt: number, lrgWt: number, calcWt: Function, styleTmpl: {backgroundColor: string, opacity: string, fontSize: string}}}}
 */
let tstStylDict = {
    cur: {
        styleStr: `{"backgroundColor": "rgba(145, 248, 29, 0.29)", "opacity": "0.8", "fontSize": "50%"}`
    },
    fut: {
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
        , aStylObj: {
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
    var trace = R.curry(function (tag, x) {
        console.log(tag, x);
        return x;
    });
    /**
     *          Get all descendants that match qSselect_
     * _qSelectAll :: String -> Node -> NodeList
     * Note: NodeList is array-like so you can run ramda list functions on it.
     */
    var _qSelectAll = R.invoker(1, 'querySelectorAll');

    var fut_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .fut .vers';
    var cur_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .cur .vers';
    var pst_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .pst .vers';
    /**
     *          _setStyle:: (styleObj) => (node) -> node.style MUTATED
     * @param (styleObj) => (node) -> node.style MUTATED
     */
    var _setStyle = R.curry(function setStyle(styleObj, node) {
        return Object.assign(node['style'], styleObj);
    });
    /**
     * ----------- BEGIN Test Code here ----------
     * today, 12 Apr 2016 I EXPECT TO CONFIRM
     *  that FP Code IS BASED ON definitions, timeless or at least not sequential Definitions.
     *  SO
     *  I WILL BEGIN WITH Code TO MUTATE_aClasVersStyle USING .map
     *     TO APPLY MUTATE_aClasVerseStyle TO theseVerses.
     *     I WILL NEED
     *     (1) a function TO DELIVER theseClasVerses FROM theDOM
     *     (2) a function TO DELIVER theseClasStylDict FROM theStylConst
     *     (3) a function TO MUTATE_clasVersStyl(aStylObj, aNode) -> mutated node
     *         I WILL NEED
     *            fn(aStylObj, node, ndx, coll)            aNode from the map
     *
     */
    if (tst) {
        MSG = 'MUTATE_aVersStyle > ';
        /**  ------------INVOKE TEST here------------ */
        var _futClasVerses = _qSelectAll(fut_queryStr); // WANTS a Node: at least a book element; gets a document here.
        var _spacer = R.join(', ');

        var tstMUTATE = function (stylDict) {
            //NOTE: FOR this Test I AM FORCING ClasVerses TO 'fut'
            var _futClasVerses = _qSelectAll(fut_queryStr); // WANTS at least a book element; gets a document here.
            var _futStylObj = R.compose(R.prop('aStylObj'), R.prop('fut')); // WANTS stylDict

            var _MUT_aVers = function _MUT_aVers() {

            };
        };

        var comma = ', ';
        // GET a NodeList
        var _futVersNL = _qSelectAll(fut_queryStr);
        var a_futVersNL = _futVersNL(document);
        MSG += JSON.stringify(a_futVersNL.length);
        // GET a Verse
        var _qSelect = R.invoker(1, 'querySelector');
        var _curVers = _qSelect(cur_queryStr);
        var a_curVers = _curVers(document);
        var ret = a_curVers.innerHTML;
        MSG += comma + JSON.stringify(ret);
        // a css style obj
        var _futStylObj = R.compose(R.prop('aStylObj'), R.prop('fut'));
        var a_futStylObj = _futStylObj(tstStylDict);
        // MUTATE a verse style
        var _mutate_a_fut_Styl = R.compose(_setStyle, _futStylObj)(tstStylDict);
        _mutate_a_fut_Styl(a_curVers);
        // a function that MUTATEs all fut Verses
        var MUTATE_all_futVersS = function () {

        };
        C_Both(MSG);
        var noop = '';
    }
};
main();
