/**
 * file: calc_Wt_02.js
 *  160531
 *      SPLIT the Style Property functions AND the Weight functions.
 *      Style Properties are universal to 'styling' a verse
 *          their presence, their list of names/keys, are listed in the StyleProperty Dict.
 *          their values are set by
 *      a Weight functions specific to the individual element and its siblings.

 *              (1) a Weight function: (N:elemNdx, L:SiblingList)-> N:wghtFactor
 *              (2) StyleStep: (D:dict) ->(clssKey)-> {N:lo, N:hi}-> N:step
 *              (3) then Style formatter is applied
 *      SO the sequence to style one Element of one rClass is
 *          (a) L:styleProperty_Lst:  ['fontSize', 'opacity',...]
 *          (a) D:styleProperty_Dct:  {fontSize:'100%', opacity: 1.0, textAlignment:'left'}
 *          (b) D:rClassWeight_Dct: {fut: {wts: {beg: 90, end:40}}, wfunc: 'lin'}
 *          stepper: (key) -> {b,e} -> N:step
 *          weighter: (S:type)->(L:sib_lst)->(N:ndx)->N:wt
 *          (d) (L:[props]) -> (stepper,weighter)->(formatter) -> the final CssStyleDeclaration
 *          (e)
 *  160630
 * STABLE:  a STEP_ER( list_of_this_read_class_siblings, ndx_of_this_elem)
 *     CAN Be USED to weight a style property.
 *     GIVEN a readClass, the cLssWght_Dict, AND a CssStyle Property and Lens
 *     this function can produce a step, add the step to properties near or far weight
 *     then applying a format depending on the Property
 *     finally use its Lense to set the CssStyleDeclaration of an element.
 *     Usually by indexed mapping.
 *
 *    this is now calc_step. A step IS ADDED To the close weight to be the weight factor
 *          It is working and tested
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
"use strict";
/**
 *      *** USE all import NOT 'require' AND import
 *      can not combine var R = require('ramda')
 *      with  import { assert } from '../src/modules-compiled';
 *      160531:  PROBLEM with import * ...ramda AND import assert from module ????
 */
import * as R from "../node_modules/ramda"
// var R = require('node_modules/ramda');
import {assert} from '../src/modules-compiled';
// const assert = (exp, ret)=> console.assert(R.equals(exp, ret), `${ret}!=${exp} @ ${noop}`);
import {C_It} from '../src/modules-compiled';
// var C_It = function C_It(txt) {    return console.log(txt);};


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
                ner_wt: 90
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
TST = {far_wt: 50, ner_wt: 90};
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
var far = R.prop('far_wt');
var ner = R.prop('ner_wt');
assert(50, far(TST));
assert(90, ner(TST));

/**
 *       clssWght_Lens: S:clssKey -> Lens s a
 * @param key
 */
let clssWght_Lens = (key) => R.lensPath(['clss', key, 'wts']);// [Str] -> Lens s a
/**
 *       a future clssWght_Lens: () -> Lens fut a
 */
let fut_clssWght_Lens = clssWght_Lens('fut');// Lens s a -> f{k} -> v

/**
 *      clssWghtLimits: D:dct -> S:clssKet -> D:wtLimits
 * @param dict
 */
let clssWghtLimits = (dict) => (clssKey) => R.view(clssWght_Lens(clssKey), dict);// -> Num

/**
 *          _init_clssWghtLimits: D:dict -> S:clss -> D:lmts
 */
let init_clssWghtLimits = clssWghtLimits(clssWght_Dict);

/**
 *          fut_clssWghtLimits:  -> D: fut: {K:a, K:b...}
 */
let fut_clssWghtLimits = init_clssWghtLimits('fut');
C_It(JSON.stringify(fut_clssWghtLimits));

/**
 *          delta: D:{N:c, N:f} -> N:ndx -> N:step
 * @param dict
 * @private
 */
const _delta = (dict) => R.subtract
    (R.prop('ner_wt')(dict))
    (R.prop('far_wt')(dict))
    ;// WHOA  subtract(ner(dict), far(dict))
assert(40, _delta(TST));

/**
 *      _numerator: D:{N:c, N:f} -> (N:ndx) -> N:numerator
 *
 */
const numerator = R.curry(R.compose(R.multiply, _delta));//
// var _numerator = R.curry(R.compose(R.multiply, R.subtract));//
// RET = _numerator(C,F); //-> 40
// RET = _numerator(TST)(N); //->80
assert(80, numerator(TST)(N));//-> 80

/**
 *      _denominator: L:[sibs] -> N:denominator
 */
var denominator = R.compose(R.dec, R.length);//-> 4
var lst = [1, 2, 3, 4, 5];
// RET = _denominator([1, 2, 3, 4, 5]);
assert(4, denominator(lst));

/**
 *      STEP_ER:(L:sibList)->(N:meNdx) -> N:step
 */
const STEP_ER =
    (lst)=> (ndx)=> R.divide(
        numerator(TST)(ndx),
        denominator(lst)
    );
// const STEP_ER = R.divide(80)(4)->20;
/**
 *      clssSTEP_ER: (N:ndx) - N:step
 * returns a weight step GIVEN a curried sibling list - which is fixed by the classKey
 */
const clssWght_LinearSTEP_ER = STEP_ER([1, 2, 3, 4, 5]);
assert(20, clssWght_LinearSTEP_ER(2));
assert(0, clssWght_LinearSTEP_ER(0));
assert(40, clssWght_LinearSTEP_ER(L - 1));

/**
 *          CONFIRMATION OUTPUT & ASSERTS
 */
// C_It(RET);
// C_It(JSON.stringify(RET));
// some more Indexs
noop = 'done';
// math procedural style
var calcWt_0 = (C, F, L)=>(N)=>(C - F) * N / (L - 1);
// some test data
C = 90, F = 50, L = 5, N = 2;
assert(20, calcWt_0(C, F, L)(N));//->N:20

