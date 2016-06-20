/**
 * transformers_tests.js
 * 160620 R.evolve IS a better way to mutate styles!
 * @ 0747:  STABLE transformers wt_opacity(0 and wt_fontSize() WORK nearly ready to accept an index argument.
 * @ 0617
 * 160610 0700  dropping evolve and transform. Will use Lens*
 */
"use strict";
//GLOBAL:
var CUT, RET, MSG = ``;
var csd = {opacity: '76', fontSize: '80%'};
var stub_wtER = 1 / 2;
var wt_opacity = R.compose(R.toString, R.multiply(stub_wtER), parseFloat);
var wt_fontSize = R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(stub_wtER), parseFloat);
var transform = {
    opacity: R.compose(R.tap(o => o), wt_opacity),
    fontSize: wt_fontSize,
    data: {elapsed: R.add(1), remaining: R.add(-1)}
};
RET = R.evolve(transform, csd); //=> }
MSG += 'fontSize Valu #3, ';
assert('40%', RET.fontSize, MSG);
MSG += 'opacityValu #2, ';
assert('38', RET.opacity, MSG);
MSG += 'isString #1 ';
assert(true, R.is(String, RET.opacity), MSG);
C_Both(`ran transformers_tests >> ${MSG}`);