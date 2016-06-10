/**
 * transformers_tests.js 6/7/17 .0515
 *  DROPPING mutating key: stepSize
 * END GET the trgt ndx into weighting fontSize and opacity
 */
/**
 * 160610 0700  dropping evolve and transform. Will use Lens
 *
 * 160609 BEGIN WIP TO evolve the baseCSD -> trgtCSD USING ndx, etc
 * 10:27   It WORKS !    FN:  _trgt_clss_CSD. .TOGGLING tween passing base OR trgt CSD  IS SEEN in the browser.
 * 09.2..  removed tstN 4. It was INVOKING evoke(transformers) confusing my test WHICH still does not have a good test.
 * 08:2.. _EVOLVE_clss_CSD WORKS!! AND  IS INVOKED BY just including src=transformers_tests.js in simpleTests.html
 */
"use strict";
//GLOBAL:
var RET, CUT, tstN = 0;

/**
 *      --------------------------HELPERS for _RESTYLE_trgts
 */
/**
 *      _rClssE_key:  clssE -> S:e.classNameKey
 * @param rcE
 * @private
 */
// const _rClssE_key = R.prop('className');
// /**
//  *      S:key -> D:CSD_D i.e. CssStyleDeclarations  Dict
//  *      NOTE: styleProps hard coded into _rClssE_CSD
//  */
//ORIG const _rClssE_ = R.flip(R.prop)(CSD_D);
// const _rClssE_CSD = R.flip(R.prop);

