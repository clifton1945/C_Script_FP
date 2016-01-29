/**
 * Created by CLIF on 1/29/2016.
 */

import * as R from '../node_modules/ramda';
import { testStr, C_It } from '..//src//modules-compiled'; // WORKS but throws Inspection 'can't resolve
C_It(testStr);
//
var a= R.add(11); //> 3 Adds first 2 numbers, not n numbers.
C_It(a(9)); //> 20);
console.assert(a(9)===20);
var x = R.prop('x', { id: 'foo', x: 333 }); // returns 333
