/**
 * Created by CLIF on 12/30/2015.
 */
"use strict";
//var R = require('ramda');
import R from '..//node_modules//ramda';

// Modules
import { testStr, C_It } from '..//src//modules-compiled'; // WORKS but throws Inspection 'can't resolve
//import * as fn from '../src/modules-compiled.js'; // WORKS
C_It(testStr);  // OK
// Ramda style:
var x = R.add(1,2,3); //> 3 Adds 2 numbers, not n numbers.
x = R.add(11); //> function
var id = R.prop('id', { id: 'foo' }); // returns 'foo'
C_It(id); //> 'foo');