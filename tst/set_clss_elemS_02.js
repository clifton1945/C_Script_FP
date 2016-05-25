/**
 * set__fut_clss_trgt_elemS_02.js
 * CLIF on 20160525
 *
 * 1TAAT:: STARTing bOTTOM_up, STYLe all_versES
 *  I want verses STYLED depending on its
 *      (0)a few specific style Properties: e.g. font, opacity, color, etc
 *      (1)location relative to its Siblings
 *      (2)the  reading class: pst, cur, fut
 * 160525  new paradign
 * start with a/any verse element - a trgt_elem.
 *  It has internal context: its Properties, in this case its CSSStyleDeclarations.
 *  It has external context in the DOM: siblings, parents, css , etc
 *
 */
"use strict";
// var R = require('ramda');

var MSG, RET, EXP, TRGT, CUT, _CUT, TST, noop = 0;
/**
 *          HELPER FUNCTIONS
 */
var msg = s => console.log('t:' + s);
var tIt = R.tap(msg);
var C_It = function C_It(txt) {
    return console.log(txt);
};

var cssQuery_ = R.invoker(1, 'querySelector');
var NodER = R.flip(cssQuery_)(document);
/**
 *          TEST DATA
 */
var slctr = '.book .ChptrReadGrps .cur  .VerseReadGrps .fut > .vers ';
/**
 *          CODE UNDER TEST
 */
// NAMING THINGS
var a_fut_trgt_elemS_sTUB = NodER(slctr);//->

TRGT = a_fut_trgt_elemS_sTUB;//-> verse 4
CUT = R.prop('previousElementSibling')(TRGT);//-> null
var TRGT_plusOne = R.prop('nextElementSibling')(TRGT);//-> innerText: chptr:2 verse:5 ndx:4

// parent Name -> prop: parentNode
var _parnt = R.prop('parentNode');//-> div.fut with  verse
_CUT = _parnt(TRGT);
RET = R.prop('className', _parnt(TRGT));
// C_It(RET);

// trgt siblings count  Maybe collections.length OR R.prop('children'), R.prop('parentNode'))(TRGT)
var _fut_clss_trgt_elemS = R.compose(R.prop('children'), R.prop('parentNode'));//-> HTMLCollection[3]:: _fut_clss_trgt_elemS AKA cur_chpt_elem.children
_CUT = _fut_clss_trgt_elemS;
CUT = _fut_clss_trgt_elemS(TRGT);//-> HTMLCollection[6]
RET = CUT.length;//-> 6

// trgt_index  IN parent children:: El:a -> Coll:[a] -> Num
// R.indexOf:: a -> [a] -> Num
RET = R.indexOf(TRGT)(CUT);//-> 0
// change the target element 
var TRGT_plusOne = R.prop('nextElementSibling')(TRGT);//-> innerText: chptr:2 verse:5 ndx:4
RET = R.indexOf(TRGT_plusOne)(CUT);//-> 1

// OK i HAVE enough To SEE it Works.
// Can get trgt parent name. Used to retrieve style weight limits used in calc wt.numer;
//                       AND Used to retrieve style csds
// Can get parentNode.children.length. used in weight calc.denom
// Can get trgt index in sibling collection. Used in weight calc.numer

/**
 *          CONFIRMATION OUTPUT & ASSERTS
 */
C_It(RET);
C_It(JSON.stringify(RET));

noop = 0;


