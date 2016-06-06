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
// let _stepER, _fontSizER;
// NOT USED YET   let _stepER = R.replace(/\d+/im);// N:new -> fn

let _denom = R.compose(R.dec, R.length); // [L:a] -> N:n
tstN = 11;
assert(-1, _denom([]), tstN);

/**
 *      ::  L:col -> N:ndx -> 0 | N:n
 */
let _step = R.curry((col, ndx) => _denom(col) >= 1 ? ndx / _denom(col) : 0);// L:col, N:ndx -> 0 | N:d
assert(.5, _step([1, 2, 3])(1), tstN);// dec length ==2: 1/2 -> 0.5
assert(0, _step([1])(111), tstN);// dec length < 1 -> 0
/**
 *      ::  N:ndx -> 0 | N:n
 * USE: the Class childElementCount IS constant; set its slope
 */
tstN = 10; // test: _linear
var clss_step = _step([1, 2, 3]);
assert(0.0, clss_step(0), tstN);
assert(0.5, clss_step(1), tstN);
assert(1.0, clss_step(2), tstN);

let stepSizER = (ndx, col)=> {
};// thisClssCSD -> (elem, ndx, col) ->
/**
 *          _fontSizER:: Str->Str->Str
 * @type {void|XML|string|*}
 * NOTE: using a broad regex like - /\d+/im - transforms All fontstyles
 * NOTE: using a specific Str like - 40 - transforms in this case just the clss:cur
 */
// let _fontSizER = R.replace(/\d+/im);//any one or more digits, transformer Fn  S: valu ->
let _fontSizER = R.replace('40');//any one or more digits, transformer Fn  S: valu ->

let transformers = {
    stepSize: R.multiply(1.5), //-> 75
    fontSize: _fontSizER(60), // Str -> Str
    opacity: R.multiply(3),
    textAlign: R.replace('right', 'center')// works FOR any rClss WITH initial 'center'
};
let _EVOLVE_clss_CSD;
_EVOLVE_clss_CSD = R.evolve(transformers); //  {k:v} ->{k:v}