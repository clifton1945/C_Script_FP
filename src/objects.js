/**
 * MODIFIED 4/9/2016
 * CREATED by CLIF on 1/9/2016.
 */
"use strict";
// OBJECTS
/**
 *              TST_StyleObj: still Active  IN ramda_tests
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
 *              StyleObj:  still Active IN update_ReadGrp_TESTS
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
            let delta = lrgWt - smlWt;
            return (len > 0)
                ? (-delta / len * ndx + lrgWt)
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
            let delta = lrgWt - smlWt;
            return (len > 0)
                ? (delta / len * ndx + smlWt)
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
            let delta = lrgWt - smlWt;
            return (len > 0)
                ? (delta / len * ndx + smlWt)
                : lrgWt;  // start small grow larger.
        }
    }
};
/**
 *              StyleDict: IS still Active IN ...
 * ramda_tests; STYLE_Verses_TESTS
 * 160409
 * @type {{CRGrpsTmpl: string, VRGrpsTmpl: string, fut: {name: string, smlWt: number, lrgWt: number, calcWt: Function}, cur: {name: string, smlWt: number, lrgWt: number, calcWt: Function}, pst: {name: string, smlWt: number, lrgWt: number, calcWt: Function}}}
 */
const StyleDict = {
    properties: {
        _fontSize:function _fontSize(x) {return x + '%'}
        ,_opacity:function _opacity(x) {return '' + x / 100}
        ,textAlign: "center"
    },
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