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
    //var chptr_queryStr = '.book .ChptrReadGrps .cur';
    var fut_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .fut .vers';
    //var cur_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .cur .vers';
    //var pst_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .pst .vers';
    var _aDoc_NL = function _clasNL(divClasStr) {
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


    // test data

    var chptr_queryStr = '.ChptrReadGrps .cur .VerseReadGrps';
    var _aDoc_Node = function _aDoc_Node(divStr) {
        return _qSelect(divStr)(document)
    };
    var _aClas_StylObj = (dict)=>(R.prop('chptr')(dict));
    var _aVers_StylObj = (dict)=>R.prop('styleProps')(dict);
    /**
     *      _STYL_aVerse:: {OBJ}->(ELM e, NUM n, [a])-> ELM e
     */
    var _STYL_aVerse = R.curry(function STYL_aVerse(versStylDict, elem, ndx, coll) {
        var thisStylObj = R.compose(_set_opacity_Wt(ndx), _set_fontSize_Wt(ndx))(baseStyle); // ndx applied to WEIGHT AND COMPOSE individual styles
        _STYLE_(thisStylObj, elem);

        MSG += `..(i[${ndx}] ${elem.style.textAlign}, ${elem.style.fontSize}, ${elem.style.opacity})`;
    });
    var _aVersClasColl = (elem) => R.prop('children');
    /**
     *      _STYL_aVerseClass:: {OBJ a}->(ELM e, NUM n, [a])-> fn(a, e) => {Obj b}
     *      sets cBFn:_STYL_aVerse ( styleObj parameter to the appropriate versClass: pst, cur, fut as determined by its Element.
     *
     */
    var _STYL_aVerseClas = R.curry((sDict, coll) => {
        R_forEachIndexed(
            _STYL_aVerse(_aClas_StylObj(sDict))
            , coll
        )
    });

    // test it
    var tst_Elem, tst_Coll;
    const tst_Dict = {
        chptr: {
            fut: {
                name: 'fut'
                , styleProps: {
                    fontSize: "100%",
                    opacity: 1.0,
                    textAlign: "CENTER",
                    backgroundColor: "rgba(145, 248, 29, 0.29)"
                }
            }
            , cur: {
                name: 'cur'
                , styleProps: {
                    fontSize: "100%",
                    opacity: 1.0,
                    textAlign: "CENTER",
                }
            }
            , pst: {
                name: 'pst'
                , styleProps: {
                    fontSize: "100%",
                    opacity: 1.0,
                    textAlign: "CENTER",
                    backgroundColor: "rgba(255, 0, 0, 0.24)"
                }
            }
        }
    };
    var tst_fut_styleDict = tst_Dict.chptr.fut;
    _ret = _STYL_aVerse(tst_fut_styleDict);
    tst_Coll = _aDoc_NL(fut_queryStr);
    ret = R_forEachIndexed(_ret, tst_Coll);
    //
    tst_Elem = _aDoc_Node(chptr_queryStr);
    tst_Coll = _aVersClasColl(tst_Elem);
    //_STYL_aVerseClas(tst_Dict, tst_Coll);
    C_Both(MSG);
    var noop = '';

    /**
     *       _STYL_a_Chptr:: {OBJ}->(ELM: e, NUM: n, [a])-> ELM: a Chptr COLLECTION
     */
    var DEPR_untilNeeded__STYL_aChptr = R.curry((sOBJ, arr) => {
        R_forEachIndexed(_STYL_aVerseClas(sOBJ), arr)
    });
};
main();

