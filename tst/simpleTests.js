"use strict";
/**
 * WOW, SUCCESSFUL--  USE  R.evolve AND R.replace AND R.set TO MUTATE a verse CssStyleDeclaration
 * DO NOT BOTHER USING Lenses, formatting strings
 * MODIFIED by CLIF on 5/31/2016.
 */

// import {C_It} from '../src/modules-compiled';  //NO GOOD
//var R = require('ramda-maybe');
var C_It = (txt) => console.log(txt);
var assert = (exp, ret)=> console.assert(R.equals(exp, ret), `${ret}!=${exp} @ ${noop}`);
//  *********** DOM  DATA    REQUIRE functions.js
var MSG = '', RET, EXP, TST, noop;
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

/**
 *              TEST STUBS ONLY >>
 * @param i
 * @private
 */

// CODE UNDER TEST IS LOCATED IN ??

var styleProps = {
    fontSize: "90%",
    opacity: 0.9,
    textAlign: "CENTER",
    backgroundColor: "rgba(145, 248, 29, 0.29)"
};

var transformers = {// NOTE: USING .replace For string!
    fontSize: R.replace('90', '130'), // yeah, it works
    opacity: R.multiply(.5),
    textAlign: R.replace('CENTER', 'right')
};
var update_properties = R.curry( // WORK ON REFACTOR
    /**
     *      *              update_properties({so}, ndx, [coll])=>{so}
     * @param base style property object: CSSStyleDeclaration
     * @param i  this verse index in its collection
     * @returns  [modified CSSStyleDeclarations]
     */
    function update_properties(base, i) {
        return R.evolve(transformers)(base);
    });
RET = R.evolve(transformers)(styleProps);// NOTE: did not use the funct above
noop = 1;
assert((RET.fontSize == '130%' && RET.opacity == 0.45), true);

// now apply new csd to an element.
var new_elem = document.querySelector('div #tst1');
Object.assign(new_elem.style, RET);// IT WORKS html altered!!

C_It(JSON.stringify(RET.fontSize));
noop = 0;

