/**
 * Created by CLIF on 2/19/2016.
 */

"use strict";
//var R = require('ramda');

/**
 * an indexed forEach function:
 * R.forEach():: (a->*)->[a]->[a]
 *     Iterate over an input list, calling a provided function fn for each element in the list.  fn receives one argument: (value). Returns THE ORIGINAL array!!
 * addIndex() Returns function.
 *      An altered list iteration function that passes (item, index, list) to its callback
 */
var R_forEachIndexed = R.addIndex(R.forEach);
var _qSelect = R.invoker(1, 'querySelector');
var _qSelectAll = R.invoker(1, 'querySelectorAll');
// STYLING Elements Code
var _a_Wt = i => .45 + i * .10; // EXP ndx
var _a_percentSTR = (w) => `${w * 100}%`;
var _a_normalSTR = (w) => `${w}`;
var frmtsOBJ = {
    fontSize: _a_percentSTR,
    opacity: _a_normalSTR
};
var _a_frmted_stylWt_STR = (stylName)=> R.compose(frmtsOBJ[stylName], _a_Wt);
var _a_frmted_styl_OBJ = R.curry(function a_frmted_stylOBJ(stylName, wt) {
    return JSON.parse(`{"${stylName}":" ${_a_frmted_stylWt_STR(stylName)(wt)}"}`
    )
});
var _setStyle = R.curry(function setStyle(styleObj, node) {
    return Object.assign(node['style'], styleObj);
});

// *********** OLD BUT STILL IN USE
const Doc_It = (txt) => document.querySelector(".console").textContent = txt;

const C_It = (txt) => console.log(txt);
//export {C_It};

const C_Both = (txt) => {
    C_It(txt);
    Doc_It(txt);
};

const round2 = x => Math.round(x * 100) / 100;
const msg = (msg) => ` ${msg}`;

