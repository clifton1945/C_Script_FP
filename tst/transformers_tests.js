/**
 * transformers_tests.js 6/7/17 .0515
 *  DROPPING mutating key: stepSize
 * END GET the trgt ndx into weighting fontSize and opacity
 */
/**
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
// let _denom1 = R.dec; // N:n -> N:n
// HOLD when want regex  let _ER = R.replace(/\d+/im);//any one or more digits, transformer Fn  S: valu ->

/**
 *          _fontSizER:: Str->Str->Str
 * @type {void|XML|string|*}
 * NOTE: using a broad regex like - /\d+/im - transforms All fontstyles
 * NOTE: using a specific Str like - 40 - transforms in this case just the clss:cur
 */
let _fontSizER = R.replace('40');//any one or more digits, transformer Fn  S: valu ->


let transformers = {
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