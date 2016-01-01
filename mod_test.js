/**
 * Created by CLIF on 12/30/2015.
 */
"use strict";
// Modules
import * as m from '/functions-compiled.js';
// a test
console.log(m.tstStr);
console.assert(true, "some msg");
//
var arr = [1, 2, 3];
var fn =  (x) => { return x * x};
console.log( `For arr:[${arr}], fn(5):${fn(5)}.`);
      // test
var c = ((arr) => (fn) => {return arr.map(fn)})(arr)(fn);
var a = (m.mapW_arr)(arr)(fn);
var b = (m.mapW_fn)(fn)(arr);
var s = m.tstStr;
console.log( ` a:${a} ===  b:${b} ===  c:${c}
  AND ${s}
  BUT a === b is ${ a === b }.`
);

