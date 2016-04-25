/**
 * Created by CLIF on 4/18/2016.
 */

"use strict";
var R = require('ramda');
import { C_It } from '..//src//modules-compiled';
var ret, _ret;
/**
 *              _a_Wt:: NUM -> NUM
 * @param i
 * @private
 */
var _a_Wt = i => .45 + i * .10; // EXP ndx
var round2 = x => Math.round(x * 100) / 100;
var _a_percentSTR_FNC = (w) => `${w * 100}%`;
var _an_normalSTR_FNC = (w) => `${w}`;
var frmtOBJs = {
    fontSize: _a_percentSTR_FNC,
    opacity: _an_normalSTR_FNC
};

// This approach APPLIES the ndx, and maybe coll BEFORE ASSEMBLING each property STR -> OBJ
/**
 *      (propNameStr, ndx)=> R.compose(frmtOBJs[propNameStr],_a_Wt)(ndx)
 */
var _a_wtStylPropSTR = R.curry((propNameStr, ndx)=> R.compose(frmtOBJs[propNameStr], _a_Wt)(ndx));
/**
 *          _aStylOBJ:: AUGMENTED || MUTATED style Property:: obj, node -> MUTATED node.style
 * NOTE: composing multiple  with an initial obj, even an empty one, results in a single multi property style object.
 * @returns {a style Property Obj}
 * @param propName
 * @param propValu
 * @param trgStylObj
 */
var _aStylOBJ = R.curry(function _newStylOBJ(propNameStr, propValuStr, trgStylObj) {
    return R.assoc(propNameStr, propValuStr, trgStylObj)
});
var _a_newStylOBJ = R.curry(function (nameStr, ndx) {
    //var r = R.compose(_aStylOBJ(nameStr), _a_wtStylPropSTR(nameStr))(ndx);
    //OR
    var s = _a_wtStylPropSTR(nameStr)(ndx);
    var r = _aStylOBJ(nameStr, s);
    return r; // _aStylOBJ IS WAITING4 stylObj
});
// TESTS
var i = 1;
var _cntr = _aStylOBJ('textAlign', 'center');
var cntr = _cntr({});
// using __a_newStylOBJ
ret = _a_newStylOBJ('fontSize',i)( cntr);
ret = _a_newStylOBJ('opacity', i)(ret);
C_It(JSON.stringify(ret));
console.assert(R.not(R.is(String, ret)), 'assert: CANNOT BE Str.');
console.assert(R.is(Object, ret), 'assert: MUST BE Obj.'); //  YEAH !!


// INSTEAD this below will ASSEMBLE weighted style properties
//and then APPLY an index  AT the final mapping of eachVerse
i = 1;
// -1 1st: GET a list of property name/keys:: STR, that need weights, from a constants dictionary:>> ['fontSize', 'opacity']
var aPropLST_1 = ['fontSize', 'opacity']; // soon: get this from a StylPropDCT

// -2 then CREATE a list of formatted property cB_FNC wo an index:: FNC
/**
 *          _a_wtPropSTR:: (STR)->(NUM) -> STR
 *  @param propNameStr STR
 *  @param index NUM  WAITING from _a_Wt function
 *  @return weight formatted styl Prop STR
 */
var _a_wtPropSTR =  R.curry((propNameStr) => R.compose(frmtOBJs[propNameStr], round2, _a_Wt)); // WANTS index

ret = _a_wtPropSTR('fontSize');// NOTE: partial of 'fontSize'
C_It(`tst weighted STR for (i) -> ` + JSON.stringify(ret(i)));
// now make a LST of
/**
 *          _a_wtPropLST:: [LST]->(NUM) -> LST
 * @param lst
 * @private
 */
var _a_wtPropLST = (lst) => R.map(_a_wtPropSTR, lst);

ret = _a_wtPropLST(aPropLST_1);
C_It(JSON.stringify(ret[0](i)));
// -4 then REDUCE the list TO one style properties OBJ
/**
 *          a_stylPropOBJ:: (LST) -> (NUM) -> OBJ
 * @param lst
 * @returns {*}
 */
var stylPropsOBJ = function stylPropsOBJ(lst) { return R.zipObj(lst, _a_wtPropLST(lst))};

ret = stylPropsOBJ (aPropLST_1); //STILL WANTING an Index
C_It(JSON.stringify(ret.opacity(i)));  // ok SEES this one property
console.assert(R.not(R.is(String, ret)), 'assert: CANNOT BE Str.');
console.assert(R.is(Object, ret), 'assert: MUST BE Obj.'); //  YEAH !!
// thus a_StylProp_OBJ will be the callBack function of  STYLE_a_Verse




