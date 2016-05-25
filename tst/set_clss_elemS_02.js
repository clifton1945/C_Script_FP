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

TRGT = a_fut_trgt_elemS_sTUB;
CUT = R.prop('previousElementSibling')(TRGT);//-> null
CUT = R.prop('nextElementSibling')(TRGT);//-> innerText: chptr:2 verse:5 ndx:4
var _parnt = R.prop('parentNode');//-> div.fut with  verse
_CUT = _parnt(TRGT);
RET = R.prop('className', _parnt(TRGT));
C_It(RET);
CUT = R.compose(R.prop('children'), R.prop('parentNode'))(TRGT);//-> HTMLCollection[6]
var _fut_clss_trgt_elemS = R.compose(R.prop('children'), R.prop('parentNode'));//-> HTMLCollection[3]:: _fut_clss_trgt_elemS AKA cur_chpt_elem.children
_CUT = _fut_clss_trgt_elemS;
RET = _CUT(TRGT);

// a cur_chpt_elem div
// var cur_chpt_elem = NodER(slctr);//-> div.VerseReadGrps
// // a cur_chpt_elem HAS 3 children:: each a div w/ a name: pst, cur, fut
// // each _fut_clss_trgt_elemS KNOWS its clss name. USE it In STYLING
// var fut_clss_elem_sTUB = _fut_clss_trgt_elemS.item(2);//-> this div.fut ISa elem WITH a HTMLCollection::


/**
 *          CONFIRMATION OUTPUT & ASSERTS
 */
C_It(RET);
C_It(JSON.stringify(RET));

noop = 0;


