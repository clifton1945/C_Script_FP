"use strict";
//var R = require('ramda');
//import { C_It } from '.
// .//src//modules-compiled';
var C_It = (txt) => {
    return console.log(txt)
};
var CUT, _CUT, ret, _ret, RET, EXP, TST;

/**
 *          StyleDict
 * @type {{property: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}}}
 */
const StyleDict = {
    property: {fontSize: "100%", opacity: 1.0, textAlign: "CENTER", backgroundColor: "rgba(145, 248, 29, 0.29)"}
};
var baseStyle = StyleDict.property;
// CODE:
/**
 *              TEST STUB ONLY >> _a_Wt_stub:: NUM -> NUM
 * @param i
 * @private
 */
var _a_Wt_stub = i => 35 + i * 10; // (i)->EXP: 0<ndx<
// CODE UNDER TEST
var _appendPercent = (n) => `${n}%`;  // DO NOT UNDERSTAND HOW TO MAKE THIS Pointless ?
var _divide100 = R.flip(R.divide)(100);// WORKS
var _eager_fontSize = R.compose(_appendPercent, _a_Wt_stub);// a -> b
var _eager_opacity = R.compose(_divide100, _a_Wt_stub);
var _new_Str = (s)=>R.always(s);

//NOTE: NOW how update transformation functions WITH an index????
//  these functions are applied TO the property object
// here what happens now
//      _new_fontSize(ndx) returns a FUNCTION: that returns the str || valu
//      _newer_fontSize(ndx) returns a VALUE thus ng
//  SO the two eager for ndx functions need to be satisfied BEFORE the .always
// HEY FYI: .always -> a->(*-> a) i.e. a func  ; .identity:: a -> a i.e.

// THERE IS another var transformers in simpleTests.js
var transformers = (n)=> {    // (n) -> {}
    return {// trans... REQUIRE a transformer FUNC
        // the R.always returns a FUNC returning the satisfied _eager by n
        fontSize: R.always(_eager_fontSize(n)), // must be a -> (*-> b)
        opacity: R.always(_eager_opacity(n)),
        textAlign: _new_Str('right')
    }
};
// hey, ret is a NEW object
//ret = R.evolve(transformers(0), baseStyle);
//// ASSERT
//RET = ret;
//TST = R.equals('35%', R.prop('fontSize', RET));
//EXP = `'EXP: textAlign: '35%' NOT ${RET}`;
//console.assert(TST, EXP);
//C_It(ret);
//C_It(JSON.stringify(ret));




