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
var _a_frmted_stylWt_STR = (stylName)=> R.compose(frmtsOBJ[stylName], round2, _a_Wt);
var _a_styl_frmtOBJ = R.curry(function a_styl_frmtOBJ (stylProp_Name, wt) {
    return JSON.parse('{"' + stylProp_Name + '":" ' + _a_frmted_stylWt_STR(stylProp_Name)(wt) + '"}');
});
/**
 *                  _a_styl_frmtOBJ: OBJ returned from JSON.parsed _a_frmted_stylWt_STR(stylName)
 * @param stylProp_Name
 * @param wt
 * @private
 */
var _a_styl_frmtOBJ = R.curry((stylProp_Name, wt) => {
    return JSON.parse(`{"${stylProp_Name}":" ${_a_frmted_stylWt_STR(stylProp_Name)(wt)}"}`
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

