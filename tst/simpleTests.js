"use strict";
//var R = require('ramda-maybe');
//import { testStr } from '..//src//modules-compiled'; // WORKS but throws Inspection 'can't resolve

/**
 *      ***** TEST FRAMEWORK **************
 *   a Dashboard for selecting tests,
 */

/**
 *  a Book has three ChapterClasses [ClassOfChptrs]: .pst, .cur, .fut. Each is a Collection of 0->N Chapters AT any one time.
 *  a ChapterClass [ClassOfChptrs]: is a Collection of 0->N Chapters AT any one time.
 *  a Chapter has three VerseClasses [ClassOfVerses]: .pst, .cur, .fut. Each with a Collection of 0->N Verses AT any one time.
 *  a VerseClass [ClassOfVerses] is a Collection of 0->N Verses AT any one time.
 *  a Verse has 1-N Sentences, each with 1-N clauses, each with 0-N phrases,....
 *
 *  BUT ONLY the cur_ChptrClass IS READ. Though any or all Chapters may at any on time be in the cur_ChptrClass
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
    var chptr_queryStr = '.book .ChptrReadGrps .cur';
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
    /**
     *      _STYL_aVerse:: {OBJ}->(ELM e, NUM n, [a])-> ELM e
     */
    var _STYL_aVerse = R.curry(function STYL_aVerse(versStylDict, elem, ndx, coll) {
        var thisStylObj = R.compose(_set_opacity_Wt(ndx), _set_fontSize_Wt(ndx))(baseStyle); // ndx applied to WEIGHT AND COMPOSE individual styles
        _STYLE_(thisStylObj, elem);

        MSG += `..(i[${ndx}] ${elem.style.textAlign}, ${elem.style.fontSize}, ${elem.style.opacity})`;
    });
    /**
     *      _STYL_aVerseClass:: {OBJ}->(ELM e, NUM n, [a])-> ELM e
     *
     */
    var _STYL_aVerseClas = R.curry((sOBJ, arr) => R_forEachIndexed(_STYL_aVerse(sOBJ), arr));

    /**
     *       _STYL_a_Chptr:: {OBJ}->(ELM: e, NUM: n, [a])-> ELM: a Chptr COLLECTION
     */
    var _STYL_aChptr = R.curry((sOBJ, arr) => R_forEachIndexed(_STYL_aVerseClas(sOBJ), arr));

    // test data
    const tst_Dict = {
        chptr: {
            fut: {name: 'fut'},
            cur: {name: 'cur'},
            pst: {name: 'fut'},
        }
    };
    var tst_NL = _a_clasNL(fut_queryStr);
    // test it
    _STYL_aVerseClas(tst_Dict, tst_NL);
    C_Both(MSG);
    var noop = '';
};
main();

