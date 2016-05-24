/**
 * _01_template.js
 * CHANGED by CLIF on 5/20
 */

"use strict";
// var R = require('ramda');

var C_It = function C_It(txt) {
    return console.log(txt);
};
var MSG, RET, EXP, CUT, _CUT, TST, noop = 0;
/**
 *          HELPER FUNCTIONS
 */


/**
 *          TEST DATA
 */
var cur_chpt_elem =
    /**
     *          CODE UNDER TEST
     */
    /**
     *          CONFIRMATION OUTPUT & ASSERTS
     */
    C_It(RET);
C_It(JSON.stringify(RET));
// ASSERT
EXP = `'EXP: ${TST} NOT ${RET}`;
TST = R.equals(TST, RET);
console.assert(TST, EXP);

noop = 1;


