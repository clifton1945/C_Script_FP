/**
 * Created by CLIF on 1/9/2016.
 */
"use strict";
// OBJECTS
/**
 * DEPRECATE 160229 USE StyleConstants
 * @type {{2: {name: string, smlWt: number, lrgWt: number, calcWt: Function}, 1: {name: string, smlWt: number, lrgWt: number, calcWt: Function}, 0: {name: string, smlWt: number, lrgWt: number, calcWt: Function}}}
 */
const TST_StyleObj = {
    2: {
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
    1: {
        name: 'cur',
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
    0: {
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
/**
 * DEPRECATE 160229 USE StyleConstants
 * @type {{CRGrpsTmpl: string, VRGrpsTmpl: string, fut: {name: string, smlWt: number, lrgWt: number, calcWt: Function}, cur: {name: string, smlWt: number, lrgWt: number, calcWt: Function}, pst: {name: string, smlWt: number, lrgWt: number, calcWt: Function}}}
 */
const StyleObj = {
    CRGrpsTmpl: '.ChptrReadGrps ',
    VRGrpsTmpl: '.ChptrReadGrps > .cur > .chptr > .VerseReadGrps',
    fut: {
        name: 'fut'
        , smlWt: .4
        , lrgWt: .95
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
        name: 'cur',
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
        , smlWt: 0.4
        , lrgWt: 0.95
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

/**
 * built for use in style all verses
 * 160229
 * @type {{CRGrpsTmpl: string, VRGrpsTmpl: string, fut: {name: string, smlWt: number, lrgWt: number, calcWt: Function}, cur: {name: string, smlWt: number, lrgWt: number, calcWt: Function}, pst: {name: string, smlWt: number, lrgWt: number, calcWt: Function}}}
 */
const StyleConstants = {
    2: {
        name: 'fut'
        ,smlWt: .4
        , lrgWt: .95
        , calcWt: (sObj, vObj) => {
            //noinspection JSUnusedLocalSymbols
            let {ver, ndx, ary} = vObj;
            let {smlWt, lrgWt} = sObj;
            let len = ary.length - 1;
            return (len > 0)
                ? (-(lrgWt - smlWt) / len * ndx + lrgWt)
                : lrgWt;  // always lrgWt
        }
        , styleTmpl: {
            backgroundColor: "rgba(145, 248, 29, 0.29)"
            , opacity: ".75"
            , fontSize: "75%"
        }
    },
    1: {
        name: 'cur',
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
    0: {
        name: 'pst'
        , smlWt: 0.4
        , lrgWt: 0.95
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
    val: {}
    , ndx: 0
    , ary: []
    , toStr: () => `Trace>VerseObj.ndx:${VerseObj.ndx},.ary.length:${VerseObj.ary.length},
        outerHTML  ${VerseObj.val.outerHTML}`
};
