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
/**
     *          CODE UNDER TEST
     */
    
    /**
     *          CONFIRMATION OUTPUT & ASSERTS
     */
    C_It(RET);
C_It(JSON.stringify(RET));
// ASSERT
EXP = 0;
TST = R.equals(EXP, RET);
MSG = `'EXP: ${TST} NOT ${RET}`;
console.assert(TST, MSG);

noop = 1;


