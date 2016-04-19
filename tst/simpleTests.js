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

    /**
     *           CODE UNDER TEST
     * @type {string}
     */0;
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

            //var ret = _a_frmted_styl_OBJ("fontSize")(ndx);
            var ret = _a_frmted_styl_OBJ("opacity")(ndx);
            C_It(JSON.stringify(ret));
            // REFACT: remove outer {} brackets on each frmated style
            // then compose all the style strings then enclose that with a final {}
            //ret = JSON.parse(`{"color":"blue", "fontSize":"150%"}`);
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

