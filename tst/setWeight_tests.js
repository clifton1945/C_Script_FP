/**
 * setWeight_tests.js by CLIF on
 * 160613 @ 1409
 * REFACT / FIXED rounding to 2 places: Math.round(R.divide(ndx, den) * 100) / 100
 */
"use strict";
// import {C_It} from '../src/functions-compiled';
// import * as R from "../node_modules/ramda"//  FIX  comment out 1030
// import {assert} from '../src/functions-compiled'; //BREAKS
var noop = 0;

var assert = function assert(exp, ret, txt) {
    return console.assert(R.equals(exp, ret), `${exp} != ${ret} @ ${txt}`);
};

/**
 *      ::(N:sibl_Count)->(N:myNdx) -> NS:n  1<= String: wt factor >= 0
 *      return wt factor WAS type N: see below ??? which do I want???
 *      ::(N:sibl_Count)->(N:myNdx) -> N:n  1<= wt factor >= 0
 */
const _StepER = R.curry(
    /**
     *      :: N:siblCount -> N: myIndex -> N:stepSize
     * @param N
     * @param ndx
     * @returns {number}
     * @private
     */
    function _StepER(N, ndx) {
        var den = R.dec(N);
        return R.gte(den, 1) ? Math.round(R.divide(ndx, den) * 100) / 100 : 0;
        // NOTE 160613:1137 REFACT: now round-> Number  vs was isFixed(2)->String
        // therefore all the commented out asserts are BROKEN
    });

/**
 *          :: (N:ndx -> N: <=1 wt factor >= 0
 *    waiting for ndx to set the weight factor.
 * @param sibN
 * @private
 */
const _rClss_StepER = (sibN)=>_StepER(sibN, R.__);

/**
 *          CONFIRMATION OUTPUT & ASSERTS
 *          commented out @1100 160613 for use in simpleTests .js / .html
 */
// assert(0, _StepER(1.00)(200));// denominator < 1; always -> 0
// assert('1.00', _StepER(6)(5), "42");// denominator > 1; ndx / (length -1)
// assert('0.17', _StepER(7)(1), "43");// NOTE: denom NOW 7: denom > 1; ndx / (length -1)
// _StepER is curried so can preLoad the sibling count
// var this_StepER = _rClss_StepER(6);
// assert('1.00', this_StepER(5), "46");// 5/(6-1)-> 1


