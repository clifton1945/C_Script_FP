/**
 * transformers_tests.js
 * 160620 R.evolve IS a better way to mutate styles!
 * @ 1212: WIP STABLE _transform_CSD()
 * @ 0747:  STABLE transformers wt_opacity(0 and wt_fontSize() WORK nearly ready to accept an index argument.
 * @ 0617
 * 160610 0700  dropping evolve and transform. Will use Lens*
 */
"use strict";
//GLOBAL:
var CUT, RET, MSG = ``;
// ---------------------- tests data
var stub_csd = {opacity: '76', fontSize: '80%'};
var stub_wter = 1 / 2;
/**
 *      wtER:: N:fctr -> (fctr -> N:b -> N:b)

 * @param fctr
 */
var wtER = (fctr) => R.multiply(fctr);
var myTap = R.tap(o => C_Both(`t:${o} `));
// ---------------------- Code Under Test
/**
 *      _transform_CSD: D:csd, (a, b -> c)
 */
var _transform_CSD = R.curry(function (csd, fctr) {
// make this a function
    var wt_opacity = R.compose(R.toString, wtER(fctr), parseFloat);
    var wt_fontSize = R.compose(R.flip(R.concat)('%'), R.toString, wtER(fctr), parseFloat);
    var transform = {
        opacity: wt_opacity,
        fontSize: wt_fontSize,
    };
    return R.evolve(transform, csd); //=>
});
RET = _transform_CSD(stub_csd, stub_wter);

// ---------------------- tests
MSG += 'fontSize Valu #3, ';
assert('40%', RET.fontSize, MSG);
MSG += 'opacityValu #2, ';
assert('38', RET.opacity, MSG);
MSG += 'isString #1 ';
assert(true, R.is(String, RET.opacity), MSG);
C_Both(`ran transformers_tests >> ${MSG}`);