
"use strict";
var R = require('ramda');
import { C_It } from '..//src//modules-compiled';
//var C_It = (txt) => {return console.log(txt)};
var ret, _ret;
/**
 *              _a_Wt:: NUM -> NUM
 * @param i
 * @private
 */
var round2 = x => Math.round(x * 100) / 100;
const StyleDict = {
    property: {fontSize: "100%", opacity: 1.0, textAlign: "Center", backgroundColor: "rgba(145, 248, 29, 0.29)"}};
/**
 *          _a_scaledValue:: (NUM ndx) -> NUM scaleValue
 * @param i
 * @returns {number} minValu: <=
 * @private
 */
var _a_scaledValue = function (i) {
    return 45 + i
};
/**
 *          _a_frmtTmpl:: (DICT , STR propName) -> FN ( NUM: val) -> STR: val
 */

/**
 *          PLAN #2
 * WHAT IS the End? the Simplest IS evolve the default StyleObj
 *  using fontStyle AND key:opacity value transforms
 *  replace the key: fontStyle AND key:opacity values
 *
 * @type {StyleDict.property|{fontSize, opacity, textAlign, backgroundColor}}
 */
//  TESTS
var baseStyle = StyleDict.property;
var fontSizeStyle = {fontSize:"70%"};

ret = (a)=>{a};
C_It(ret);
C_It(JSON.stringify(ret));




