"use strict";

// import {transformers} from 'tst/transformers_tests-compiled';

/**
 * 6/6/16 @ 5.26
 *
 * 6/4/16 @ 19:30
 *  WIP:  STABLE:  setting up where to put a function: stepSiZER (d, e, n
 *  IN transformers.js
 *  AND began REFACT set_a_Style() to use in a compose with
 *      set_Step,
 *      evolve
 *      set_Style
 *
 *  READY now TO MODIFY / WEIGHT the transformers WITH ndx and sibling list
 */


// var RET, MSG = '', CUT, _CUT,  EXP, TST, tNum = 0;

/**
 *      styleProps: D:{{},{},{}}
 * @type {{fut: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}, cur: {fontSize: string, opacity: number, textAlign: string}, pst: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}}}
 */
var CssStylDecl_Dict = { //
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
        textAlign: "right",
        // backgroundColor: "rgba(255, 0, 0, 0.24)"
    },
    pst: {
        stepSize: 40, // start small 40 + 40  -> 80
        fontSize: "40%",
        opacity: 0.4,
        textAlign: "right",
        backgroundColor: "rgba(255, 0, 0, 0.24)"
    }
};
const CSD_D = CssStylDecl_Dict; // -> D:csd

/**
 *      cur_Chptr_rClss_NL:: L:nodelist
 *      a nodelist of rClasses: NL: pst, cur, fut
 */
var nl = cur_Chptr_rClss_NL;

/**
 *          HELPERS for _RESTYLE_trgts
 */

/**
 *      _CSD_D: () -> D:CSD_D i.e. style properties dictionary
 */
const _CSD_D = R.always(CssStylDecl_Dict);

/**
 *      _rClssKey:  E:e -> S:e.classNameKey
 * @param rcE
 * @private
 */
const _rClssKey = (rcE) => R.prop('className')(rcE);
/**
 *      S:key -> D:CSD_D i.e. CssStyleDeclarations  Dict
 *      NOTE: styleProps hard coded into _base_clss_CSD
 */
const _base_clss_CSD = R.flip(R.prop)(CSD_D);

/**
 *       transformers: now located in transformers.js
 * as REF R.replace:: RegExp|String -> String -> String -> String
 * @type {{fontSize, opacity: *, textAlign: (void|XML|string|*)}}
 */
// let _stepER, _fontSizER;
// _stepER = R.replace(50);// Str -> Str -> Str
// _fontSizER = R.replace('40%');//GIVEN: init==80% transformer Fn  S: valu ->
// var transformers;
// transformers = {// NOTE: USING .replace For string!
//     stepSize: R.multiply(1.5), //-> 75
//     fontSize: _fontSizER('60%'), // -> 180% GIVEN initCSD == 80%
//     opacity: R.multiply(2),
//     textAlign: R.replace('right', 'center')// works FOR any rClss WITH initial 'center'
// };

/**
 *         :: CSD{k:v} -> CSD{k:v} NOTE: CODE IN transformers.js
 *   EVOLVES base_CSD INTO new_CSD
 *   NOTE:   R.evolve:: {k:(v->v)} -> {k:v} ->{k:v}
 *          where the above {k:(v->v)} IS the transformers object
 */
// let _EVOLVE_clss_CSD;
/**
 *          :: E:e -> D:CSD
 *          compose(
 *          _rClssKey,              //  E:e -> S:k
 *          _base_clss_CSD          // S:k -> D:csd
 *          _EVOLVE_clss_CSD        // D:csd -> D:csd
 *          )
 */
let _new_clss_CSD = R.compose(_EVOLVE_clss_CSD, _base_clss_CSD, _rClssKey);
/**
 *          :: (eClss, eVers) -> eVers.styl_ED
 */
let _set_a_Style = R.curry((e_clss, e_trgt)=> Object.assign(e_trgt.style, _new_clss_CSD(e_clss)));
/**
 *          :: E:e -> L:[e, e,..]
 *      an rClss Element:e -> a list of its verse elements.
 *      This is the target list of Verse Elements to mutate
 *
 */
let _rClss_Elem_Children = R.prop("children");// E:e -> L:[e, e,..]
// test
/**
 *          _RESTYLE_trgts: L:nodelist ->  L:nodelist
 *      all Elements in all rClasses are RESTYLED =f(trgt)
 *
 */
let _RESTYLE_all_trgts = R.forEach(
    (eClss) => {
        var x = _set_a_Style(eClss, R.__);
        var y = _rClss_Elem_Children(eClss);
        R.addIndex(R.forEach)(
            (trgt, ndx, col)=>x(trgt), y
        )
    }

);
var REStylED_trgts = _RESTYLE_all_trgts(nl);
C_Both('stepSize was: ' + JSON.stringify(CSD_D.fut.fontSize));
C_Both('stepSize  is: ' + JSON.stringify(REStylED_trgts[2].children[0].style.fontSize));

TestMe();
function TestMe() {
    var MSG = '', CUT, _CUT, RET, EXP, TST, tNum = 0;
    var trgt;

//tests  _RESTYLE_trgts
    tNum = 4;
    CUT = _RESTYLE_all_trgts(nl); // INVOKED
    trgt = document.querySelector('div #tst1');
    RET = trgt.style.textAlign;
    assert('center', RET, tNum);
// tests  _rClss_Elem_Children
    tNum = 3;
    let stub_rClss_Elem = document.querySelector('div #cur_VerseReadGrp');//
    RET = _rClss_Elem_Children(stub_rClss_Elem);// -> HTMLCollection[2]
    assert(2, RET.length, tNum);

//tests  _my_init_rClss_CSD
    tNum = 2;
    let _stub_my_init_rClss_CSD_List = R.map(_new_clss_CSD);//  L:nl -> [[D:d, D:d, D:d]]
    RET = _stub_my_init_rClss_CSD_List(nl);//  ->  [[D:d, D:d, D:d]]
    assert("60%", RET[0].fontSize, tNum);
    assert("90%", RET[2].fontSize, tNum);

// test   cur_Chptr_rClss_NL
    tNum = 1;
    nl = cur_Chptr_rClss_NL;
    assert('fut', nl[2].className, tNum);
    assert(6, nl[2].childElementCount, tNum);
// final MSG
    MSG = 'TestMe: completed';
    C_Both(MSG);
}