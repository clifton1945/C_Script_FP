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
     *              _STYL_a_Verse:: {OBJ styl}->(ELM e, NUM n, [a])-> ELM e
     *      is a cBFn: CREATED TO BE APPLIED To each Verse OF a Collection of Verses.
     *      this cBFn: IS BUILT on a partial application
     */
    var _STYL_a_Verse = R.curry(function STYL_aVerse(baseStyleProps, elem, ndx, coll) {
        /**
         *          _thisStylObj:: will be a Mutated style Property for this element's ndx and coll after providing a baseStyleObj
         *
         *  ndx applied to just the fontSize and opacity baseStylProperties;
         *  any other properties are not affected i.e. kept|unchanged
         *  NOTE: expect to add a coll OR coll.length Parameter to the two _set_....s.
         */
        var _thisStylObj = R.compose(_set_opacity_Wt(ndx), _set_fontSize_Wt(ndx));
        //return _STYLE_(_thisStylObj(baseStyleProps), elem); // NO return used since the Element IS MUTATED in the DOM
        var _x = _STYLE_(_thisStylObj(baseStyleProps));
        var y = _x(elem); // NO return used since the Element IS MUTATED in the DOM
        MSG += '..(i[' + ndx + '] ' + elem.style.textAlign + ', ' + elem.style.fontSize + ', ' + elem.style.opacity + ')';
        return y; // x for tracing then returning
    });

    /**
     *      _STYL_these_Verses:: {OBJ a}->(ELM e, NUM n, [a])-> fn(a, e) => {Obj b}
     *      1st: sets the style Properties object argument of cBFn: _STYL_a_Verse as f(class = pst||cur||fut)
     *          as determined by its Element:e a Verse Class Node
     *      2nd: APPLIES a new _STYL function with the above styl properties TO EACH Verse Node/Element List.
     *
     */
    var _STYL_these_Verses = R.curry((versPropDict, versNL) => {
        R_forEachIndexed(
            _STYL_a_Verse(_aClas_StylObj(versPropDict))
            , versNL
        )
    });

    // test it
    var tst_Elem, tst_Coll;
    // first test  _STYL_a_Verse( a clas stylProp obj)( a HTMLElem)
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
    var tst_fut_styleDict = tst_Dict.chptr.fut.styleProps;
    var tst_futVerse = _aDoc_Node(fut_queryStr);
    ret = _STYL_a_Verse(tst_fut_styleDict)(tst_futVerse);

    //var tst_NL = _aDoc_NL(fut_queryStr); // exp:

    //ret = _STYL_these_Verses(tst_fut_styleDict)(tst_Coll);
    //ret = R_forEachIndexed(_ret, tst_Coll); // this works: the fut verses are changed, though not correctly first>large, last small
    //
    //tst_Elem = _aDoc_Node(chptr_queryStr);
    //tst_Coll = tst_Coll;
    //_ret =_STYL_these_Verses(tst_Dict, tst_Coll);
    C_Both(MSG);
    var noop = '';

    /**
     *       _STYL_a_Chptr:: {OBJ}->(ELM: e, NUM: n, [a])-> ELM: a Chptr COLLECTION
     */
    var DEPR_untilNeeded__STYL_aChptr = R.curry((sOBJ, arr) => {
        R_forEachIndexed(_STYL_these_Verses(sOBJ), arr)
    });
};
main();

