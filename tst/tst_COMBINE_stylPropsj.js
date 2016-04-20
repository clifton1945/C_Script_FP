/**
 *              tst_COMBINE_stylProps.js
 * Created by CLIF on 4/18/2016.
 *
 */

"use strict";
var R = require('ramda');
import { C_It } from '..//src//modules-compiled';
var ret, _ret;

// STYLING Elements Code
const round2 = x => Math.round(x * 100) / 100;
var _a_Wt = i => .45 + i * .10; // EXP ndx
var _a_percentSTR = (w) => `${w * 100}%`;
var _a_normalSTR = (w) => `${w}`;
var frmtsOBJ = {
    fontSize: _a_percentSTR,
    opacity: _a_normalSTR
};
var _a_frmted_stylWt_STR = (stylName)=> R.compose(frmtsOBJ[stylName], round2, _a_Wt);
var _a_styl_frmtOBJ_wO_braces = (stylName, wt) => {
    return JSON.parse(`'"${stylName}":" ${_a_frmted_stylWt_STR(stylName)(wt)}"'`
    )
};
//COMMENT OUT FOR NOW, it is being accessed by simpletests  var _a_styl_frmtOBJ = (stylProp_Name, wt) => {
//    return JSON.parse(`{"${stylProp_Name}":" ${_a_frmted_stylWt_STR(stylProp_Name)(wt)}"}`
//    )
//};
// TESTS

// hey, try .mergeAll(
var prop1 = _a_styl_frmtOBJ('fontSize', .2);//-> OBJ:: fontSize: 47%
var prop2 = _a_styl_frmtOBJ('opacity', .2);//-> OBJ:: { opacity: ' 0.47' }
C_It(prop1);
C_It(prop2);
ret = prop1;
C_It(R.is(String,ret)); // EXP: false
C_It(R.is(Object,ret)); //  YEAH !!
ret = R.mergeAll([prop1, prop2]);
C_It(ret);




