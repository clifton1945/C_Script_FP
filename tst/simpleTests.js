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

    //var DEPRalign = JSON.parse(`{"textAlign":"center"}`);
    //var DEPR_fontSize = (ndx)=>_a_styl_frmtOBJ("fontSize");
    //var DEPR_opacity = (ndx)=> _a_styl_frmtOBJ("opacity"); // curried> can take arg either way.

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
    //WORKING Code IN functions,js

    // NEW TEST CODE

    /**
     *          _thisStylOBJ: o, i -> o
     *          ndx applied to WEIGHT AND COMPOSE individual styles
     //        _STYLE(so, elem);
     *      this returns a ndxLacking fn of merged / composed styles
     */
    var _thisStylOBJ = R.curry(function _thisStylOBJ (dict) {
        // NOTE: dict not used yet
        var n = 75;
        var _fs = _a_stylOBJ('fontSize', `${n}%`);
        var _op = _a_stylOBJ('opacity', '.3');
        var _cntr = _a_stylOBJ('textAlign', 'center');
        return R.compose( _op, _fs, _cntr); // lacking ndx
    });

    /**
     *          _STYLE:: obj, node -> MUTATED node.style
     *          curried
     * @param styleObj
     * @param node
     * @returns {*}
     */
    var _STYLE = R.curry(function setStyle(styleObj, node) {
        return Object.assign(node['style'], styleObj);
    });

    var _STYLE_Verse = R.curry(function STYL_aVerse(versStylDict, elem, ndx, coll) {
        // once inside this function, use ndx to WEIGHT some styles
        var thisStylObj = _thisStylOBJ(versStylDict)(ndx); // ndx applied to WEIGHT AND COMPOSE individual styles
        _STYLE(thisStylObj, elem);
        MSG += `..(i[${ndx}] ${elem.style.textAlign}, ${elem.style.fontSize}, ${elem.style.opacity})`;
    });

    var _STYLE_Clas = R.curry((sOBJ, arr) => R_forEachIndexed(_STYLE_Verse(sOBJ), arr));
    // test composing stylOBJs

    // test data
    var tst_Dict = {};
    var tst_NL = _a_clasNL(fut_queryStr);
    // test it
    _STYLE_Clas(tst_Dict, tst_NL);

    C_Both(MSG);
    var noop = '';
};
main();

