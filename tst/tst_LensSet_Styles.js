"use strict";
//var R = require('ramda');
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
var _new_fontSize = R.compose(R.always, _appendPercent, _a_Wt_stub);
var _new_opacity = R.compose(R.always, _divide100, _a_Wt_stub);
var _new_Str = (s)=>R.always(s);

//NOTE:  USING .evolve I can reset the property style obj IN ONE Call
var transformStyleProperties = {
    fontSize: _new_fontSize(7),
    opacity: _new_opacity(4),
    textAlign: _new_Str('right'),
};
ret = R.evolve(transformStyleProperties, baseStyle);
// ASSERT
RET = ret;
TST = R.equals('right', R.prop('textAlign', RET));
EXP = `'EXP: textAlign: right NOT ${RET}`;
console.assert(TST, EXP);
//C_It(ret);
//C_It(JSON.stringify(ret));




