/**
 * Created by CLIF on 5/5/2016.
 */
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
var MSG = '', RET, EXP, TST;
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
    //var chptr_queryStr = '.ChptrReadGrps .cur .VerseReadGrps';
    var _aDoc_Node = function _aDoc_Node(divStr) {
        return _qSelect(divStr)(document)
    };
    var _aDoc_NodeList = function _aDoc_NodeList(divStr) {
        return _qSelectAll(divStr)(document)
    };


    // test it: separate collections and functions
    const tst_Dict = {
        chptr: {
            fut: {
                name: 'fut'
                , styleProps: {
                    fontSize: "90%",
                    opacity: 0.9,
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
                    fontSize: "80%",
                    opacity: 0.8,
                    textAlign: "CENTER",
                    backgroundColor: "rgba(255, 0, 0, 0.24)"
                }
            }
        }
    };
    var tst_One_StylProps = tst_Dict.chptr.fut.styleProps;
    var tst_One_Vers = _aDoc_Node('.ChptrReadGrps .cur .VerseReadGrps .fut').children[2];

    var _set_textAlign = R.compose(R.set, R.lensProp)('textAlign');
    var _set_textAlign_right = _set_textAlign('right');

    // ASSERT
    RET = tst_One_Vers.style.textAlign;
    TST = RET === 'left';
    EXP = `'EXP: textAlign:left NOT ${RET}`;
    //CUT
    var styl_One_Verse = R.curry(function styl_One_Verse(styleObj, node) {
        //NOTE: the target styleObj IS RETURNED MUTATED !!
        return Object.assign(node['style'], styleObj);
    });

    var newStyl = _set_textAlign_right(tst_One_StylProps); //TODO ADD TO functions_01
    styl_One_Verse(newStyl)(tst_One_Vers);
    // ASSERT
    RET = tst_One_Vers.style.textAlign;
    TST = RET === 'right';
    EXP = `'EXP: textAlign:right NOT ${RET}`;
    console.assert(TST, EXP);
    //C_Both(MSG);
    var noop = '';
};
main();


