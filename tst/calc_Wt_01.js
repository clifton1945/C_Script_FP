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
 * @param i
 * @private
 */
// start with  a StylePropertyDict
var aSPD = {
    cls: {
        name: 'fut'
        , smlWt: .4
        , lrgWt: .95
        , calcWt: (sObj, vObj) => {
            //noinspection JSUnusedLocalSymbols
            let {ver, ndx, ary} = vObj;
            let {smlWt, lrgWt} = sObj;
            let len = ary.length - 1;
            return (len > 0)
                ? (-(lrgWt - smlWt) / len * ndx + lrgWt)
                : lrgWt;  // always lrgWt
        }
        , styleTmpl: {
            backgroundColor: "rgba(145, 248, 29, 0.29)"
            , opacity: ".75"
            , fontSize: "75%"
        }
    },
    fn: (x)=> x * x
};
var MSG, RET, EXP, CUT, _CUT, TST, noop;
var C, F, L, N;
var calcWt_1 = (C, F, L)=>(N)=>(C - F) * N / (L - 1) + F;
// some test data
C = 90;
F = 50;
L = 5;
N = 2;
TST = calcWt_1(C, F, L)(N);//->N:70

var This = x => console.log('t:' + x);
var tap_This = R.tap(This);
//-------------------------
C = 90;
F = 50;
L = 5;
N = 2;
// -----------------------
// var subtract_CF = (c, f)=> R.subtract(c, f);
// var deltaCF = subtract_CF(C, F);//-> Num: 40
// CUT = deltaCF; //-> 40
var numerator = R.multiply(R.subtract(C, F));
// RET = R.compose( numerator)(N); //->80
var denominator = R.dec(L);//-> 4
/**
 *      eager  Numerator:(C-F)*egN / Denominator:(L-1) AND index:egN
 */
var divide_Numer_by_Denom = R.flip(R.divide)(denominator);
// RET = divide_Numer_by_Denom(CUT); //-> 80/4->20
// CUT = R.compose( divide_Numer_by_Denom, numerator);
// RET = CUT(N);//-> 20
var add_Far = R.add(F);

/**
 *      Wt eager index:N -> (C-F)* egN / (L-1) + F
 */
var Wt = R.compose(add_Far, divide_Numer_by_Denom, numerator);
RET = Wt(N); //-> 70
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


