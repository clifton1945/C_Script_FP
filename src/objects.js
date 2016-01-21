/**
 * Created by CLIF on 1/9/2016.
 */
"use strict";
// OBJECTS
const StyleObj = {
    fut: {
        name: 'fut'
        , smlWt: .4
        , lrgWt: .8
        , calcWt: (sObj, vObj) => {
            //noinspection JSUnusedLocalSymbols
            let {ver, ndx, ary} = vObj;
            let {smlWt, lrgWt} = sObj;
            let len = ary.length - 1;
            return (len > 0)
                ? (-(lrgWt - smlWt) / len * ndx + lrgWt)
                : lrgWt;  // always lrgWt
        }
    },
    cur: {
        name:'cur',
        smlWt: 1.0,
        lrgWt: 1.0,
        calcWt: (sObj, vObj) => {
            // using es6 destructuring
            let {ver, ndx, ary} = vObj;
            let {smlWt, lrgWt} = sObj;
            let len = ary.length - 1;
            return (len > 0)
                ? ((lrgWt - smlWt) / len * ndx + smlWt)
                : lrgWt;  // always lrgWt
        }
    },
    pst: {
        name: 'pst'
        , smlWt: 0.3
        , lrgWt: 0.8
        , calcWt: (sObj, vObj) => {
            let {ver, ndx, ary} = vObj;
            let {smlWt, lrgWt} = sObj;
            let len = ary.length - 1;
            return (len > 0)
                ? ((lrgWt - smlWt) / len * ndx + smlWt)
                : lrgWt;  // start small grow larger.
        }
    }
};
const VerseObj = {
    val:{}
    , ndx:0
    , ary:[]
    , toStr: () => `Trace>VerseObj.ndx:${VerseObj.ndx},.ary.length:${VerseObj.ary.length},
        outerHTML  ${VerseObj.val.outerHTML}`
};
//export { StyleObj, VerseObj }