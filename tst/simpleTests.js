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

// // now apply new csd to an element.
// var new_elem = document.querySelector('div #tst1');
// Object.assign(new_elem.style, RET);// IT WORKS html altered!!
// RESULTS
var nl = cur_Chptr_rClss_NL;
noop = 1;
assert(nl[2].className, 'fut');
assert(nl[2].childElementCount, 6);

const _rClssKey = (rcE) => R.prop('className')(rcE);//: E:e -> S:e.classNameKey
const _get_my_cssStylDecl = R.curry((dct, key) => R.prop(key)(dct));// D:propDict -> S:key -> D:propDict
const _my_cssStylDecl = _get_my_cssStylDecl(styleProps);// S:key -> D:propDict
const _rClssCSD_init = R.compose(_my_cssStylDecl, _rClssKey);//:(rcE)->D:this rClss's cssStylDecl
var rClssCSD_init = R.map(_rClssCSD_init);//  L:nl -> [D:d, D:d, D:d]
RET = rClssCSD_init(nl);
noop = 2;
assert(RET[0].fontSize, "80%");


const rClss_Elem_Children = elem => R.prop("children");// E:e -> L:[e, e,..]
var new_elem = document.querySelector('div #tst1');
RET = rClss_Elem_Children(new_elem);
noop = 3;
// assert();
// now set a rClss verses given, AS A TEST, the _init CSD AND elem

// _CUT = (dct, elem, ndx, col)=>{Object.assign(elem.style, dct(elem));};//:(D:dct)(E:elem, N:ndx, L:col) ->  E.elem.style
// CUT = R.addIndex(R.map)(_CUT)();
RET = rClssCSD_init(nl);
C_Both(JSON.stringify(RET));
noop = 3;
