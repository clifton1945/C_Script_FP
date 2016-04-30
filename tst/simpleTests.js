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
    MSG = 'MUTATE_aVersStyle > ';
    /**
     *           CODE UNDER TEST
     * @type {string}
     */
    /**
 *      _STYLE_:: obj, node -> MUTATED node.style
     *          curried
     * @param styleObj
     * @param node
     * @returns {*}
     */
    var _STYLE_ = R.curry(function setStyle(styleObj, node) {
        return Object.assign(node['style'], styleObj);
    });
    var _STYL_aVerse = R.curry(function STYL_aVerse(versStylDict, elem, ndx, coll) {
        var transformations = {
            opacity: _new_opacity(ndx), // a function that can be applied to WHICH theKey OR theValue ?
            fontSize: _new_fontSize(ndx),
            textAlign: _newStr('center'),
        };
        var new_stylObj = R.evolve(transformations, styleModel);
        _STYLE_(new_stylObj, elem);

        MSG += `..(i[${ndx}] ${elem.style.textAlign}, ${elem.style.fontSize}, ${elem.style.opacity})`;
    });
    var _STYL_aVerseClas = R.curry((sOBJ, arr) => R_forEachIndexed(_STYL_aVerse(sOBJ), arr));
    // test data
    var tst_Dict = {};
    var tst_NL = _a_clasNL(fut_queryStr);
    // test it
    _STYL_aVerseClas(tst_Dict, tst_NL);

    C_Both(MSG);
    var noop = '';

    function new_transformations(i) {
        this.opacity = _new_opacity(i)
    }
};
main();

