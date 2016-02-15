/**
 * Created by CLIF on 12/30/2015.
 */
"use strict";
var R = require('ramda');
//import * as R from '../node_modules/ramda';
import { testStr, C_It } from '..//src//modules-compiled'; // WORKS but throws Inspection 'can't resolve

// Modules
//import * as fn from '../src/modules-compiled.js'; // WORKS
C_It(testStr);  // OK
// Ramda style:
var x = R.add(1,2,3); //> 3 Adds 2 numbers, not n numbers.
x = R.add(11); //> function
x = R.prop('x', { id: 'foo', x: 333 }); // returns 333
C_It(x); //> '');