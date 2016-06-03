"use strict";
/**
 * 6/2/2016
 * core functions for EVOLVER  are now in tst/tst_EVOLVER.js
 */

var MSG = '', CUT, _CUT, RET, EXP, TST, tNum = 0;

/**
 *      styleProps: D:{{},{},{}}
 * @type {{fut: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}, cur: {fontSize: string, opacity: number, textAlign: string}, pst: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}}}
 */
const styleProps = {
    fut: {
        fontSize: "90%",
        opacity: 0.9,
        textAlign: "left",
        backgroundColor: "rgba(145, 248, 29, 0.29)"
    },
    cur: {
        fontSize: "100%",
        opacity: 1.0,
        textAlign: "center",
        // backgroundColor: "rgba(255, 0, 0, 0.24)"
    },
    pst: {
        fontSize: "80%",
        opacity: 0.8,
        textAlign: "right",
        backgroundColor: "rgba(255, 0, 0, 0.24)"
    }
};

const myTap = R.tap(s=>C_Both(s));

// now apply new csd to an element.


/**
 *      cur_Chptr_rClss_NL: a nodelist of rClasses: NL: pst, cur, fut
 */
var nl = cur_Chptr_rClss_NL;
// test
tNum = 1;
assert(nl[2].className, 'fut');
assert(nl[2].childElementCount, 6);

// the  rClass  O:{CSD}. USED IN mutating each trgt verse style
const _rClssKey = (rcE) => R.prop('className')(rcE);//: E:e -> S:e.classNameKey
const _a_init_cssStylDecl = R.flip(R.prop)(styleProps);// S:key -> D:propDict NOTE: styleProps hard coded into this
/**
 *      _my_init_rClss_CSD: E:rcE -> D:this rClss's cssStylDecl
 */
let _my_init_rClss_CSD = R.compose(_a_init_cssStylDecl, _rClssKey);//:(rcE)->D:this rClss's cssStylDecl
// test
//tests
tNum = 2;
let _stub_my_init_rClss_CSD_List = R.map(_my_init_rClss_CSD);//  L:nl -> [[D:d, D:d, D:d]]
RET = _stub_my_init_rClss_CSD_List(nl);//  ->  [[D:d, D:d, D:d]]
assert(RET[0].fontSize, "80%");
assert(RET[2].fontSize, "90%");

// the target list of Verse Elements to mutate
/**
 *      rClss_Elem_Children: E:e -> L:[e, e,..]
 *      an rClss Element:e -> a list of its verse elements.
 */
let rClss_Elem_Children = R.prop("children");// E:e -> L:[e, e,..]
// test
// tests
tNum = 3;
let stub_rClss_Elem = document.querySelector('div #cur_VerseReadGrp');//
RET = rClss_Elem_Children(stub_rClss_Elem);// -> HTMLCollection[2]
assert(RET.length, 2);

// now mutate a trgt element style
/**
 *      _RESTYLE_trgts: L: nodelist -> all Elements in all rClasses RESTYLED =f(trgt)
 */
let _RESTYLE_trgts = R.forEach(
    (eClss) => {
        R.addIndex(R.forEach)(
            (trgt, ndx, col)=> Object.assign(trgt.style, _my_init_rClss_CSD(eClss)),
            rClss_Elem_Children(eClss)
        )
    }
);
//tests
tNum = 4;
RET = _RESTYLE_trgts(nl);
var trgt = cur_Chptr_cur_rClss_Verse_tst1_Elem;
RET = trgt.style.textAlign;
assert('center', RET);
C_Both(JSON.stringify(RET));
