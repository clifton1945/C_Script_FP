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

/**
 * OK here the need:: a nowCsdValu -> newCsdValu //> '45%' -> '78%'
 *  how about
 *  get A_old || N_old || S_old
 *  (N_old, N_new)=>(A_old has "%") ? make(N_new) str and add %: N_new
 */
// Below USES R.propEq to test if a prop valu === a specific valu
var csdKey = 'fontSize';
var A_old = "80%";
var csd_pst = styleProps['pst'];
assert(A_old, csd_pst[csdKey], 55);
var has80PctFontSize = R.propEq(csdKey, A_old);
assert(true, has80PctFontSize(csd_pst), 58); //
var A_new = "55%";

/**
 *CONVERT 'opacity value TO String abd use parseFloat() on both fontSize AND opacity
 *  OK parseFloat(Str). Makes '80%' -> Number
 */
var isNumber = R.is(Number);
TST = isNumber(parseFloat(A_old));
assert(true, TST);
TST = isNumber(parseFloat(0.123));// so I do not HAVE to convert all csd values to string
assert(true, TST);
noop = 0;
//
// // this code is from ramda cookbook and still does not seem to work 160615
// // Get all descendants that match selector
// // Note: NodeList is array-like so you can run ramda list functions on it.
// //  cssQuery :: String -> Node -> NodeList
// var cssQuery = R.invoker(1, 'querySelectorAll');
//
// // Mutate style properties on an element
// //  setStyle :: String -> String -> Element -> Element
// var setStyle = R.assoc('style');
//
// // Make all paragraphs and anchors red
// R.pipe(
//     cssQuery('div >.vers'),
//     R.map(setStyle('color', 'red'))
// )(document);



