/**
 * set__fut_clss_trgt_elemS_03.js
 *
 * CLIF @ 0530 160527
 *      BEGIN Viral Mode: INJECT each elem in a list With a style some function of the last sibling.
 *  see set_css_elemS_DIALOG.js for past comments.  I may keep updating this.
 *
 */
"use strict";
// var R = require('ramda');

var MSG,
    RET,
    EXP,
    TRGT,
    CUT,
    _CUT,
    TST,
    noop = 0;
/**
 *          HELPER FUNCTIONS
 */
var msg = function msg(s) {
  return console.log('t:' + s);
};
var tIt = R.tap(msg);
var C_It = function C_It(txt) {
  return console.log(txt);
};

var cssQuery_ = R.invoker(1, 'querySelector');
var cssQuery_all = R.invoker(1, 'querySelectorAll');
var NodER = R.flip(cssQuery_)(document);
var NodeListER = R.flip(cssQuery_all)(document);

/**
 *          TEST DATA
 */
var slctr = '.book .ChptrReadGrps .cur  .VerseReadGrps .fut > .vers ';
var a_fut_trgt_elemS_sTUB = NodER(slctr);
TRGT = a_fut_trgt_elemS_sTUB;
var fut_trgt_nl = NodeListER(slctr);
// TRGT = fut_trgt_nl;
/**
 *          CODE UNDER TEST
 */
RET = TRGT;

var style = window.getComputedStyle(TRGT, null);// might be useful in future
RET = style;//-> CSSStyleDeclaration. But do not see css background-color
/**
 *      wt_rng_lens: Str:k -> Lens
 */

let _lens = (key) => R.lensPath(['style', key]);// [Str] -> Lens s a
RET = _lens('fontSize');
const set_elem_ = R.set(RET, "62%");// -> Num
const get_elem_ = R.view(RET);// -> Num
RET = set_elem_(TRGT);
RET = get_elem_(RET);
// assert(50, wts_fut['far_wt']);
// assert(95, wts_fut['ner_wt']);
C_It("wts_fut:" + RET);
C_It(JSON.stringify(RET));
noop = 1;

/**
 *          CONFIRMATION OUTPUT & ASSERTS
 */
// C_It(RET);
// C_It(JSON.stringify(RET));

noop = 0;

//# sourceMappingURL=set_clss_elemS_03-compiled.js.map