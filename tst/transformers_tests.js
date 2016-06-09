/**
 * transformers_tests.js 6/7/17 .0515
 *  DROPPING mutating key: stepSize
 * END GET the trgt ndx into weighting fontSize and opacity
 */
/**
 * 160609 BEGIN WIP TO evolve the baseCSD -> trgtCSD USING ndx, etc
 * 09.2..  removed tstN 4. It was INVOKING evoke(transformers) confusing my test WHICH still does not have a good test.
 * 08:2.. _EVOLVE_clss_CSD WORKS!! AND  IS INVOKED BY just including src=transformers_tests.js in simpleTests.html
 * 07:22 MOVED FN: _trgt_clss_CSD TO transformers_tests.js FROM simpleTests.js
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
    // opacity: R.multiply(3),
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

/**
 *          :: D:base CSD -> D:trgt CSD
 *  This IS the function that DOES all the WORK of restyling each element/
 *  USED IN: simpleTests.js
 *  will need something like compose( _EVOLVE_(oldCSD), setTransform_ERs, setWt_ER) (trgt_Ndx)
 * @private
 */
let _trgt_clss_CSD = (csd) => {
    // do some work here. like evolve
    var CUT = R.evolve(transformers);
    // var ret = CUT(csd);// TRGT:{k:v} -> {k:v}
    var ret = csd;// BASE:  {k:v} -> {k:v}
    return ret
};
// _EVOLVE_clss_CSD = R.evolve(transformers); //  {k:v} -> {k:v}