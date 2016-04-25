/**
 * Created by CLIF on 4/18/2016.
 */

"use strict";
var R = require('ramda');
import { C_It } from '..//src//modules-compiled';
var ret, _ret;
var _a_Wt = i => .45 + i * .10; // EXP ndx
var round2 = x => Math.round(x * 100) / 100;
var _a_percentSTR_FNC = (w) => `${w * 100}%`;
var _an_normalSTR_FNC = (w) => `${w}`;
var frmtOBJs = {
    fontSize: _a_percentSTR_FNC,
    opacity: _an_normalSTR_FNC
};
// round2 does not work?? var _a_wtStylPropSTR = R.curry((propNameStr, ndx)=> R.compose(frmtOBJs[propNameStr], round2, _a_Wt)(ndx));
/**
 *      (propNameStr, ndx)=> R.compose(frmtOBJs[propNameStr],_a_Wt)(ndx)
 */
var _a_wtStylPropSTR = R.curry((propNameStr, ndx)=> R.compose(frmtOBJs[propNameStr],_a_Wt)(ndx));
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
//C_It(JSON.stringify(ret));
console.assert(R.not(R.is(String, ret)), 'assert: CANNOT BE Str.');
console.assert(R.is(Object, ret), 'assert: MUST BE Obj.'); //  YEAH !!


// INSTEAD i want TO APPLY ndx TO PRODUCE
// -5 then _APPLY that OBJ to a verse
// _6 then forEach(_APPLY, Verse)

// -1 1st: GET a list of property name/keys:: STR, that need weights, from a constants dictionary:>> ['fontSize', 'opacity']
var aPropLST_1 = ['fontSize', 'opacity']; // soon get this from a StylPropDCT
// -2 then CREATE a list of formatted property cB_FNC wo an index:: FNC
var _weightedPropSTR_wo_ndx_2 =  (propNameStr) => R.compose(frmtOBJs[propNameStr],_a_Wt); // WANTS index
var _a_LST_of_cBFn_wo_ndx_2 = (lst) => R.addIndex(R.map)(_weightedPropSTR_wo_ndx_2, lst);
// -3 then APPLY an Index to the list  resulting in a list of property value STRs.
var _frmtdStylePropSTR_LST_3 =  R.addIndex(R.map)((v,n,c)=> v(n), _a_LST_of_cBFn_wo_ndx_2(aPropLST_1));
ret = _frmtdStylePropSTR_LST_3;
// -4 then REDUCE them - probably with _aStylOBJ(key, val, obj) - TO one style properties OBJ
var stylPropsOBJ = R.zipObj(aPropLST_1, _frmtdStylePropSTR_LST_3(aPropLST_1));
//ret = stylPropsOBJ;

// now combine this list with a non-weighted one
// then
C_It(JSON.stringify(ret));  // OK, this WORKS - returns weight formatted list of property strings.





