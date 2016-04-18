/**
 * Created by CLIF on 4/18/2016.
 */

"use strict";
var R = require('ramda');
var ret;
var _a_Wt = i => .45 + i * .10; // EXP ndx
var _a_percentSTR_FNC = (w) => `${w * 100}%`;
var _an_normalSTR_FNC = (w) => `${w}`;
var _a_fmtd_Wt = (_a_fmtER, i) => R.compose(_a_fmtER, _a_Wt); // partial waiting i
// thus
var a_fontSize_frmtSTR = _a_fmtd_Wt(_a_percentSTR_FNC); //  partial: exp index
var a_opacity_frmtSTR = _a_fmtd_Wt(_an_normalSTR_FNC); //  partial: exp index

/**
 * *                a_stylPropOBJ:: nameSTR, wt, _frmt -> Obj
 * e.g. fn( 'fontSize', .7, _fontSizeFMT) -> { fontSize: '70%'}
 *
 * @param nameSTR
 * @param varSTR
 * @param OBJ
 * @return {*}
 */
var a_stylPropOBJ = function a_stylPropOBJ (nameSTR, varSTR,  OBJ) {
    return R.assoc(nameSTR, varSTR, OBJ)
};
var _a_stylPropOBJ = R.curry(a_stylPropOBJ);
// the basic
ret = a_stylPropOBJ('fontSize', '70%', {}); //-> { fontSize: '70%' }
console.log(ret);
//for example
var a_fontSize_stylPropOBJ = _a_stylPropOBJ('fontSize', a_fontSize_frmtSTR(.3))({});
var a_opacity_stylPropOBJ = _a_stylPropOBJ('opacity', a_opacity_frmtSTR)(.3)(a_fontSize_stylPropOBJ);
ret = a_opacity_stylPropOBJ;
console.log(ret);

// tests


//console.log(ret({}));
