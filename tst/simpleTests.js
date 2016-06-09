/**
 * 160608   simplifying simpconstests.js
 *  WIP NEXT FOCUS? trying to figure a test maybe of a test list of csd properties
 *      maybe use the stepSize fake k:v for testing.
 *  WIP not YET evolving base CSD -> trgt CSDs yet.
 *  BUT nearly ready
 *  recognizing that I CAN PASS both clssE AND ndx BACK UP the src= chain
 *      thus declare a func in transformers_tests with an ndc param
 *      thus declare a func in setWeight_tests with a step/range
 */
"use strict";
// import {_trgt_clss_CSD } from "transformers_tests-compiled.js";
/**
 *                  DATA:
 */

/**
 *      :: L:[E,E,E]
 *      a nodeList of rClass Elements: NL: pst, cur, fut
 */
const NL = cur_Chptr_rClss_NL;

/**
 *      styleProps: D:{{},{},{}}
 * @type {{fut: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}, cur: {fontSize: string, opacity: number, textAlign: string}, pst: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}}}
 */
const CssStylDecl_Dict = { //
    fut: {
        stepSize: -50, //  90 - 50 -> 40
        fontSize: "90%",
        opacity: 0.9,
        textAlign: "left",
        backgroundColor: "rgba(145, 248, 29, 0.29)"
    },
    cur: {
        stepSize: 0, // start gig  stay big
        fontSize: "100%",
        opacity: 1.0,
        textAlign: "center",
        // backgroundColor: "rgba(255, 0, 0, 0.24)"
    },
    pst: {
        stepSize: 70, // start small 70 + 40  -> 80
        fontSize: "70%", // TEST VALUE FIX
        opacity: 0.7,
        textAlign: "right",
        backgroundColor: "rgba(255, 0, 0, 0.24)"
    }
};
/**
 *      ShortCut -> CssStylDecl_Dict
 */
var CSD_D = CssStylDecl_Dict; // -> D:csd

/**
 *                  FUMCTIONS
 */


/**
 *          HELPERS for _RESTYLE_trgts
 */

/**
 *      _rClssE_key:  clssE -> S:e.classNameKey
 * @param rcE
 * @private
 */
const _rClssE_key = R.prop('className');

/**
 *      S:key -> D:CSD_D i.e. CssStyleDeclarations  Dict
 *      NOTE: styleProps hard coded into _rClssE_CSD
 */
const _rClssE_CSD = R.flip(R.prop)(CSD_D);

/**
 *       transformers: now located in transformers.js
 * as REF R.replace:: RegExp|String -> String -> String -> String
 * @type {{fontSize, opacity: *, textAlign: (void|XML|string|*)}}
 */

/**
 *          :: clssE -> L:[trgtE, trgtE, ...]
 *      an rClss Element:e -> a list of its verse elements.
 *      This is the target list of Verse Elements to mutate
 *
 */
const _rClss_Chldren = R.prop("children");// clssE -> L:[e, e,..]

/**
 *      :: E:{div.rClssE} -> N:ndx -> N:wght factor
 *  partials _StepER(N)
 *
 */
const _StepER = R.compose(_StepER, R.prop('length'), myTap, _rClss_Chldren);

// const _rClss_StepER = _StepER(eclss);

// OK NOW SET the transform_ERs like ()(ndx) ->

/**
 *         :: CSD{k:v} -> CSD{k:v} NOTE: CODE IN transformers.js
 *   EVOLVES base_CSD INTO new_CSD
 *   NOTE:   R.evolve:: {k:(v->v)} -> {k:v} ->{k:v}
 *          where the above {k:(v->v)} IS the transformers object
 */
// const _EVOLVE_clss_CSD;
// in essence:
// (1) get this rClass - pst|cur|fut - CSD.
// (2) evolve it to this_CSD
// (3) assign this_CSD to this trgtE

/**
 *          :: clssE -> D:CSD
 *  basis for evolving into _new_clss_CSD
 *          compose(
 *          _rClssE_key,              //  clssE -> S:k
 *          _rClssE_CSD          // S:k -> D:csd
 *          )
 */
const _base_clss_CSD = R.compose(_rClssE_CSD, _rClssE_key);
// /**
//  *          :: D:base CSD -> D:new CSD
//  *  FIX STUB now just returns the base CSD  REFACT this IN transformers.js
//  *  will need something like compose( _EVOLVE_(oldCSD), setTransform_ERs, setWt_ER) (trgt_Ndx)
//  * @private
//  */
// const _trgt_clss_CSD = function _trgt_clss_CSD(csd) {
//     // do some work here. like evolve
//     var stub = csd;
//     return stub
// };
/**
 *          :: (base_CSD, trgt_E) -> trgt_CSD
 *
 *  REF: Object.assign( to target, from ...sources) -> trgt
 */
const _set_a_Style = R.curry(
    (csd, e_trgt)=> Object.assign(e_trgt.style, csd));

/**
 *          _RESTYLE_trgtEs: L:nodeList ->  L:nodeList
 *      all Elements in all rClasses are RESTYLED =f(trgt)
 *
 */
const _RESTYLE_all_trgtEs = R.forEach(
    (clssE) => {
        // var rClss_Children = _rClss_Chldren(clssE);
        // var _set_this_rClss_trgt_CSD = _set_a_Style(clssE, R.__);     // E:trgtE -> E: newE

        R.addIndex(R.forEach)(
            (trgtE, ndx, col)=> {
                // this_rClss_Step = _rClss_StepER(clssE)(ndx);
                // below is a pipe()
                var base = _base_clss_CSD(clssE);
                var trgt = _trgt_clss_CSD(base);// ->  THIS IS THE WORKER FUNCTION !!!
                _set_a_Style(trgt)(trgtE);
            },
            _rClss_Chldren(clssE)
        )
    }
);

C_Both('stepSize was: ' + JSON.stringify(CSD_D.fut.stepSize));
var REStylED_trgts = _RESTYLE_all_trgtEs(NL);
// C_Both('opacity  is: ' + JSON.stringify(REStylED_trgts[2].children[0].style.opacity));

// var testMe = function testMe() {
function testMe() {
    var MSG = '', CUT, _CUT, RET, EXP, TST, tNum = 0;
    var trgt;

// //tests  _RESTYLE_trgts
//     tNum = 4;
//     CUT = _RESTYLE_all_trgtEs(NL); // INVOKED
//     trgt = document.querySelector('div #tst1');
//     RET = trgt.style.textAlign;
//     assert('right', RET, tNum);

// tests  _rClss_Chldren
    tNum = 3;
    CUT = _rClss_Chldren;
    const stub_rclssElem = document.querySelector('div #cur_VerseReadGrp');//
    RET = CUT(stub_rclssElem);// -> HTMLCollection[2]
    assert(2, RET.length, tNum);

//tests  __base_rClss_CSD
    tNum = 2;
    CUT = _base_clss_CSD;
    var test_CSDs = R.map(CUT);//  L:nl -> [[D:d, D:d, D:d]]
    RET = test_CSDs(NL);//  ->  [[D:d, D:d, D:d]]
    assert("70%", RET[0].fontSize, tNum);
    assert("90%", RET[2].fontSize, tNum);

// test   cur_Chptr_rClss_NL
    tNum = 1;
    // var nl = cur_Chptr_rClss_NL;
    assert('fut', NL[2].className, tNum);
    assert(6, NL[2].childElementCount, tNum);
// final MSG
    MSG = 'testMe: completed';
    C_Both(MSG);
}
testMe();