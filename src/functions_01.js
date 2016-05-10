/**
 * Created by CLIF on 2/19/2016.
 */

"use strict";
//var R = require('ramda');

/**
 * an indexed forEach function:
 * R.forEach():: (a->*)->[a]->[a]
 *     Iterate over an input list, calling a provided function fn for each element in the list.  fn receives one argument: (value). Returns THE ORIGINAL array!!
 * addIndex() Returns function.
 *      An altered list iteration function that passes (item, index, list) to its callback
 */
var R_forEachIndexed = R.addIndex(R.forEach);
var _R_forEachIndexed = R.curry(R.addIndex(R.forEach));
var _qSelect = R.invoker(1, 'querySelector');
var _qSelectAll = R.invoker(1, 'querySelectorAll');
var _aDoc_Node = function _aDoc_Node(divStr) {
    return _qSelect(divStr)(document)
};
var _aDoc_NodeList = function _aDoc_NodeList(divStr) {
    return _qSelectAll(divStr)(document)
};
// STYLING Elements Code
var _a_Wt = i => .45 + i * .10; // EXP ndx
var _a_percentSTR = (w) => `${w * 100}%`;
var _a_normalSTR = (w) => `${w}`;
var frmtsOBJ = {
    fontSize: _a_percentSTR,
    opacity: _a_normalSTR
};
/**
 *          _a_frmted_stylWt_STR:: Str: propName -> FN Str MISSING a NUM: ndx TO INVOKE IT
 * @param stylName
 * @private
 */
var _a_frmted_stylWt_STR = (stylName)=> R.compose(frmtsOBJ[stylName], round2, _a_Wt);
/**
 *              _COMPOSE_These FROM a list
 * @param list
 * @private
 * USED initially to combine style Properties INTO one property STR then OBJ.
 */
const _COMPOSE_These = (list) => R.apply(R.compose, list);

///**
// *                  _a_styl_frmtOBJ: OBJ returned from JSON.parsed _a_frmted_stylWt_STR(stylName)
// * @param stylProp_Name
// * @param wt
// * @private
// */
//var _a_styl_frmtOBJ = R.curry((stylProp_Name, wt) => {
//    return JSON.parse(`{"${stylProp_Name}":" ${_a_frmted_stylWt_STR(stylProp_Name)(wt)}"}`
//    )
//});
//
///**
// *          _STYLE_thisVerse:: obj, node -> MUTATED node.style
// *          curried
// * @param styleObj
// * @param node
// * @returns {*}
// */
//var _STYLE_thisVerse = R.curry(function setStyle(styleObj, node) {
//    return Object.assign(node['style'], styleObj);
//});
/**
 *          AUGMENTED || MUTATED style Property:: obj, node -> MUTATED node.style
 * NOTE: composing multiple  with an initial obj, even an empty one, results in a single multi property style object.
 * @returns {a style Property Obj}
 * @param propName
 * @param propValu
 * @param trgStylObj
 */
var _newStylOBJ = R.curry(function _newStylOBJ (propName, propValu, trgStylObj) {
    return R.assoc(propName, propValu, trgStylObj)
});

// WIP   _STYL_aVerse ()  IS IN tst_STYLE_Verses.js
//var STYL_aVerse = function STYL_aVerse(stylObj, elem, ndx, coll) {
//    // once inside this function, use ndx to WEIGHT some styles
//    //_WEIGHT_someStyles(weightedStylesLST);
//
//    _STYLE_thisVerse(stylObj, elem);
//    MSG += `..(i[${ndx}] ${elem.style.textAlign}, ${elem.style.fontSize}, ${elem.style.opacity})`;
//};
//var _STYL_aVerse = R.curry(STYL_aVerse);
//var STYL_aClas = (cBFn, arr) => R_forEachIndexed(cBFn, arr);

/**
*                  _STYL_aClas:: OBJ Styl, COL of 3 class nodes
 */
var _STYL_aClas = R.curry((cBFn, arr) => R_forEachIndexed(cBFn, arr));

// *********** OLD BUT STILL IN USE
const Doc_It = (txt) => document.querySelector(".console").textContent = txt;

const C_It = (txt) => console.log(txt);
//export {C_It};

/**
 *          :: STR:text -> C_It(text) Doc_It(text)
 * @param txt
 * @constructor
 */
const C_Both = (txt) => {
    C_It(txt);
    Doc_It(txt);
};

const round2 = x => Math.round(x * 100) / 100;
const msg = (msg) => ` ${msg}`;

