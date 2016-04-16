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
        , wt: 1
        , aStylObj: {
            //backgroundColor: "rgba(145, 248, 29, 0.29)",
            fontSize: '70%',
            opacity: 0.5
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
    // see also from "MESS with the DOM" ramda - located in /ramda
    // though it looks like ONLY one property
    //var setStyle = R.curry((prop, value,node) => node.style[prop] = value)
    var _spacer = R.join(', ');
    var comma = ', ';

    var fut_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .fut .vers';
    var cur_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .cur .vers';
    var pst_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .pst .vers';
    var _a_clasNL = function _clasNL(divClasStr) {
        return _qSelectAll(divClasStr)(document)
    };
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

        const _a_Wt = i => 45 + i * 10; // EXP ndx
        const _a_fmted_fontSize = (w) => `${w}%`;
        const __fontSizing = (stylObj) => R.compose(
            R.curry((stylObj, fwt) => R.assoc('fontSize', fwt, stylObj))(stylObj),
            R.compose(_a_fmted_fontSize, _a_Wt)
        );
        const _frm_opaque = (w) => w / 100; // EXP: wt
        const __opaciting = R.curry( (baseStylObj, fwt) =>
                R.assoc('opacity', fwt, baseStylObj)
        );

        var cBF = (styl_obj) => (elem, ndx, coll) => {

            let fontSize = __fontSizing(styl_obj)(ndx);

            // style Prop: opacity


            // OK I WANT opacity TO BE R.assoc WITH fontSize

            // now COMBINE | ASSOC opacity WITH fontSize
            let _opacity_fontSize = R.compose(
                __opaciting(fontSize),
                _frm_opaque,
                _a_Wt);

            let opacity_fontSize = _opacity_fontSize(ndx);
            // This IS the Code
            /**
             *          __setStyleBy:: el, Obj -> el
             */
            var __setStyleBy = R.curry(function (anElement, el_StyleDict) {
                return Object.assign(anElement.style, el_StyleDict);
            }); // returns the updated element.styl
            //var _setStyleBy = __setStyleBy(elem); // partial

            C_Both('i:' + ndx + '.0 :' + elem.style.fontSize + ', ' + elem.style.opacity + ', ');

            /**
             *             The Heart-of-the-Function: _setStyle(Obj, Elem) -> MUTATED Elem.style
             */
            var ret = _setStyle(opacity_fontSize, elem);

            C_Both('i:' + ndx + '.1 :' + elem.style.fontSize + ', ' + elem.style.opacity + ', ');
            // DID IT??
        };
        // APPLY cBF TO the fut Verses
        var a_futVersNL = _a_clasNL(fut_queryStr);
        var a_stylObj = tstStylDict['fut']['aStylObj'];
        R_forEachIndexed(cBF(a_stylObj), R.reverse(a_futVersNL));

        C_Both(MSG);
        var noop = '';
    }
};
main();
