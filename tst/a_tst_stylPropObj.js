/**
 * Created by CLIF on 4/18/2016.
 */

"use strict";
var R = require('ramda');
import { C_It } from '..//src//modules-compiled';
var ret, _ret;
var _a_Wt = i => .45 + i * .10; // EXP ndx
var _a_percentSTR_FNC = (w) => `${w * 100}%`;
var _an_normalSTR_FNC = (w) => `${w}`;
var frmtsOBJ = {
    fontSize: _a_percentSTR_FNC,
    opacity: _an_normalSTR_FNC
};
var _a_frmted_stylWt_STR = (stylProp_Name)=> R.compose(frmtsOBJ[stylProp_Name], _a_Wt);
var _a_frmted_stylSTR = (stylProp_Name, wt) => {
    return JSON.parse(`{"${stylProp_Name}":" ${_a_frmted_stylWt_STR(stylProp_Name)(wt)}"}`
    )
};
// TESTS
ret = _a_frmted_stylSTR('fontSize', .2);//-> STR:: fontSize: 47%
C_It(ret);
C_It(R.is(String,ret));
C_It(R.is(Object,ret)); //  YEAH !!




