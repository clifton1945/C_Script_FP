/**
 * calc_Wt_02.js
 *
 * calc_Wt_01 fn: N:n -> n
 * calc_Wt_01 fn: params: (CloseWt, FarWt, Length of Siblings)(NumeratorIndex) -> weight
 * calc_Wt_01 uses global arguments. FIX
 * calc_Wt_01 works but does not handle sibling NodeList of Length < 2. FIX
 * aSPD a cssStyle property dictionary is include in file but not used.
 * TO CHANGE by CLIF on 5/26
 * 0. convert _numerator() to function
 * 1. wt = gtOne? calcWt: closeWt
 *
 */
"use strict";
var R = require('ramda');

var C_It = function C_It(txt) {
    return console.log(txt);
};
var assert = (exp, ret)=> console.assert(R.equals(exp, ret), `${ret}!=${exp}`);
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
var RET, EXP, CUT, TST, noop;
//var C, F, L, N; CloseWt, FarWt, Length of Siblings, my Ndex in sibling list
var C, F, L, N;
// math procedural style
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

/**
 *  _numerator: (N:c, N:f) -> egrN:n -> N:w
 */
var _numerator = R.compose(R.multiply, R.subtract);//
// RET = _numerator(C,F); //-> 40
RET = _numerator(C, F)(N); //->80
assert(80, _numerator(C, F)(N));
var denominator = R.dec(L);//-> 4
/**
 *      eager  Numerator:(C-F)*egN / Denominator:(L-1) AND index:egN
 */
var divide_Numer_by_Denom = R.flip(R.divide)(denominator);
// RET = divide_Numer_by_Denom(CUT); //: n-> n 80/4->20
// CUT = R.compose( divide_Numer_by_Denom, _numerator);
// RET = CUT(N);//-> 20
var add_Far = R.add(F);//: n -> n

/**
 *      Wt eager index:N -> (C-F)* egN / (L-1) + F
 */
var Wt = R.compose(add_Far, divide_Numer_by_Denom, _numerator(C, F));
RET = Wt(N); //-> 70
assert(70, RET);
/**
 *          CONFIRMATION OUTPUT & ASSERTS
 */
C_It(RET);
C_It(JSON.stringify(RET));
// some more Indexs
assert(50, Wt(0));
assert(90, Wt(L - 1));

noop = '';
//};
//main();

