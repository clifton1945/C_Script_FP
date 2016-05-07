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
    MSG = 'style_theseVerses/';
    /**
     *           CODE UNDER TEST
     * @type {string}
     */

    /**
     *          TEST DATA STUBS, ETC
     * @type {{chptr: {fut: {name: string, styleProps: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}}, cur: {name: string, styleProps: {fontSize: string, opacity: number, textAlign: string}}, pst: {name: string, styleProps: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}}}}}
     */

    const baseStylProp_Dict_stub = {
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
    var fut_StylProps_stub = baseStylProp_Dict_stub.chptr.fut.styleProps;
    var aVerse_stub = _aDoc_Node('.ChptrReadGrps .cur .VerseReadGrps .fut').children[1];
    var theseVerses_Coll_stub = _aDoc_Node('.ChptrReadGrps .cur .VerseReadGrps .fut').children;
    //
    //var _set_textAlign_right = _set_textAlign('right');
    //var newStyl_stub = _set_textAlign_right(fut_StylProps_stub);

    /**
     *              update_thisStylObj_cBFn({so}, ndx, [coll])=>{so}
     * (1) update_theStyleObj as f(baseStylObj, ndx, coll) -> stylObj
     *      (a) calc_Wt (VerseClassPropertyDict)(ndx, coll) -> Num: wt
     *      (b) set_ each property f(base, prop1, prop2,...) WITH its weight
     *      NOTE: the _set_PropertyKey class functions can be Partialled with (aPropValue)
     *      THEN they JUST NEED a_stylObj TO set
     *      (c) merge them into one style obj by compose/pipe each set object
     */
    /**
     *              TEST STUB ONLY >> _a_Wt_stub:: NUM -> NUM
     * @param i
     * @private
     */
    var _a_Wt_stub = i => 35 + i * 10; // (i)->EXP: 0<ndx<
// CODE UNDER TEST IS LOCATED IN tst_LensSetStyles.js
//    var _appendPercent = (n) => `${n}%`;  // DO NOT UNDERSTAND HOW TO MAKE THIS Pointless ?
//    var _divide100 = R.flip(R.divide)(100);// WORKS
    //var _new_fontSize = R.compose(R.always, _appendPercent, _a_Wt_stub);
    //var _new_opacity = R.compose(R.always, _divide100, _a_Wt_stub);
    //var _new_Str = (s)=>R.always(s);
    // update_properties:: I want to apply the current index to _new_... functions
    // the two _new_fontSize AND _new_opacity WANT 1st an index 2nd an obj

    var update_properties = (i) => (base) => {
        return R.evolve(transformers(i), base);
    };
// ASSERT: for one index::0
    RET = update_properties(0)(fut_StylProps_stub);
    TST = R.equals("right")(R.prop('textAlign', RET))
        && R.equals(0.35)(R.prop('opacity', RET));
    EXP = `EXP: textAlign: right NOT ${RET}`;
    console.assert(TST, EXP);
    MSG += JSON.stringify(RET);

    ///**
    // *          a cBFN:: {obj}-> Elem:a -> Elem:a MUTATED
    // * there are two basic functions required to actually mutate a Verse.style object
    // * NOTE: I have been using _verb to mean partially applied verb
    // * (1) update_theStyleObj as f(baseStylObj, ndx, coll) -> stylObj
    // *      (a) calc_Wt (VerseClassPropertyDict)(ndx, coll) -> Num: wt
    // *      (b) set_ each property f(base, prop1, prop2,...) WITH its weight
    // *      NOTE: the _set_PropertyKey class functions can be Partialled with (aPropValue)
    // *      THEN they JUST NEED a_stylObj TO set
    // *      (c) merge them into one style obj by compose/pipe each set object
    // * (2) assign_thisStyleObj_to_thisElement.
    // */
    //let styl_oneVerse = R.curry(function styl_One_Verse(styleObj, node) {
    //    //NOTE: the target styleObj IS RETURNED MUTATED !!
    //    return Object.assign(node['style'], styleObj);
    //});
    //
    ///**
    // *          a cBFn:: partially applied w/ a new style obj set as a function of this_verse: ndx and coll.
    // * @param cBFn
    // * @param coll
    // */
    //let map_theseVerses = (cBFn, coll) => R.addIndex(R.map(cBFn)(coll));
    //
    //var cBFn = (val, ndx, col) => { return styl_oneVerse(update_properties(ndx)( fut_StylProps_stub), val)};
    ////var cBFn = styl_oneVerse(update_properties(0, fut_StylProps_stub)); // this passes test
    //// ASSERT
    //RET = map_theseVerses(cBFn, theseVerses_Coll_stub);
    //TST = R.isArrayLike(RET);
    //EXP = `'EXP: array of 6 CSSStyleDeclarations NOT ${RET}`;
    //console.assert(TST, EXP);
    C_Both(MSG);
    var noop = '';
};
main();


