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
 *                  transformers: USED in simpleTests.js
 * @type {{fontSize, opacity: *, textAlign: (void|XML|string|*)}}
 *
 */

/**
 *         :: Str->Str->Str by _CONVERT_fontSize
 * @type {void|XML|string|*}
 * NOTE: using a broad regex like - /\d+/im - transforms All fontstyles
 * NOTE: using a specific Str like - 40 - transforms in this case just the clss:cur
 */
let _CONVERT_fontSize = (wt_ER) => R.replace('90')(wt_ER);// this sets which rClss: in this case:fut-> fontSize:90

let transformers = {
    // fontSize: _CONVERT_fontSize(R.multiply(_rClss_StepER(3)(1))), // STUB BROKEN -rClss.. does not have partialed clssE
    opacity: R.multiply(3),
    textAlign: R.replace("right", 'center')// works FOR any rClss WITH initial 'center'
};
/**
 *      :: CSD:{k:v) -> CSD{k:v}
 *  evolves the base CSD BY weighting some of the  properties.
 */
let _EVOLVE_clss_CSD;
/**
 *      :: D:transformers -> D:oldCSD -> D:newCSD
 */
_EVOLVE_clss_CSD = R.evolve(transformers); //  {k:v} -> {k:v}