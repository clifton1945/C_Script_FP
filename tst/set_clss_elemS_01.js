/**
 * calc_Wt_01.js
 * CHANGED by CLIF on 5/20
 */
"use strict";
var R = require('ramda');

var C_It = function C_It(txt) {
    return console.log(txt);
};
/**
 *          HELPER FUNCTIONS
 */
var MSG, RET, EXP, CUT, _CUT, TST, noop;


/**
 *          CONFIRMATION OUTPUT & ASSERTS
 */
C_It(RET);
C_It(JSON.stringify(RET));
// ASSERT
EXP = `'EXP: ${TST} NOT ${RET}`;
TST = R.equals(TST, RET);
console.assert(TST, EXP);
// some more Index
RET = Wt(0); //-> 50
RET = Wt(L - 1); //-> 90

noop = '';
//};
//main();


