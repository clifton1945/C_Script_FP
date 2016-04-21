"use strict";
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
var MSG = '';
/**
 *          testCode::
 * @param tst
 */
var tstCode = function (tst = false) {
    /**
     *          TESTING Functions
     * _qSelectAll :: String -> Node -> NodeList
     * Note: NodeList is array-like so you can run ramda list functions on it.
     */
    var fut_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .fut .vers';
    var cur_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .cur .vers';
    var pst_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .pst .vers';
    var _a_clasNL = function _clasNL(divClasStr) {
        return _qSelectAll(divClasStr)(document)
    };

    var align = JSON.parse(`{"textAlign":"center"}`);
    var _fontSize = (ndx)=>_a_styl_frmtOBJ("fontSize");
    var _opacity = (ndx)=> _a_styl_frmtOBJ("opacity"); // curried> can take arg either way.

    //var _WEIGHT_aStyl = R.curry((ndx, _aStyl) => _aStyl(ndx));
    //var _WEIGHT_someStyles = (ndx, lst) => R.map(_WEIGHT_aStyl(ndx), lst);
    //var weightedStylesLST = [_fontSize, _opacity];
    //var weightedStyles = _WEIGHT_someStyles(weightedStylesLST);
    //
    //var unweightedStyles = [align];
    //var stylesLST = R.mergeAll(unweightedStyles, []);


    MSG = 'MUTATE_aVersStyle > ';
    /**
     *           CODE UNDER TEST
     * @type {string}
     */
    //NEW
    var a_stylOBJ = function a_stylOBJ (name, valu) {
        return JSON.parse(`{"${name}":"${valu}"}`)
    };
    // WORKING
    var _a_stylOBJ = R.curry();
    var STYL_aVerse = function STYL_aVerse(stylObj, elem, ndx, coll) {
        // once inside this function, use ndx to WEIGHT some styles
        //_WEIGHT_someStyles(weightedStylesLST);
        _setStyle(stylObj, elem);
        MSG += `..(i[${ndx}] ${elem.style.textAlign}, ${elem.style.fontSize}, ${elem.style.opacity})`;
    };
    var _STYL_aVerse = R.curry(STYL_aVerse);
    var STYL_aClas = (cBFn, arr) => R_forEachIndexed(cBFn, arr);
    var _STYL_aClas = R.curry(STYL_aClas);

    // test data
    var tst_NL = _a_clasNL(cur_queryStr);
    // test callBackFN
    //var tst_stylObj = _a_stylOBJ('textAlign', 'center');
    //var tst_stylObj = {textAlign: 'right'};
    var tst_stylObj = align;
    var _tst_STYL_aVerse = _STYL_aVerse(tst_stylObj); // APPLY PARTIAL
    var _tst_cBFn = _tst_STYL_aVerse;
    // test it
    _STYL_aClas(_tst_cBFn)(tst_NL);

    C_Both(MSG);
    var noop = '';
};
main();

