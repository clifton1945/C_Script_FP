"use strict";
//var R = require('ramda');
//import { C_It } from '..//src//modules-compiled';
var C_It = (txt) => {
    return console.log(txt)
};
var CUT, _CUT, ret, _ret;

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
 *              TEST STUB ONLY >> _a_Wt:: NUM -> NUM
 * @param i
 * @private
 */
// CODE UNDER TEST
//var _divide100 = (n) => R.divide(n, 100);//WORKS
var _a_Wt = i => 35 + i * 10; // EXP ndx
var _appendPercent = (n) => `${n}%`;  // DO NOT UNDERSTAND HOW TO MAKE THIS Pointless ?
var _divide100 = R.flip(R.divide)(100);// WORKS
var _new_fontSize = R.compose(R.always, _appendPercent, _a_Wt);
var _new_opacity = R.compose(R.always, _divide100, _a_Wt);
// var _newStr = (s)=>R.always(s);

//var opacity_lens = R.lensProp('opacity');
//ret = R.set(opacity_lens)(.1234)(baseStyle);// good> 0.1234
//var _set_opac = R.set(opacity_lens);
//ret = R.flip(_set_opac)(baseStyle)(.3456);//good> 0.3456
//var _set_opacity = R.set(R.lensProp('opacity'));
var _set_opacity = R.compose(R.set, R.lensProp)('opacity');
//ret = _set_opacity(_a_Wt(3))(baseStyle);// good>>65
var _set_opacity_Wt = R.compose(_set_opacity, _divide100, _a_Wt);
ret = _set_opacity_Wt(2)(baseStyle);// good> 0.55

var _set_fontSize = R.compose(R.set, R.lensProp)('fontSize');
//ret = _set_fontSize(_a_Wt(3))(baseStyle);// good>>65
var _set_fontSize_Wt = R.compose(_set_fontSize, _appendPercent, _a_Wt);
ret = _set_fontSize_Wt(2)(ret);// good> fontSize: '0.55%' AND opacity: 0.55

//C_It(ret);
//C_It(JSON.stringify(ret));




