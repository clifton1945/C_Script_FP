/**
 * transformers_tests.js
 * 160622
 *  @0625 ADDED & TESTED _wtER_cur
 * 160621
 *  @0932: STABLE CREATED AND TESTED wt_ER_pst AND wt_ER_fut FROM wt_factor
 *  @0628: CREATED wtFunc_pst AND wtFunc_fut FROM wt_factor
 */
"use strict";
//GLOBAL:
var CUT, RET, MSG = ``;
//---------------------- Code Under Test: wtFunctions
/**
 *      _wtER_pst:: (L:col) -> N:ndx -> (*->N:wt)
 * @param col
 * @private
 */
var _wtER_pst = col => R.compose(R.flip(R.divide)(R.length(col)), R.inc);
/**
 *      _wtER_cur:: (L:col) -> N:ndx -> (*->N:wt)
 * @param col
 * @private
 */
var _wtER_cur = col => R.always(1);
/**
 *      _wtER_fut:: (L:col) -> N:ndx -> (*->N:wt)
 * @param col
 * @private
 */
var _wtER_fut = col => R.compose(R.inc, R.negate, R.divide(R.__, R.length(col)));// L:col -> N:ndx -> (*->N:wt)

// test__wtER_s();
function test__wtER_s() {
    MSG = '_wtER_ s -> ';
    CUT = _wtER_cur([[]]);
    MSG += '#0 wt..._cur(12345), ';
    assert(1, CUT(12345), MSG);
    CUT = _wtER_pst([0, 1, 2, 3]);// get 0.25, 0.50, 0.75, 1.0
    MSG += '#1 wt..._pst(0), ';
    assert(0.25, CUT(0), MSG);
    MSG += '#2 wt..._pst(3), ';
    assert(1.0, CUT(3), MSG);
    CUT = _wtER_fut([1, 2, 3, 4]);
    MSG += '#3 wt..._fut(0)  ';
    assert(1.0, CUT(0), MSG);
    MSG += '#4 wt..._fut(3), ';
    assert(0.25, CUT(3), MSG);
    MSG += `
tested`;
    C_Both(MSG);
}
// ---------------------- Code Under Test: wtFunctions
/**
 *      _transform_CSD: D:csd, N:fctr
 */
var _transform_CSD = R.curry(function (csd, fctr) {
// make this a function
    var wt_opacity = R.compose(R.toString, R.multiply(fctr), parseFloat);
    var wt_fontSize = R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(fctr), parseFloat);
    var transform = {
        opacity: wt_opacity,
        fontSize: wt_fontSize,
    };
    return R.evolve(transform, csd); //=>
});

// ---------------------- tests: _transform_CSD
// test_transform_CSD()
function test_transform_CSD() {
    MSG = `_transform_CSD-> `;
    var stub_csd = {opacity: '76', fontSize: '80%'};
    var stub_col = [1, 2, 3, 4];
    var stub_fctr = 1 / 2;
    var stub_wtER = R.multiply(stub_fctr);

    RET = _transform_CSD(stub_csd, stub_fctr);
    MSG += '#1 isString, ';
    assert(true, R.is(String, RET.opacity), MSG);
    MSG += '#2 opacity: wter:1/2, ';
    assert('38', RET.opacity, MSG);
    MSG += '#3 fontSize: wter:1/2, ';
    assert('40%', RET.fontSize, MSG);
    MSG += '#4 fontSize: wter:1, ';
    RET = _transform_CSD(stub_csd, 1);
    assert('80%', RET.fontSize, MSG);


    MSG += '#5 fontSize: wter:fn(ndx, col), ';
    RET = _transform_CSD(stub_csd, wtFunc_pst(0, [1, 2, 3, 4]));
    assert('20%', RET.fontSize, MSG);
    MSG += `
tested`;
    C_Both(MSG);
}