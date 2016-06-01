"use strict";
/**
 * 0810 USING fontSize as test trgt: compose a final set_new_fontSize: S:val -> CSD:{k:v}
 * WIP MOVE To initialize a rClass style THEN evolve it with a Weighter.
 * 6/1/2016
 * WOW, SUCCESSFUL--  USE  R.evolve AND R.replace AND R.set TO MUTATE a verse CssStyleDeclaration
 * DO NOT BOTHER USING Lenses, formatting strings
 * MODIFIED by CLIF on 5/31/2016.
 */

// import {C_It} from '../src/modules-compiled';  //NO GOOD
//var R = require('ramda-maybe');
var C_It = (txt) => console.log(txt);
var assert = (exp, ret)=> console.assert(R.equals(exp, ret), `${ret}!=${exp} @ ${noop}`);
var MSG = '', RET, EXP, TST, noop;

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
var fut_styleProps = R.flip(R.prop)(styleProps)('fut');
var fontSize_init = R.prop('fontSize')(fut_styleProps);
var fontSizer = R.replace(fontSize_init);
var fontSize_new = '60%'; // WEIGHTED AND FORMATTED. Though  could do without formatter

var transformers = {// NOTE: USING .replace For string!
    fontSize: fontSizer(fontSize_new), // yeah, it works
    opacity: R.multiply(.5),
    // textAlign: R.replace('CENTER', 'right')// yeah, this works if uncommented
};
// EVOLVER
let EVOLVER = R.evolve(transformers);
RET = EVOLVER(fut_styleProps);
noop = 1;
assert((RET.fontSize == '60%' && RET.opacity == 0.45), true);

// now apply new csd to an element.
var new_elem = document.querySelector('div #tst1');
Object.assign(new_elem.style, RET);// IT WORKS html altered!!
// RESULTS
C_It(JSON.stringify(RET.fontSize));
noop = 0;

