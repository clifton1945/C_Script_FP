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
C_It(R.compose(frmtsOBJ['fontSize'], _a_Wt)(0.3));

