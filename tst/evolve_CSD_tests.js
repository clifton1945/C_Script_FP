/**
 * evolve_CSD_tests.js
 * 160624
 *  @15.55 NAME CHANGE, REMOVED wtER code and tests
 * 160622
 *  @0625 ADDED & TESTED _wtER_cur
 * 160621
 *  @0932: STABLE CREATED AND TESTED wt_ER_pst AND wt_ER_fut FROM wt_factor
 *  @0628: CREATED wtFunc_pst AND wtFunc_fut FROM wt_factor
 */
"use strict";
//GLOBAL:
var CUT, RET, MSG = ``;
// ---------------------- Code Under Test: _evolve_CSD
/**
 *      _evolve_CSD: D:csd, N:fctr -> D:csd
 *  REFACT: rename to _evolve_CSD ??
 */
var _evolve_CSD = R.curry(function (csd, fctr) {
// make this a function
    var wt_opacity = R.compose(R.toString, R.multiply(fctr), parseFloat);
    var wt_fontSize = R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(fctr), parseFloat);
    var transform = {
        opacity: wt_opacity,
        fontSize: wt_fontSize,
    };
    return R.evolve(transform, csd); //=>
});
// ---------------------- test: _evolve_CSD
// _evolve_CSD_tests();
function _evolve_CSD_tests() {
    MSG = `_transform_CSD-> `;
    var stub_csd = {opacity: '76', fontSize: '80%'};
    var stub_col = [1, 2, 3, 4];
    var stub_fctr = 1 / 2;
    var stub_wtER = R.multiply(stub_fctr);

    RET = _evolve_CSD(stub_csd, stub_fctr);
    MSG += '#1 isString, ';
    assert(true, R.is(String, RET.opacity), MSG);
    MSG += '#2 opacity: wter:1/2, ';
    assert('38', RET.opacity, MSG);
    MSG += '#3 fontSize: wter:1/2, ';
    assert('40%', RET.fontSize, MSG);
    MSG += '#4 fontSize: wter:1, ';
    RET = _evolve_CSD(stub_csd, 1);
    assert('80%', RET.fontSize, MSG);
    MSG += `
      _evolve_CSD_tests: DONE`;
    C_Both(MSG);
}