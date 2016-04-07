/**
 * Created by CLIF on 4/7/2016.
 */
'use strict';

var a_stylWt_MAKER = R.curry(
    function a_stylWt_MAKER(stylDict, elem, ndx, coll) { //::-> aSty_Str
        // wt in the end should be
        // => farWt + (nearWt - farWt) / vDenom * ndx  Where vDenom:: 1 || coll.length - 1
        // NOTE: within a verse class collection of verses, the only var that changes in its Index
        let wt;
        let smlWt = (R.pipe(R.prop('2'), R.prop('smlWt')))(stylDict);
        let lrgWt = (R.pipe(R.prop('2'), R.prop('lrgWt')))(stylDict);
        // begin calc Wt
        let vDenom = (R.pipe(
            R.length
            , R.unless(R.equals(1), R.dec) // DO NOT DECREMENT IF Len == 1
            , R.divide(1)
        ))(coll);
        let sCoeff =  smlWt + (lrgWt - smlWt)/ vDenom ;
        wt = sCoeff * ndx;
        // rndm just for early testing
        //var rndm = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        MSG += msg(wt); // TRACING ONLY
        return wt
    });
