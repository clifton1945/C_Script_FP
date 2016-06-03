/**
 * Created by CLIF on 1/8/2016.
 */
"use strict";
var R = require('ramda');
var testStr = " I am a module test string.";
export {testStr};
var C_It = (txt) => console.log(txt);
export { C_It }

var assert = (exp, ret)=> console.assert(R.equals(exp, ret), `${ret}!=${exp}`);
export {assert}

// now ramda
var add3 = R.add(3);
assert(36, add3(33));