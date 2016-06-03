"use strict";
/**
 * 6/2/2016
 * core functions for EVOLVER  are now in tst/tst_EVOLVER.js
 */

var MSG = '', CUT, _CUT, RET, EXP, TST, noop = 0;

/**
 *              TEST STUBS ONLY >>
 * @param i
 * @private
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

// a nodelist of rClasses: NL: pst, cur, fut
var nl = cur_Chptr_rClss_NL;
// test
noop = 1;
assert(nl[2].className, 'fut');
assert(nl[2].childElementCount, 6);

// the  rClass  O:{CSD}. USED IN mutating each trgt verse style
const _rClssKey = (rcE) => R.prop('className')(rcE);//: E:e -> S:e.classNameKey
const _a_init_cssStylDecl = R.flip(R.prop)(styleProps);// S:key -> D:propDict NOTE: styleProps hard coded into this
const _my_init_rClss_CSD = R.compose(_a_init_cssStylDecl, _rClssKey);//:(rcE)->D:this rClss's cssStylDecl
// test
let _stub_my_init_rClss_CSD_List = R.map(_my_init_rClss_CSD);//  L:nl -> [[D:d, D:d, D:d]]
RET = _stub_my_init_rClss_CSD_List(nl);//  ->  [[D:d, D:d, D:d]]
noop = 2;
assert(RET[0].fontSize, "80%");
assert(RET[2].fontSize, "90%");

// the target list of Verse Elements to mutate
const rClss_Elem_Children = R.prop("children");// E:e -> L:[e, e,..]
// test
let stub_rClss_Elem = document.querySelector('div #cur_VerseReadGrp');//
RET = rClss_Elem_Children(stub_rClss_Elem);// -> HTMLCollection[2]
noop = 3;
assert(RET.length, 2);

// now mutate a trgt element style
let _MUTATE_trgts = R.forEach(
    (eClss) => {
        R.addIndex(R.forEach)(
            (trgt, ndx, col)=> Object.assign(trgt.style, _my_init_rClss_CSD(eClss)),
            rClss_Elem_Children(eClss)
        )
    }
);

RET = _MUTATE_trgts(nl);
C_Both(JSON.stringify(RET));
noop = 3;
