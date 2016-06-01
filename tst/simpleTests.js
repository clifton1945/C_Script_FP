"use strict";
/**
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

var styleProps = {
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
var fut_styleProps = R.prop('fut')(styleProps);

var transformers = {// NOTE: USING .replace For string!
    fontSize: R.replace('90', '130'), // yeah, it works
    opacity: R.multiply(.5),
    textAlign: R.replace('CENTER', 'right')
};
// EVOLVER
let EVOLVER = R.evolve(transformers);
RET = EVOLVER(fut_styleProps);
noop = 1;
assert((RET.fontSize == '130%' && RET.opacity == 0.45), true);

// now apply new csd to an element.
var new_elem = document.querySelector('div #tst1');
Object.assign(new_elem.style, RET);// IT WORKS html altered!!

C_It(JSON.stringify(RET.fontSize));
noop = 0;

