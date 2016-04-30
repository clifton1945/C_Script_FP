"use strict";
// COMMENTED OUT node code FOR USE IN .html
//var R = require('ramda');
//import { C_It } from '..//src//modules-compiled';
//var C_It = (txt) => {return console.log(txt)};
var CUT, _CUT, ret, _ret;

/**
 *          StyleDict
 * @type {{property: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}}}
 */
const StyleDict = {
    property: {fontSize: "100%", opacity: 1.0, textAlign: "CENTER", backgroundColor: "rgba(145, 248, 29, 0.29)"}
};
var styleModel = StyleDict.property;
// CODE:
/**
 *              TEST STUB ONLY >> _a_Wt:: NUM -> NUM
 * @param i
 * @private
 */
var _a_Wt = i => 35 + i * 10; // EXP ndx
// CODE UNDER TEST
var _appendPercent = (n) => `${n}%`;  // DO NOT UNDERSTAND HOW TO MAKE THIS Pointless ?
//var _divide100 = (n) => R.divide(n, 100);//WORKS
var _divide100 = R.flip(R.divide)(100);// WORKS
var _new_fontSize = R.compose(R.always, _appendPercent, _a_Wt);
var _new_opacity = R.compose(R.always, _divide100, _a_Wt);
var _newStr = (s)=>R.always(s);

var i = 7;
var transformations = {
    opacity:_new_opacity(i), // a function that can be applied to WHICH theKey OR theValue ?
    fontSize: _new_fontSize(i),
    textAlign: _newStr('right'),
};
var new_stylObj = R.evolve(transformations, styleModel);

ret= new_stylObj;
// COMMENTED OUT FOR USE IN simpleTests.js
//C_It(ret);
//C_(JSON.stringify(ret));
//var _new_fontSize = (n) => R.always(_appendPercent(_a_Wt(n))); // WORKS
//var _new_opacity = (n) => R.always(_divide100(_a_Wt(n))); //WORKS
// FINAL FORM




