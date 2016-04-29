/**
 * SCALE some of the Verse.style Properties as a function of (propName and verse index in a collection).
 *      OVERALL
 *      _SCALE (listOfPropertyKeys, _SCALING_function(ndx, coll))
 *  SO  _SCALING_function(propName, ndx, coll)
 *      _a_scaledValue:: (NUM ndx) -> NUM scaleValue
 *      _a_frmtTmpl:: (STR propName)-> (TMPL: propTmpl)
 *  _a_frmtedValue:: (NUM scaleValue) -> STR formatted str value
 *
 *  propertyKeys:: [LST[str, str, ..]
 *  propertyValues::LST by APPLY _a_propertyValue to propertyKeys: some keys do not have to be scaled!
 *  propertyObj:: zipObj( propertyKeys, propertyValues)
 *
 * Created by CLIF on 4/26/2016.
 *
 */
"use strict";

var R = require('ramda');
import { C_It } from '..//src//modules-compiled';
//var C_It = (txt) => {return console.log(txt)};
var ret, _ret;
/**
 *              _a_Wt:: NUM -> NUM
 * @param i
 * @private
 */
var round2 = x => Math.round(x * 100) / 100;
const StyleDict = {
    property: {fontSize: "100%", opacity: 1.0, textAlign: "Center", backgroundColor: "rgba(145, 248, 29, 0.29)"}};
/**
 *          _a_scaledValue:: (NUM ndx) -> NUM scaleValue
 * @param i
 * @returns {number} minValu: <=
 * @private
 */
var _a_scaledValue = function (i) {
    return 45 + i
};
/**
 *          _a_frmtTmpl:: (DICT , STR propName) -> FN ( NUM: val) -> STR: val
 */
var _a_frmtTmpl = R.curry(function _a_frmtTmpl(dict, propName) {
    return dict[propName]
});
/**
 *          _a_frmtedValue:: (OBJ, STR -> (NUM) ->STR formatted str value
 * @param dict OBJ
 * @param propName STR
 * @param ndx NUM
 * @returns {string} formatted scaled value
 * @private
 */
var _a_frmtedValue = R.curry(function (styledict, propName, ndx) {
        return R.compose(_a_frmtTmpl(styledict)(propName), _a_scaledValue(ndx))
    });
/**
 *   /   A PLAN
 *  _the_stylObj:: (sDict) => {obj}
 *  _the_propVals::  {obj}=>[v]
 *  _the_propKeys::  {obj}=>[k]
 *  _the_numeric_key:: -> v
 *  _a_new_propValu:: (i,[a]) => Num w
 *  ASSOC_(thiskey
 *
 *  NOT SURE AT THIS POINT
 *  ASSOC_(thisProp, _this_propValu)(_the_propObj)
 *  _this_StylObj (ndx, coll) = {k:v}
 *  _STYL_aVerse({thisStylObj, elem)=> elem
 *
 */

/**
 *          PLAN #2
 * WHAT IS the End? the Simplest IS evolve the default StyleObj
 *  using fontStyle AND key:opacity value transforms
 *  replace the key: fontStyle AND key:opacity values
 *
 * @type {StyleDict.property|{fontSize, opacity, textAlign, backgroundColor}}
 */
//  TESTS
var baseStyle = StyleDict.property;
var fontSizeStyle = {fontSize:"70%"};
var fi = i =>`${(i)}%`;
var i = 10;
var rng = R.range(0,7);
var iLst = R.map(i=>i*10, rng);
//ret = R.map(_CUT, iLst);  // >> so far this returns 7 repeated base styles WITHOUT fontSize
ret = _a_frmtedValue(StyleDict.scaleable, 'fontSize', i);
C_It(ret);
//C_It(JSON.stringify(ret));
//console.assert(R.not(R.is(String, ret)), 'assert: CANNOT BE Str.');
//console.assert(R.is(Object, ret), 'assert: MUST BE Obj.'); //  YEAH !!



