/**
 * Created by CLIF on 12/30/2015.
 */
"use strict";
var R = require('ramda');
// import * as R from '../node_modules/ramda';
// import * as R from '../node_modules/ramda/dist/ramda.js';
import {testStr, C_It} from '../src/modules-compiled';
C_It(testStr);  // OK

import {assert} from  '../src/modules-compiled';

var CUT = R.add(30); //: N:a -> N:a -> N:a
assert(CUT(3), 33);

