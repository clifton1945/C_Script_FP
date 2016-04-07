/**
 * Created by CLIF on 4/7/2016.
 */
'use strict';

var a_stylWt_MAKER = (StylDict, elem, ndx, coll) => { //::-> aSty_Str
    let f = x => C_It(JSON.stringify(`:${x}`));
    let y = (x)=> C_Both(x);
    let msg = (msg) => ` ${msg}`;
    let smlWt = R.pipe(R.prop('2'), R.prop('smlWt'));
    // begin calc Wt
    let vDenom = R.pipe(
        R.length
        , R.unless(R.equals(1), R.dec) // DO NOT DECRIMENT IF Len == 1
        , R.divide(1)
    );
    var round = x => Math.round(x * 100) / 100;
    let vCoeff = R.pipe(
        R.multiply(vDenom(coll))
        , round
    );

    MSG += msg(vCoeff(ndx));

};
