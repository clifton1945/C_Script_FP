/**
 * Created by CLIF on 12/30/2015.
 */
"use strict";
// Modules
//import { testStr, C_It } from '../src/modules-compiled'; // WORKS but throw Inspection error
import { testStr, C_It } from '..//src//modules-compiled'; // WORKS but throws Inspection 'can't resolve
import { StyleObj } from '..//src//objects-compiled';
//import * as fn from '../src/modules-compiled.js'; // WORKS


// a test
C_It(testStr);
console.assert(
    testStr.substring(0,4) == ' I a' ,
    ' part of the testStr'
);
C_It( StyleObj.pst);
//
//var arr = [1, 2, 3];
//var fn =  (x) => { return x * x};
//console.log( `For arr:[${arr}], fn(5):${fn(5)}.`);
//      // test
//var c = ((arr) => (fn) => {return arr.map(fn)})(arr)(fn);
//var a = (m.mapW_arr)(arr)(fn);
//var b = (m.mapW_fn)(fn)(arr);
//var s = m.tstStr;
//console.log( ` a:${a} ===  b:${b} ===  c:${c}
//  AND ${s}
//  BUT a === b is ${ a === b }.`
//);
//
