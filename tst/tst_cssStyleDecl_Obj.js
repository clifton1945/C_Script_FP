"use strict";
//var R = require('ramda');

//import { C_It } from '.
// .//src//modules-compiled';

var CUT, _CUT, ret, _ret, RET, EXP, TST, STR, KEY;
var C_It = (txt) => {
    return console.log(txt)
};
var tIt = a => console.log(`t:${a}`);
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
// CODE UNDER TEST -> so far I return a cssStyleObj

var _appendPercent = (n) => `${n}%`;  // DO NOT UNDERSTAND HOW TO MAKE THIS Pointless ?
var _divide100 = R.flip(R.divide)(100);// WORKS
//
var opacity_Key = 'opacity';
var opacity_Valu = R.assoc();//(propNameStr, propValu, basePropObj) -> {}
var _opacity_Valu_eagerWt = opacity_Valu(opacity_Key, R.__, baseStyle); //NOTE: requires a global baseStyle
/**
 *          _opacity_cssSObj_eagerNdx:: (Num: ndx) -> {Obj: cssStyleDec}.
 *
 */
var _opacity_cssSObj_eagerNdx = R.compose(_opacity_Valu_eagerWt, _divide100, _a_Wt_stub);

CUT = _opacity_cssSObj_eagerNdx(0); // test @ ndx==0
//C_It(CUT);
//C_It(JSON.stringify(CUT));
// ASSERT
KEY = opacity_Key;
EXP = 0.35;
TST = R.propEq(KEY, EXP)(CUT);
STR = `EXP ${KEY}== ${EXP} NOT ${R.prop(KEY, CUT)}`;
console.assert(TST, STR);

var _aDoc_Node = function _aDoc_Node(divStr) {
    return _qSelect(divStr)(document)
};
var _aDoc_NodeList = function _aDoc_NodeList(divStr) {
    return _qSelectAll(divStr)(document)
};
// fontSize Value
var fontSize_Key = 'fontSize';
var fontSize_Valu = R.assoc(); // (propStr, propValu, cssSO)-> {};
var _fontSize_Valu_eagerWt = fontSize_Valu(fontSize_Key, R.__, baseStyle); //NOTE: requires a global baseStyle
/**
 *          _fontSize_cssSO_eagerNdx:: (Num: ndx) -> Obj:cssStyleDec.
 */
var _fontSize_cssSO_eagerNdx = R.compose(_fontSize_Valu_eagerWt, _appendPercent, _a_Wt_stub);


CUT = _fontSize_cssSO_eagerNdx(0); // test @ ndx==0
//C_It(CUT);
//C_It(JSON.stringify(CUT));
// ASSERT
KEY = fontSize_Key;
EXP = '35%';
TST = R.propEq(KEY, EXP)(CUT);
STR = `EXP ${KEY}==${EXP} NOT ${R.prop(KEY, CUT)}`;
console.assert(TST, STR);




