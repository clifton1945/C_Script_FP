/**
 * Created by CLIF on 1/29/2016.
 */
"use strict";
//var R = require('ramda');  //DO NOT USE OR NEED W/ TEST.HTML
var C_Cut, C_Ret, C_Arr, C_Msg;
// when argument NL[XXX].childElementCount > 0 IS satisfied
// , PASS NL to READ_ Last() || Next()
// IF NOT, just return the NL arg

C_Arr = [[], [2, 2, 2], [3]];
// CAM_READ :: coll -> Bool
var CAN_READ = R.propSatisfies(R.gt(R.__, 0), 'length');
var READ_XXX = function READ_XXX(NL) { // coll ->
    return NL.length;
};
var READ__ = R.when(CAN_READ, READ_XXX);
C_Msg = 'READ_ = R.when(CAN_READ, READ_XXX) -> ';
C_Msg += R.toString(READ__(C_Arr[0])) + ', ';
C_Msg += R.toString(READ__(C_Arr[1])) + ', ';
C_Msg += R.toString(READ__(C_Arr[2])) + ', ';
C_Both(C_Msg);

