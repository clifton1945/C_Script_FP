/**
 * transformers_tests.js
 * results appear as  _RESTYLE_all_trgts() in simpleTests.js \n
 * 6/6/2016.1755
 *      I am using transformers func: stepSizER() as my learning and testing USING _EVOLE_clss_CSD()
 *      (1) i AM GETTING CLOSER as it is configured. But clss_step does not seem to do what I want.
 *      (2) But still not sure how to pass ndx to code
 *      (3) Maybe evolve() is not the right or best function - it is bases on String replacement
 *
 */
"use strict";
//GLOBAL:
var RET, CUT, tstN = 0;
/**
 *                  transformers:
 * @type {{fontSize, opacity: *, textAlign: (void|XML|string|*)}}
 *
 */

/**
 *      :: [L:col] -> N:n
 */
// DEPR use clssElem.childElementCount instead let _denom = R.compose(R.dec, R.length); // [L:col] -> N:n
// let _denom1 = R.dec; // N:n -> N:n
tstN = 12;
var clss_len = 0;
assert(-1, R.dec(clss_len), tstN);
/**
 *      ::  L:col -> N:ndx -> 0 | N:n
 */
tstN = 11;
let _step = R.curry((len, ndx) => R.dec(len) >= 1 ? ndx / R.dec(len) : 0);// L:col, N:ndx -> 0 | N:d
assert(.5, _step(3)(1), tstN);// dec length ==2: 1/2 -> 0.5
assert(0, _step(1)(111), tstN);// dec length < 1 -> always 0
/**
 *      ::  N:ndx -> 0 | N:n
 * USE: the Class childElementCount IS constant; set its slope
 */
var clss_step = _step(clss_len);
tstN = 10; // test: _linear
clss_len = 3;
clss_step = _step(clss_len);
assert(0.0, clss_step(0), tstN);
assert(0.5, clss_step(1), tstN);
assert(1.0, clss_step(2), tstN);

// HOLD when want regex  let _ER = R.replace(/\d+/im);//any one or more digits, transformer Fn  S: valu ->
/**
 *          _fontSizER:: Str->Str->Str
 * @type {void|XML|string|*}
 * NOTE: using a broad regex like - /\d+/im - transforms All fontstyles
 * NOTE: using a specific Str like - 40 - transforms in this case just the clss:cur
 */
let _fontSizER = R.replace('40');//any one or more digits, transformer Fn  S: valu ->
/**
 *          stepSizER::
 * @type {number}
 */
clss_len = 6; // clss: fut
clss_step = _step(clss_len);
var base_step = -50; // for clss: fut
var strt_wt = 90;
clss_step = _step(clss_len);
var tst_ndx = 3;
let stepSizER = (ndx)=> clss_step(ndx);
// let _stepSizER = R.replace('-50');

let transformers = {
    // stepSize: _stepSizER('25'),   //
    stepSize: R.add(_step(clss_len)(tst_ndx)),   // -> -50 + 40 -> -10
    fontSize: _fontSizER(60), // Str -> Str
    opacity: R.multiply(3),
    textAlign: R.replace('right', 'center')// works FOR any rClss WITH initial 'center'
};
/**
 *      :: CSD:{k:v) -> CSD{k:v}
 *  evolves the base CSD BY weighting some of the  properties.
 */
let _EVOLVE_clss_CSD;
_EVOLVE_clss_CSD = R.evolve(transformers); //  {k:v} ->{k:v}