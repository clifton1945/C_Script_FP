/**
 * Created by CLIF on 1/29/2016.
 */
"use strict";
//var R = require('ramda');  //DO NOT USE OR NEED W/ TEST.HTML
var C_Cut, C_Ret, C_Exp, C_NL, C_Arr, C_Msg;

// LEARNING R.indexOf(obj, obj_coll)
// require functions.js
var book = GET_book();
C_NL = GET_V_Grp_NL(GET_book());
C_Exp = C_NL[1];
const GET_NodeNdx = function (node, nodelist) {
    return R.indexOf(node, nodelist);
};
C_Both(`GET_NodeNdx->${GET_NodeNdx(C_Exp, C_NL)}`);
const PICK_ = (styleobj, key) => R.curry(
    R.pick(key, styleobj));
const PICK_myStyleObj = PICK_(StyleObj);
C_Both(`myStyle->${PICK_myStyleObj(C_Exp, C_NL)}`);


// LEARNING R.when()
// when argument NL[XXX].childElementCount > 0 IS satisfied
// , PASS NL to READ_ Last() || Next()
// IF NOT, just return the NL arg
// CAM_READ :: coll -> Bool
var CAN_READ = R.propSatisfies(R.gt(R.__, 0), 'length');
var READ_XXX = function READ_XXX(NL) { // coll ->
    return NL.length;
};
C_Arr = [[], [2, 2, 2], [3]];
var READ__ = R.when(CAN_READ, READ_XXX);
C_Msg = 'READ_ = R.when(CAN_READ, READ_XXX) -> ';
C_Msg += R.toString(READ__(C_Arr[0])) + ', ';
C_Msg += R.toString(READ__(C_Arr[1])) + ', ';
C_Msg += R.toString(READ__(C_Arr[2])) + ', ';
C_Both(C_Msg);

