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
var _a_Wt = i => .45 + i * .10; // EXP ndx
var _a_percentSTR = (w) => `${w * 100}%`;
var _a_normalSTR = (w) => `${w}`;
var frmtsOBJ = {
    fontSize: _a_percentSTR,
    opacity: _a_normalSTR
};
var _a_frmted_stylWt_STR = (stylName)=> R.compose(frmtsOBJ[stylName], _a_Wt);
var _a_styl_frmtOBJ_wO_braces = (stylName, wt) => {
    return JSON.parse(`'"${stylName}":" ${_a_frmted_stylWt_STR(stylName)(wt)}"'`
    )
};
var _a_styl_frmtOBJ_w_braces = (stylProp_Name, wt) => {
    return JSON.parse(`{"${stylProp_Name}":" ${_a_frmted_stylWt_STR(stylProp_Name)(wt)}"}`
    )
};
// TESTS

// hey, try .mergeAll(
var prop1 = _a_styl_frmtOBJ_w_braces('fontSize', .2);//-> STR:: fontSize: 47%
var prop2 = _a_styl_frmtOBJ_w_braces('opacity', .2);//-> STR:: fontSize: 47%
C_It(prop1); // NOTE: JSON.parse encloses the string with braces
C_It(prop2); // NOTE: JSON.parse encloses the string with braces
ret = prop1;
C_It(R.is(String,ret)); // EXP: false
C_It(R.is(Object,ret)); //  YEAH !!


// CAN NOT PROVE It HERE BECAUSE NO html. NOT Here
var _setStyle = R.curry(function setStyle(styleObj, node) {
    return Object.assign(node['style'], styleObj);
});




