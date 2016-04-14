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
        aStylObj: {
            backgroundColor: "rgb:(000,255,255)"
            , fontSize: '40%'
            , opacity: 0.5
        },
        stylStr: `{"backgroundColor": "rgb:(000,255,255)", "opacity": "0.8", "fontSize": "50%"}`
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
        , stylStr: `{"backgroundColor": "rgba(145, 248, 29, 0.29)", "opacity": "0.6", "fontSize": "75%"}`
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
     *          Get all descendants matching _qSelect || _qSelectAll
     * _qSelectAll :: String -> Node -> NodeList
     * Note: NodeList is array-like so you can run ramda list functions on it.
     */
    var _qSelect = R.invoker(1, 'querySelector');
    var _qSelectAll = R.invoker(1, 'querySelectorAll');
    /**
     *          _setStyle:: (styleObj) => (node) -> node.style MUTATED
     * @param (styleObj) => (node) -> node.style MUTATED
     */
    var _setStyle = R.curry(function setStyle(styleObj, node) {
        return Object.assign(node['style'], styleObj);
    });

    var fut_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .fut .vers';
    var cur_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .cur .vers';
    var pst_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .pst .vers';

    var _spacer = R.join(', ');
    var comma = ', ';
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


        /**
         *          GET a NodeList USING querySelectorALL Str
         * @param divClasStr
         *          * built in DOM document for now
         * @returns NodeList {*}
         * @private
         */
        var _a_clasNL = function _clasNL(divClasStr) {
            return _qSelectAll(divClasStr)(document)
        };
        var a_futVersNL = _a_clasNL(fut_queryStr);
        MSG += JSON.stringify(a_futVersNL.length);

        /**
         *          GET a Element firstChild FROM querySelector Str
         * @param divClasStr
         * built in DOM document for now
         * @returns Node | Elem {*}
         * @private
         */
        var _a_clasElem = function _clasElem(divClasStr) {
            return _qSelect(divClasStr)(document)
        };
        // GET a_curVers for testing
        var a_curVers = _a_clasElem(cur_queryStr);
        MSG += comma + JSON.stringify(a_curVers.innerHTML);

        // GET the third fut verse
        var _third_vers = R.compose(R.nth(2), _a_clasNL);
        var _third_fut_vers_innerHTML = R.compose(R.prop('innerHTML'), _third_vers);
        MSG += comma + JSON.stringify(_third_fut_vers_innerHTML(fut_queryStr));

        // GET a css style obj
        var a_stylObj = function a_stylObj(clas) {
            return R.compose(R.prop('aStylObj'), R.prop(clas))
        };
        var _blue_StylObj = a_stylObj('cur');
        var _futStylObj = a_stylObj('fut');

        var blue_StylObj = _blue_StylObj(tstStylDict);
        var a_futStylObj = _futStylObj(tstStylDict);

        /**
         *          _elemStyl_MUTATOR:: (styl, elem)-> elem
         */
        var _elemStyl_MUTATOR = R.curry(function _elemStyl_MUTATOR (stylObj, elem) {
            return _setStyle(stylObj, elem)
        });
        _elemStyl_MUTATOR(_futStylObj(tstStylDict), a_curVers);
        // MUTATE another verse style
        //_elemStyl_MUTATOR(_blue_StylObj(tstStylDict), _third_vers(pst_queryStr));// BREAKS no verses
        //_elemStyl_MUTATOR(_blue_StylObj(tstStylDict), _third_vers(cur_queryStr));// BREAKS no 3rd Verse
        _elemStyl_MUTATOR(_blue_StylObj(tstStylDict), _third_vers(fut_queryStr));// WORKS
        /**
         *            _MUTATEs all fut Verses
         * @constructor
         */
        var MUTATE_all_futVersS = function () {

        };
        C_Both(MSG);
        var noop = '';
    }
};
main();
