/**
 * Created by CLIF on 12/30/2015.
 */
"use strict";
//var R = require('ramda'); USE import * as R from .......
import * as R from 'ramda';

import {testStr, C_It} from '../src/modules-compiled';
import {assert} from  '../src/modules-compiled';
C_It(testStr);  // OK
// Ramda style:
var CUT = R.add(30); //: N:a -> N:a -> N:a
// assert(CUT(3), 33);
C_It(CUT(3)); // -> 33