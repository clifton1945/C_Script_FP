/**
 * USE OF a StylePropertiesDict
 * CHANGED by CLIF on 5/17
 */
"use strict";
var C_It = function C_It(txt) {
    return console.log(txt);
};
var R = require('ramda');
//import { testStr } from '..//src//modules-compiled'; // WORKS but throws Inspection 'can't resolve

/**
 *  a Book has three ChapterClasses [ClassOfChptrs]: .pst, .cur, .fut. Each is a Collection of 0->N Chapters AT any one time.
 *  a ChapterClass [ClassOfChptrs]: is a Collection of 0->N Chapters AT any one time.
 *  a Chapter has three VerseClasses [ClassOfVerses]: .pst, .cur, .fut. Each with a Collection of 0->N Verses AT any one time.
 *  a VerseClass [ClassOfVerses] is a Collection of 0->N Verses AT any one time.
 *  a Verse has 1-N Sentences, each with 1-N clauses, each with 0-N phrases,....
 *
 *  BUT ONLY the cur_ChptrClass IS READ. Though any or all Chapters may at any on time be in the cur_ChptrClass
 */

/**
 *          GLOBAL vars
 * require functions-compiled.js, objects-compiled.js
 * */
//  *********** DOM  DATA    REQUIRE functions.js

//var main = function () {
var MSG, RET, EXP, CUT, _CUT, TST, noop;
MSG = 'calc Wt from C,F,L,N / ';

/**
 *          TEST STUBS
 * @type {{chptr: {fut: {name: string, styleProps: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}}, cur: {name: string, styleProps: {fontSize: string, opacity: number, textAlign: string}}, pst: {name: string, styleProps: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}}}}}
 */
const baseStylProp_Dict_stub = {
    chptr: {
        fut: {
            name: 'fut'
            , styleProps: {
                fontSize: "90%",
                opacity: 0.9,
                textAlign: "CENTER",
                backgroundColor: "rgba(145, 248, 29, 0.29)"
            }
        }
        , cur: {
            name: 'cur'
            , styleProps: {
                fontSize: "100%",
                opacity: 1.0,
                textAlign: "CENTER",
            }
        }
        , pst: {
            name: 'pst'
            , styleProps: {
                fontSize: "80%",
                opacity: 0.8,
                textAlign: "CENTER",
                backgroundColor: "rgba(255, 0, 0, 0.24)"
            }
        }
    }
};
var fut_StylProps_stub = baseStylProp_Dict_stub.chptr.fut.styleProps;
//var aVerse_stub = _aDoc_TIMES_Node('.ChptrReadGrps .cur .VerseReadGrps .fut').children[1];
// var theseVerses_Coll_stub = _aDoc_TIMES_Node('.ChptrReadGrps .cur .VerseReadGrps .fut').children;

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
// here if the procedural calcWt
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


