/**
 * functions_01.js
 * 160621 @ 0645 ADDED  myTapFROM transformers_tests.js
 */

"use strict";
//var R = require('ramda');
// import * as R from "ramda"
const myTap = R.tap(o => C_Both(` t:${o} `));
const msg = (msg) => ` ${msg}`;
const Doc_It = (txt) => document.querySelector(".console").textContent = txt;
const C_It = (txt) => console.log(txt);
/**
 *          C_Both: STR:text -> C_It(text) -> Doc_It(text)
 * @param txt
 * @constructor
 */
const C_Both = (txt) => {
    C_It(txt);
    Doc_It(txt);
};
const round2 = x => Math.round(x * 100) / 100;

