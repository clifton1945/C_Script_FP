/**
 * Created by CLIF on 1/8/2016.
 */
"use strict";

var testStr = " I am a module test string.";
export {testStr};
var C_It = (txt) => console.log(txt);
export { C_It }

var assert = (exp, ret)=> console.assert(R.equals(exp, ret), `${ret}!=${exp} @ ${noop}`);
export {assert}