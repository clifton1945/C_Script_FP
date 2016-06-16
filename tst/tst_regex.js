/**
 * 160616 tst_regex.js
 * @0645 tests of JS parseFloat:; Str->Num strips S:'80%' TO N:80
 *  very useful in weighting fontSize:CSD
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
var aFloat = 0.567;// hey, parseFloat accepts Numbers
TST = isNumber(parseFloat(aFloat));// so I do not HAVE to convert all csd values to string
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



