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
    var trace = R.curry(function (tag, x) {
        console.log(tag, x);
        return x;
    });

    /**
     *          TESTING Functions
     * _qSelectAll :: String -> Node -> NodeList
     * Note: NodeList is array-like so you can run ramda list functions on it.
     */
    var _qSelect = R.invoker(1, 'querySelector');
    var _qSelectAll = R.invoker(1, 'querySelectorAll');
    var fut_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .fut .vers';
    var cur_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .cur .vers';
    var pst_queryStr = '.book .ChptrReadGrps .cur  .VerseReadGrps > .pst .vers';
    var _a_clasNL = function _clasNL(divClasStr) {
        return _qSelectAll(divClasStr)(document)
    };

    /**
     *           CODE UNDER TEST
     * @type {string}
     */
    if (tst) {
        MSG = 'MUTATE_aVersStyle > ';
        /**
         *              the MAIN .map(callBackFunc:: cBF(stylObj)->(elem, ndx, coll)-> MUTATED elem.style.
         * @param styl_obj
         * @returns {Function}
         */
        var cBF = function cBF(elem, ndx, coll) {
            /**
             *             The Heart-of-the-Function: _setStyle(Obj, Elem) -> MUTATED Elem.style
             */

            //var ret = _a_frmted_stylOBJ("fontSize")(ndx);
            var ret = _a_frmted_stylOBJ("opacity")(ndx);
            C_It(JSON.stringify(ret));
            _setStyle(ret, elem);

            MSG += `i:${ndx}-> ${elem.style.fontSize}, ${elem.style.opacity}`;
        };
        var tstNL = _a_clasNL(fut_queryStr);
        R_forEachIndexed(cBF, R.reverse(tstNL));

        C_Both(MSG);
        var noop = '';
    }
};
main();

