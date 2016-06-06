/**
 * transformers_tests.js
 * for use _RESTYLE_all_trgts()   in simpleTests.js
 * Created by CLIF on 6/4/2016.
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
// DEPR use clssElem.childElementCount insteaadlet _denom = R.compose(R.dec, R.length); // [L:col] -> N:n
// let _denom1 = R.dec; // N:n -> N:n
tstN = 12;
var clssLen = 0;
assert(-1, R.dec(clssLen), tstN);
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
var clss_step = _step(clssLen);
tstN = 10; // test: _linear
clssLen = 3;
clss_step = _step(clssLen);
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
clssLen = 6; // clss: fut
clss_step = _step(clssLen);
let stepSizER = (ndx)=> clss_step(ndx);

let transformers = {
    stepSize: R.multiply(1.5), //-> 75
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