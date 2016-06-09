/**
 * transformers_tests.js 6/7/17 .0515
 *  DROPPING mutating key: stepSize
 * END GET the trgt ndx into weighting fontSize and opacity
 */
/**
 * 160609 BEGIN WIP TO evolve the baseCSD -> trgtCSD USING ndx, etc
 * 10:27   It WORKS !    FN:  _trgt_clss_CSD. .TOGGLING tween passing base OR trgt CSD  IS SEEN in the browser.
 * 09.2..  removed tstN 4. It was INVOKING evoke(transformers) confusing my test WHICH still does not have a good test.
 * 08:2.. _EVOLVE_clss_CSD WORKS!! AND  IS INVOKED BY just including src=transformers_tests.js in simpleTests.html
 */
"use strict";
//GLOBAL:
var RET, CUT, tstN = 0;

/**
 *         :: ???  Str->Str this works only on CSD.fontSize
 * @type {void|XML|string|*}
 * NOTE: using a broad regex like - /\d+/im - transforms All fontstyles
 * NOTE: using a specific Str like - 40 - transforms in this case just the clss:cur
 */
let y = (x)=> x * 10 + 15;// (N:x) -> N:y
let _f = R.compose(R.always, y);// N:y -> N:x ->{a-> a}
var f = _f();
// let _fontSizER = (i)=> R.replace('90', half(i));// CSD_D:fut:fontSize:90
// let _fontSizER = (i)=> R.replace('90', half(i));// CSD_D:fut:fontSize:90

/**
 *          :: {k:()}   Obj: func used in evolve.
 * @type {{fontSize: *, opacity: *, textAlign: (XML|string|void|*)}}
 */
let transformers = {
    fontSize: R.replace('90')(R.always(4)),
    opacity: R.multiply(3),
    textAlign: R.replace("right", 'center')// NOTE:  ON ANY CSD WITH textAlign:'center'
};
// /**
//  *      :: CSD:{k:v) -> CSD{k:v}
//  *  evolves the base CSD BY weighting some of the  properties.
//  */
// let _EVOLVE_clss_CSD;
/**
 *      :: D:transformers -> D:oldCSD -> D:newCSD
 */

// /**
//  *          :: D:base CSD -> D:trgt CSD
//  *  This IS the function that DOES all the WORK of restyling each element/
//  *  USED IN: simpleTests.js
//  *  will need something like compose( _EVOLVE_(oldCSD), setTransform_ERs, setWt_ER) (trgt_Ndx)
//  * @private
//  */
// let _trgt_clss_CSD = R.curry(
//     (csd, ndx) => {
//         assert(false, 'in let _trgt_clss_CSD');
//         // A simple way to test is Breakpoint the RET. Then step thru and watch the Browser
//         // var stp = _fontSizER(ndx);
//         var CUT = R.evolve(transformers);
//         RET = csd;// BASE:  {k:v} -> {k:v}
//         // RET = CUT(csd);// TRGT:{k:v} -> {k:v}
//         return RET
//     }
// );