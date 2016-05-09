"use strict";
var R = require('ramda');
//import { C_It } from '.
// .//src//modules-compiled';
var C_It = (txt) => {
    return console.log(txt)
};
var CUT, _CUT, ret, _ret, RET, EXP, TST;

/**
 *          StyleDict
 * @type {{property: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}}}
 */
const StyleDict = {
    property: {fontSize: "100%", opacity: 1.0, textAlign: "CENTER", backgroundColor: "rgba(145, 248, 29, 0.29)"}
};
var baseStyle = StyleDict.property;
// CODE:
/**
 *              TEST STUB ONLY >> _a_Wt_stub:: NUM -> NUM
 * @param i
 * @private
 */
var _a_Wt_stub = i => 35 + i * 10; // (i)->EXP: 0<ndx<
// CODE UNDER TEST
var _appendPercent = (n) => `${n}%`;  // DO NOT UNDERSTAND HOW TO MAKE THIS Pointless ?
var _divide100 = R.flip(R.divide)(100);// WORKS
var _eager_fontSize = R.compose(_appendPercent, _a_Wt_stub);// a -> b
var _eager_opacity = R.compose(_divide100, _a_Wt_stub);
var _new_Str = (s)=>R.always(s);

// THERE IS another var transformers in simpleTests.js

// ASSERT
RET = ret;
TST = R.equals('35%', R.prop('fontSize', RET));
EXP = `'EXP: textAlign: '35%' NOT ${RET}`;
console.assert(TST, EXP);
C_It(ret);
C_It(JSON.stringify(ret));




