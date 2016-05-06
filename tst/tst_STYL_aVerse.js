
"use strict";
var R = require('ramda');  //COMMENTED OUT FOR USE IN simpleTest.js
import { C_It } from '..//src//modules-compiled';
var ret, _ret;

/**
 *          _STYLE_thisVerse:: obj, node -> MUTATED node.style
 *          curried
 * @param styleObj
 * @param node
 * @returns {*}
 */
var _STYLE_thisVerse = R.curry(function setStyle(styleObj, node) {
    return Object.assign(node['style'], styleObj);
});

var STYL_aVerse = function STYL_aVerse(stylObj, elem, ndx, coll) {
    // once inside this function, use ndx to WEIGHT some styles
    //_WEIGHT_someStyles(weightedStylesLST);

    _STYLE_thisVerse(stylObj, elem);
    MSG += `..(i[${ndx}] ${elem.style.textAlign}, ${elem.style.fontSize}, ${elem.style.opacity})`;
};
var _STYL_aVerse = R.curry(STYL_aVerse);
// TESTS
ret = "DFGHJKL:";
C_It(ret);




