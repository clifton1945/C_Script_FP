/**
 * transformers_tests.js
 * 160620 R.evolve IS a better way to mutate styles!
 * @ 1405: STABLE usable wt_factor() AND _transform_CSD()
 * @ 1212: WIP STABLE _transform_CSD()
 * @ 0747:  STABLE transformers wt_opacity(0 and wt_fontSize() WORK nearly ready to accept an index argument.
 * @ 0617
 * 160610 0700  dropping evolve and transform. Will use Lens*
 */
"use strict";
//GLOBAL:
var CUT, RET, MSG = ``;
// ---------------------- tests data
var myTap = R.tap(o => C_Both(`t:${o} `));
var stub_csd = {opacity: '76', fontSize: '80%'};

var stub_fctr = 1 / 2;
var stub_wtER = R.multiply(stub_fctr);
// ---------------------- Code Under Test
/**
 *      wt_factor:: (N:fctr, L:sibls -> fctr) -> (fctr -> N:b -> N:b)

 * @param ndx
 * @param col
 * @return {*}
 */
var wt_factor = (ndx, col) => {
    var num = R.inc(ndx);
    var den = R.length(col);
    var wt = R.divide(num, den);
    return wt
};

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
// ---------------------- tests
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
RET = _transform_CSD(stub_csd, wt_factor(0, [1, 2, 3, 4]));
assert('20%', RET.fontSize, MSG);

C_Both(`ran transformers_tests-> ${MSG}`);
