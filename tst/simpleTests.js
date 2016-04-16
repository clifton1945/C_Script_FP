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
            backgroundColor: "rgba(199, 248, 151, 0.29)",
            fontSize: '70%',
            opacity: 0.5
        }
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
    if (tst) {
        MSG = 'MUTATE_aVersStyle > ';

        const _a_Wt = i => 45 + i * 10; // EXP ndx
        const _a_fmted_fontSize = (w) => `${w}%`;
        var __fontSizing = function __fontSizing(stylObj) {
            return R.compose(
                R.curry(function (stylObj, fwt) {
                    return R.assoc('fontSize', fwt, stylObj);
                })(stylObj), R.compose(
                    _a_fmted_fontSize, _a_Wt
                )
            );
        };
        const _frm_opaque = (w) => w / 100; // EXP: wt
        var __opaciting = R.curry(function (baseStylObj, fwt) {
            return R.assoc('opacity', fwt, baseStylObj);
        });

        var cBF = (styl_obj) => (elem, ndx, coll) => {


            // OK I WANT opacity TO INCLUDE fontSize

            // now COMBINE | ASSOC opacity WITH fontSize
            let fontSize = __fontSizing(styl_obj)(ndx);
            let _op_fs_StylObj = R.compose(
                __opaciting(fontSize),
                _frm_opaque,
                _a_Wt);



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
            let op_fs_StylObj = _op_fs_StylObj(ndx);
            _setStyle(op_fs_StylObj, elem);

            C_Both('i:' + ndx + '.1 :' + elem.style.fontSize + ', ' + elem.style.opacity + ', ');
        };
        // APPLY cBF TO the base a_stylDict AND a_futVersNL
        var a_futVersNL = _a_clasNL(fut_queryStr);
        var a_stylDict = tstStylDict['fut']['aStylObj'];
        R_forEachIndexed(cBF(a_stylDict), R.reverse(a_futVersNL));

        C_Both(MSG);
        var noop = '';
    }
};
main();
