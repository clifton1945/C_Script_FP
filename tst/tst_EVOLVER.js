/**
 * 2 Jun 16 new name: tst/tst_EVOLVER.js
 * old name:  FROM tst/ set_clss_elemS_03.js
 *
 * old content was simpleTests.js
 * 6/2/16 GOAL: the whole STYLE all verses
 * 0810 USING fontSize as test trgt: compose a final set_new_fontSize: S:val -> CSD:{k:v}
 * WIP MOVE To initialize a rClass style THEN evolve it with a Weighter.
 * 6/1/2016
 * WOW, SUCCESSFUL--  USE  R.evolve AND R.replace AND R.set TO MUTATE a verse CssStyleDeclaration
 * DO NOT BOTHER USING Lenses, formatting strings
 * MODIFIED by CLIF on 5/31/2016.
 */
"use strict";
// var R = require('ramda');
// import * as R from 'node_modules/ramda';
// import {C_It} from '../src/modules-compiled';  //NO GOOD
// var C_It = (txt) => console.log(txt);
var assert = (exp, ret)=> console.assert(R.equals(exp, ret), `${ret}!=${exp} @ ${noop}`);
var MSG = '', RET, EXP, TST, noop;

/**
 *              TEST STUBS ONLY >>
 * @param i
 * @private
 */
var styleProps = {
    fut: {
        fontSize: "90%",
        opacity: 0.9,
        textAlign: "left",
        backgroundColor: "rgba(145, 248, 29, 0.29)"
    },
    cur: {
        fontSize: "100%",
        opacity: 1.0,
        textAlign: "center"
    },
    // backgroundColor: "rgba(255, 0, 0, 0.24)"
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
const EVOLVER = R.evolve(transformers);
// EVOLVER tests
RET = EVOLVER(fut_styleProps);
noop = 1;
assert((RET.fontSize == '60%' && RET.opacity == 0.45), true);

// now apply new csd to an element.
var new_elem = document.querySelector('div #tst1');

Object.assign(new_elem.style, RET);// IT WORKS html altered!!
// RESULTS
// C_It(JSON.stringify(RET.fontSize));
noop = 0;

