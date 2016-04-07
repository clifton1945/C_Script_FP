/**
 * Created by CLIF on 4/7/2016.
 * first of using small files
 */
'use strict';

var a_stylWt_MAKER = R.curry(
    function a_stylWt_MAKER(stylDict, elem, ndx, coll) { //::-> aSty_Str
        // wt in the end should be
        // => smlWt + (lrgWt - smlWt) / vDenom * ndx  Where vDenom:: 1 || coll.length - 1
        // NOTE: within a verse class collection of verses, the only var that changes in its Index
        let wt;
        let smlWt = stylDict['2']['smlWt'];
        let lrgWt = stylDict['2']['lrgWt'];
        // begin calc Wt
        let vDenom = R.pipe(
            R.length
            , R.unless(R.equals(1), R.dec)// DO NOT DECREMENT IF Len == 1
            )(coll);
        let clasCoeff = function clasCoeff (n) {
            return smlWt + n / vDenom * (lrgWt - smlWt)
        };
        wt = round2(clasCoeff(ndx));
        MSG += msg(wt); // TRACING ONLY
        return wt
    });
