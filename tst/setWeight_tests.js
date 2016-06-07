/**
 * setWeight by CLIF on 6/7/2016.
 * a weighted Step for a trgtE CSD property IS fn of its sibling_count and index in that count.
 */
"use strict";

/**
 *      STEP_ER:(N:sibl_Count)->(N:myNdx) -> N:step
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
        return R.gte(den, 1) ? R.divide(ndx, den) : 0;
    });
const _rClss_StepER = (sibN)=>_StepER(sibN, R.__);
/**
 *          CONFIRMATION OUTPUT & ASSERTS
 */
assert(0, _StepER(1)(200));// denominator < 1; always -> 0
var this_StepER = _rClss_StepER(6);
assert(0, this_StepER(0));//
assert(0.4, this_StepER(2));//
assert(1, this_StepER(5));// 5/(6-1)-> 1


