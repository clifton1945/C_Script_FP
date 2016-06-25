/**
 * wtEr_tests.js
 * 160624
 *      @1540  MOVED and RENAMED wtER code FROM transformers_tests.js
 */
"use strict";
//GLOBAL:
var CUT, RET, MSG = ``;
//---------------------- Code Under Test: wtFunctions
//  a Comment about these three weighters: L:coll -> N:ndx -> fn:(
//      let keep 3 for now
/**
 *      _wtER_pst:: (L:col) -> N:ndx -> ( *->N:wt)
 * @param col
 * @private
 */
var _wtER_pst = col => R.compose(R.flip(R.divide)(R.length(col)), R.inc);
/**
 *      _wtER_cur:: (L:col) -> N:ndx -> (*->N:wt)
 * @param col
 * @private
 */
var _wtER_cur = col => R.always(1);
/**
 *      _wtER_fut:: (L:col) -> N:ndx -> (*->N:wt)
 * @param col
 * @private
 */
var _wtER_fut = col => R.compose(R.inc, R.negate, R.divide(R.__, R.length(col)));// L:col -> N:ndx -> (*->N:wt)

// _wtER_tests();
// ---------------------- __wtER_tests();
function _wtER_tests() {
    MSG = ` _wtER_ s -> `;
    CUT = _wtER_cur([[]]);
    MSG += '#0 wt..._cur(12345), ';
    assert(1, CUT(12345), MSG);
    CUT = _wtER_pst([0, 1, 2, 3]);// get 0.25, 0.50, 0.75, 1.0
    MSG += '#1 wt..._pst(0), ';
    assert(0.25, CUT(0), MSG);
    MSG += '#2 wt..._pst(3), ';
    assert(1.0, CUT(3), MSG);
    CUT = _wtER_fut([1, 2, 3, 4]);
    MSG += '#3 wt..._fut(0)  ';
    assert(1.0, CUT(0), MSG);
    MSG += '#4 wt..._fut(3), ';
    assert(0.25, CUT(3), MSG);
    MSG += `
    _wtER_tests DONE`;
    C_Both(MSG);
}