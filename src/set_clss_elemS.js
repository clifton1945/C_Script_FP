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
var assert = function assert(exp, ret) {
    return console.assert(R.equals(exp, ret), ret + "!=" + exp);
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
var NL = fut_trgt_nl;
/**
 *          CODE UNDER TEST
 */
RET = TRGT;

/**
 *      set_fontSize AND get_fontSize USing Lenses WORKS.
 */
let _lens = (key) => R.lensPath(['style', key]);// [Str] -> Lens s a
const fontSize_lens = _lens('fontSize');
const set_fontSize = (val)=> R.set(fontSize_lens, val);// a:v -> Elem:{}
const get_fontSize = R.view(_lens('fontSize'));// Elem:a -> a

EXP = '115%';
RET = set_fontSize(EXP)(TRGT);
RET = get_fontSize(RET);
assert(EXP, RET);
EXP = '55%';
RET = set_fontSize(EXP)(RET);
Object.assign(TRGT.style, RET.style);// YEAH  NEEDED RET.style
// TRGT.style = RET.style;
RET = get_fontSize(RET);
assert(EXP, RET);
C_It("fontSize:" + RET);
C_It(JSON.stringify(RET));
noop = 1;

/**
 *          MAPPINg a List
 * @type {CSSStyleDeclaration}
 */
const _innerText = R.prop("innerText");
const inspect = (itm, ndx, lst) => { // wt: far + delta * ndx / list.length - 1) 
    C_It(40 + ndx * 50 / (lst.length - 1))
};
var node = NodER(slctr);
RET = NL;
RET = _innerText(node);
let mapIndexed = R.addIndex(R.map);
RET = mapIndexed(inspect, NL);// WORKS -> C_It of 6 innerTexts
noop = 2;

/**
 *          CONFIRMATION OUTPUT & ASSERTS
 */
// C_It(RET);
// C_It(JSON.stringify(RET));

noop = 0;
/**
 *          maybe useful in future
 * @type {CSSStyleDeclaration}
 */
var style = window.getComputedStyle(TRGT, null);// might be useful in future
// RET = style;//-> CSSStyleDeclaration. But do not see css background-color