/**
 * set__fut_clss_trgt_elemS_03.js
 * CLIF on 20160526 0545
 *
 * 1TAAT:: COMBINING bOTTOM_up ADD  IndexMap the NodeList of trgt_elements
 *  I want verses STYLED depending on its
 *      (1)its location relative to its Siblings.
 *      (2)its reading class: pst, cur, fut. Obtained from its parent
 *      (3)its read class's css_style_dec Properties: e.g. font, opacity, color, etc
 *
 * 160526 begin
 *      use trgt_elemS NodeList to traverse indexedMap
 *          providing elem, sibling index, siblingS collection
 *      use _my_clss_key to provide clss_key
 *      GIVEN these pipe _my_weight, _my_css_styl_decl _set_style
 *
 * 160525 end of the day
 *   // OK i HAVE enough To SEE it Works.
 *   // Can get trgt parent name. Used to retrieve style weight limits used in calc wt.numer;
 *   //                       AND Used to retrieve style csds
 *   // Can get parentNode.children.length. used in weight calc.denom
 *   // Can get trgt index in sibling collection. Used in weight calc.numer
 * 160525  new paradign
 * start with a/any verse element - a trgt_elem.
 *  It has internal context: its Properties, in this case its CSSStyleDeclarations.
 *  It has external context in the DOM: siblings, parents, css , etc
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
/**
 *          CODE UNDER TEST
 */
// _my_clss: El:a -> Str;s
var _my_clss = R.compose(R.prop('className'), R.prop('parentNode'));
RET = _my_clss(TRGT);
console.assert(RET === "fut");
C_It(RET);
// _me:

/**
 *          CONFIRMATION OUTPUT & ASSERTS
 */
C_It(RET);
C_It(JSON.stringify(RET));

noop = 0;

//# sourceMappingURL=set_clss_elemS_03-compiled.js.map