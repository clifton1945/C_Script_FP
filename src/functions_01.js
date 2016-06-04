/**
 * Created by CLIF on 2/19/2016.
 */

"use strict";
//var R = require('ramda');
// import * as R from "ramda"

/**
 *      assert: a, b -> B:
 *      has built in msg: ret != exp
 * @param exp
 * @param ret
 */
// 160603 const assert = (exp, ret)=> console.assert(R.equals(exp, ret), `${ret}!=${exp} @ ${noop}`);
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

