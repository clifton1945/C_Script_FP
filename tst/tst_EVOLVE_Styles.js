"use strict";
var R = require('ramda');
import { C_It } from '..//src//modules-compiled';
//var C_It = (txt) => {return console.log(txt)};
var CUT, _CUT, ret, _ret;
/**
 *              _a_Wt:: NUM -> NUM
 * @param i
 * @private
 */
var _a_Wt = i => 35 + i * 10; // EXP ndx
var round2 = x => Math.round(x * 100) / 100;
const StyleDict = {
    property: {fontSize: "100%", opacity: 1.0, textAlign: "CENTER", backgroundColor: "rgba(145, 248, 29, 0.29)"}
};
/**
 *          _newStyleObj
 * @type {StyleDict.property|{fontSize, opacity, textAlign, backgroundColor}}
 */

//  TESTS
var baseStyle = StyleDict.property;
// CODE UNDER TEST
var n = 6;
var _appendPercent = (n) => `${n}%`;
var _divid100 = (n) => R.divide(n, 100);//WORKS
var _newStr = (s)=>R.always(s);
// FINAL FORM
//var _new_fontSize = (n) => R.always(_appendPercent(_a_Wt(n))); // WORKS
var _new_fontSize = R.compose(R.always, _appendPercent, _a_Wt);
//var _new_opacity = (n) => R.always(_divid100(_a_Wt(n))); //WORKS
var _new_opacity = R.compose(R.always, _divid100, _a_Wt);
var i = 3;
var transformations = {
    opacity:_new_opacity(i),
    fontSize: _new_fontSize(i),
    textAlign: _newStr('right'),
};
ret = R.evolve(transformations, baseStyle);

C_It(ret);
C_It(JSON.stringify(ret));




