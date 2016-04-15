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
        , calcWt (sObj, vObj) {
            //noinspection JSUnusedLocalSymbols
            let {ver, ndx, ary} = vObj;
            let {smlWt, lrgWt} = sObj;
            let len = ary.length - 1;
            return (len > 0)
                ? (-(lrgWt - smlWt) / len * ndx + lrgWt)
                : lrgWt;  // always lrgWt
        }
        , wt: 1
        , aStylObj: {
            backgroundColor: "rgba(145, 248, 29, 0.29)"
            , fontSize: '70%'
            , opacity: 0.5
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

    var fut_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .fut .vers';
    var cur_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .cur .vers';
    var pst_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .pst .vers';

    var _spacer = R.join(', ');
    var comma = ', ';
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
        /**  ------------INVOKE TEST here------------ */


        /**
         *          GET a NodeList USING querySelectorALL Str
         * @param divClasStr
         *          * built in DOM document for now
         * @returns NodeList {*}
         * @private
         */
        var _a_clasNL = function _clasNL(divClasStr) {
            return _qSelectAll(divClasStr)(document)
        };
        var a_futVersNL = _a_clasNL(fut_queryStr);
        //MSG += JSON.stringify(a_futVersNL.length);

        /**
         *              GET a Element firstChild FROM querySelector Str
         * @param divClasStr
         * built in DOM document for now
         * @returns Node | Elem {*}
         * @private
         */
        // VERSES
        var _a_clasElem = function _clasElem(divClasStr) {
            return _qSelect(divClasStr)(document)
        };
        // GET a_curVers for testing
        var a_curVers = _a_clasElem(cur_queryStr);
        //MSG += comma + JSON.stringify(a_curVers.innerHTML);

        // GET the third fut verse
        var _third_vers = R.compose(R.nth(2), _a_clasNL);
        var _third_fut_vers_innerHTML = R.compose(R.prop('innerHTML'), _third_vers);
        //MSG += comma + JSON.stringify(_third_fut_vers_innerHTML(fut_queryStr));

        /**
         *              GET a css style obj
         * @param clas
         * @returns {Function|*}
         */
        var a_stylObj = function a_stylObj(clas) {
            return R.compose(R.prop('aStylObj'), R.prop(clas))
        };
        var _blue_StylObj = a_stylObj('cur');
        var _futStylObj = a_stylObj('fut');

        var blue_StylObj = _blue_StylObj(tstStylDict);
        var a_futStylObj = _futStylObj(tstStylDict);

        /**
         *          one_Elem_Styl_MUTATOR:: (styl, elem)-> elem
         */
        var one_Elem_Styl_MUTATOR = R.curry(function _elemStyl_MUTATOR (stylObj, elem) {
            return _setStyle(stylObj, elem)
        });
        // MUTATE a verse style
        //one_Elem_Styl_MUTATOR(_futStylObj(tstStylDict), a_curVers);
        // MUTATE another verse style
        //one_Elem_Styl_MUTATOR(_blue_StylObj(tstStylDict), _third_vers(pst_queryStr));// BREAKS no verses
        //one_Elem_Styl_MUTATOR(_blue_StylObj(tstStylDict), _third_vers(cur_queryStr));// BREAKS no 3rd Verse
        //one_Elem_Styl_MUTATOR(_blue_StylObj(tstStylDict), _third_vers(fut_queryStr));// WORKS: SEE 3rd Vers mutated

            //so first partial a fut style obj
        var _a_futElem_Styl_MUTATOR = one_Elem_Styl_MUTATOR(a_futStylObj);
            // then AS a test lets see THE SECOND verse
        var the_second_futVers = R.compose(R.nth(1), _a_clasNL)(fut_queryStr);
        //_a_futElem_Styl_MUTATOR(the_second_futVers);  //WORKS,CAN SEE new fut 2nd verse


        /**
         *            _MUTATEs all fut Verses
         * @constructor
         */
            // now all Verse in one Class:  fut for this test
        // will need map(
        //      (1) a cBF:callBackFunction with PARAMS: ( _aStylObj (??),an elem, ndx, coll returned with the .map),
        //          this cBF culminates in APPLYING a final StylObj TO aN Elem: i.e. _setStyl(finalStylObj, elem)
        //      (2) an elem collection | nodeList
        // }

        // simple


        var cBF = (sObj) => (elem, ndx, coll) => {
            let _wt = i => 35 + i*10; // EXP ndx

            let _fmt_fontSize = (w) => `${w}%`; // EXP: wt
            // values for tracing
            let wt = _wt(ndx);
            let fmt_wt = R.compose(_fmt_fontSize, _wt)(ndx);
            // fontSized
            var __fontSizing = R.curry(
                (origStyl, fwt) => R.assoc('fontSize', fwt, origStyl)
            ); // EXP:
            let _fontSizing = __fontSizing(sObj);
            let fontSize = R.compose(_fontSizing, _fmt_fontSize, _wt)(ndx);

            // opacity
            let _frm_opaque = (w) => w/100; // EXP: wt
            var __opaciting = R.curry(
                (oldStylObj, fwt) => R.assoc('opacity', fwt, oldStylObj)
            );
            let _opaciting = __opaciting(sObj);
            let opacity = R.compose(_opaciting, _frm_opaque, _wt)(ndx);

            // This IS the Line that SETS the Style
            // NOTE: COULD HAVE ALSO USED
            // >> let _opaciting = __opaciting(fontSize) // rather than sObj
            Object.assign(elem.style, opacity, fontSize);

            MSG += `i:${ndx} :${elem.style.fontSize}, ${elem.style.opacity}, `;
        };
        // APPLY cBF TO the fut Verses
        R_forEachIndexed(cBF(tstStylDict['fut']['aStylObj']), R.reverse(a_futVersNL));

        C_Both(MSG);
        var noop = '';
    }
};
main();
