"use strict";
/**
 * calc_Wt_02.js
 *  160528  back to rebuild a WEIGHTER: (D:clssWghtDct)(S:clssKey)(L:sibs)(N:ndx) -> N:0>=w<=1
 *      other functions: a clssWghtINIT_ER, clssWghtWEIGHT_ER, a clssWght_FORMAT_ER, clssWghtCSD_SETT_ER.
 *      STYLER: (D:clssWghtDct) (S:clssKey) (L:[elms]) -> L
 *
 *     INIT_ER: (D:clssWghtDct)(S:clssWghtKey) -> {clssWghtVals}
 *      want to unpack init obj,
 *     STEP_ER: (D: wts)-> (egrL: sibs) -> N:step
 *      compose denominator, triage denominator, compose numerator, complete the step.
 *      NOTE:
 **
 */
var R = require('ramda');

var C_It = function C_It(txt) {
    return console.log(txt);
};
const assert = (exp, ret)=> console.assert(R.equals(exp, ret), `${ret}!=${exp}`);
/**
 *          HELPER FUNCTIONS
 * @param i
 * @private
 */
// start with  a clssWghtDict
let clssWght_Dict = {
    clss: {
        fut: {
            wts: {
                far_wt: 50,
                ner_wt: 95
            }
        }
        ,
        cur: {
            wts: {
                far_wt: 100,
                ner_wt: 100
            }
        }
        ,
        pst: {
            wts: {
                far_wt: 30,
                ner_wt: 80
            }
        }
    },
    styleTmpl: {
        backgroundColor: "rgba(145, 248, 29, 0.29)"
        , opacity: ".75"
        , fontSize: "75%"
    }
};

var RET, EXP, CUT, TST, noop;
//var C, F, L, N; CloseWt, FarWt, Length of Siblings, my Ndex in sibling list
var C, F, L, N;
var This = x => console.log('t:' + x);
var tap_This = R.tap(This);
//-------------------------
C = 90, F = 50, L = 5, N = 2;
// -----------------------
/**
 *       INIT_ER: (D:clssWghtDct)(S:clssWghtKey) -> {clssWghtVals}
 *       CssStyleDeclaration 
 *      _retrieve_dflt_wts: ({D:d}) -> (S:s) -> {d}
 *      _retrieve this class default small and la
 * @param dct
 * @param key
 * @private
 */

let clssWght_Lens = (key) => R.lensPath(['clss', key, 'wts']);// [Str] -> Lens s a
let fut_clssWght_Lens = clssWght_Lens('fut');// Lens s a -> f{k} -> v


/**
 *      clssWghtLimits: D:dct -> S:clssKet -> D:wtLimits
 * @param dict
 */
let clssWghtLimits = (dict) => (clssKey) => R.view(clssWght_Lens(clssKey), dict);// -> Num
const _init_clssWghtLimits = clssWghtLimits(clssWght_Dict);
let fut_clssWgthLimits = _init_clssWghtLimits('fut');
// tests
RET = fut_clssWgthLimits;
assert(50, RET['far_wt']);
assert(95, RET['ner_wt']);
C_It(JSON.stringify(RET));
noop = 1;

/**
 *  _numerator: (N:c, N:f) -> egrN:n -> N:w
 *
 */
var _numerator = R.curry(R.compose(R.multiply, R.subtract));//
// RET = _numerator(C,F); //-> 40
// RET = _numerator(C, F)(N); //->80
assert(80, _numerator(C)(F)(N));//-> 80

/**
 *      _denominator: L:sibs -> N:den
 */
var _denominator = R.dec(L);//-> 4

/**
 *      divide_Numer_by_Denom: N:n -> N:n
 */
var divide_Numer_by_Denom = R.flip(R.divide)(_denominator);

/**
 *      STEP_ER:
 */
const STEP_ER = R.compose(divide_Numer_by_Denom, _numerator(C, F));
RET = STEP_ER(N); //-> 20
assert(20, RET);
/**
 *          CONFIRMATION OUTPUT & ASSERTS
 */
C_It(RET);
C_It(JSON.stringify(RET));
// some more Indexs
assert(0, STEP_ER(0));
assert(40, STEP_ER(L - 1));

noop = '';

// math procedural style
var calcWt_0 = (C, F, L)=>(N)=>(C - F) * N / (L - 1);
// some test data
C = 90, F = 50, L = 5, N = 2;
assert(20, calcWt_0(C, F, L)(N));//->N:20

