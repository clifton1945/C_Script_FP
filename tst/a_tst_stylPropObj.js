/**
 * Created by CLIF on 4/18/2016.
 */

"use strict";
var R = require('ramda');
import { C_It } from '..//src//modules-compiled';
var ret, _ret;
var _a_Wt = i => .45 + i * .10; // EXP ndx
var _a_percentSTR_FNC = (w) => `${w * 100}%`;
var _an_normalSTR_FNC = (w) => `${w}`;
var frmtOBJs = {
    fontSize: _a_percentSTR_FNC,
    opacity: _an_normalSTR_FNC
};
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
    //var s = _a_wtStylPropSTR(nameStr)(ndx);
    //var r = _aStylOBJ(nameStr, s);
    //OR
    //var r = R.compose(_aStylOBJ(nameStr), _a_wtStylPropSTR(nameStr))(ndx);
    //return r; // _aStylOBJ IS WAITING4 stylObj
    //OR
    var r = R.compose(
        _aStylOBJ(nameStr)
        , _a_wtStylPropSTR(nameStr))
    (ndx);
    return r; // _aStylOBJ IS WAITING4 stylObj
});
/**
 *          _y DID NOT WORK - DID NOT SPEND TIME ON IT
 */
var _y = R.curry(function (nameStr, trgtObj) {
    var s = _a_wtStylPropSTR(nameStr); // PARTIAL: WANTS (ndx);
    var r = _aStylOBJ(nameStr, s, trgtObj);
    //OR
    //var r = R.compose(_aStylOBJ(nameStr), _a_wtStylPropSTR(nameStr))(ndx);
    return r; // _aStylOBJ IS WAITING4 ndx
});
// TESTS
var i = 0;
var _cntr = _aStylOBJ('textAlign', 'center');
var cntr = _cntr({});
// using _x
_ret = _x('fontSize', i);
ret = _ret(cntr);
ret = _x('opacity', i)(ret);

C_It(JSON.stringify(ret));
console.assert(R.not(R.is(String, ret)), 'assert NOT Str.');
console.assert(R.is(Object, ret), 'assert IS Obj.'); //  YEAH !!




