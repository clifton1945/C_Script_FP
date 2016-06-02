"use strict";
/**
 * 6/2/2016
 * core functions for EVOLVER  are now in tst/tst_EVOLVER.js
 */

var MSG = '', CUT, RET, EXP, TST, noop;

/**
 *              TEST STUBS ONLY >>
 * @param i
 * @private
 */

const styleProps = {
    fut: {
        fontSize: "90%",
        opacity: 0.9,
        textAlign: "CENTER",
        backgroundColor: "rgba(145, 248, 29, 0.29)"
    },
    pst: {
        fontSize: "80%",
        opacity: 0.8,
        textAlign: "right",
        backgroundColor: "rgba(255, 0, 0, 0.24)"
    }
};
// USING fontSize as test trgt: compose a final set_new_fontSize: S:val -> CSD:{k:v}
// var fut_styleProps = R.flip(R.prop)(styleProps)('fut');
// var fontSize_init = R.prop('fontSize')(fut_styleProps);
// var fontSizer = R.replace(fontSize_init);
// var fontSize_new = '333%'; // WEIGHTED AND FORMATTED. Though  could do without formatter
//
// /**
//  *      transformers: -> O:{k:v,...}
//  * @type {{fontSize, opacity: *}}
//  */
// var transformers = {// NOTE: USING .replace For string!
//     fontSize: fontSizer(fontSize_new), // yeah, it works
//     opacity: R.multiply(.5),
//     // textAlign: R.replace('CENTER', 'right')// yeah, this works if uncommented
// };
// // EVOLVER
// // let EVOLVER = R.evolve(transformers);
// RET = EVOLVER(fut_styleProps);

// // now apply new csd to an element.
// var new_elem = document.querySelector('div #tst1');
// Object.assign(new_elem.style, RET);// IT WORKS html altered!!
// RESULTS
var nl = cur_Chptr_rClss_NL;
assert(nl[2].className, 'fut');
assert(nl[2].childElementCount, 6);

CUT = (elm, ndx, col)=> R.prop('className')(elm);//: (elm, ndx, col) -> S:elm.className
RET = R.addIndex(R.map)(CUT)(nl);// -> [S,S,..]
C_Both(JSON.stringify(RET));
noop = 0;

