/**
 * Created by CLIF on 12/30/2015.
 */
"use strict";
const Doc_It = (txt) => document.querySelector(".console").textContent = txt;
const C_It = (txt) => console.log(txt);
/**
 * a Wrapper to log and pass thru an object.
 * @param fn :  sets what will be seen.
 * @constructor
 */
const C_This = (fn) => (obj) => {
    C_It( fn(obj));
    return obj};
//
// USED IN consoleOnlyTest
const DO = (f) => (arg) => f(arg);
const FOROF_EACH = (arr) => (fn) =>  {
    for ( let a of arr) { fn(a)}
};
const EXTRACT_VerseGrpName = (VerseGrp) => VerseGrp.className;
const EXTRACT_ThisStyleObj = ( VerseGrpName) => StyleObj[VerseGrpName];
const EXTRACT_VerseObj = () => {};


/**
 * calculates a specific verse style wt USING StyleObj.calcWt
 * @param so: StyleObj
 */
const calcWt = (so) => (vo) => {
    return so.calcWt(so, vo); // return a style wt.
};
const set_VerseStyle = (so) => (vo) => {
    let fn_calcWt = calcWt(so); // >> fn
    let tmpl = set_StyleTmpl(fn_calcWt(vo));  // >> fn >> str
    // NOTE: no return required; this sets the DOM
    vo.ver.setAttribute("style", tmpl)
};
const set_StyleTmpl = (wt) => {
    return `opacity:${wt}; font-size:${wt * 100}%`;  // color:red is just for testing.
};

// OBJECTS
const StyleObj = {
    fut: {
        smlWt: .5
        , lrgWt: .9
        , calcWt: (sObj, vObj) => {
            //noinspection JSUnusedLocalSymbols
            let {ver, ndx, arr} = vObj;
            let {smlWt, lrgWt} = sObj;
            let len = arr.length - 1;
            return (len > 0)
                ? (-(lrgWt - smlWt) / len * ndx + lrgWt)
                : lrgWt;  // always lrgWt
        }
    },
    cur: {
        smlWt: 1.0
        , lrgWt: 1.0
        , calcWt: (sObj, vObj) => {
            // using es6 destructuring
            let {ver, ndx, arr} = vObj;
            let {smlWt, lrgWt} = sObj;
            let len = arr.length - 1;
            return (len > 0)
                ? ((lrgWt - smlWt) / len * ndx + smlWt)
                : lrgWt;  // always lrgWt
        }
    },
    pst: {
        smlWt: 0.4
        , lrgWt: 0.9
        , calcWt: (sObj, vObj) => {
            let {ver, ndx, arr} = vObj;
            let {smlWt, lrgWt} = sObj;
            let len = arr.length - 1;
            return (len > 0)
                ? ((lrgWt - smlWt) / len * ndx + smlWt)
                : lrgWt;  // start small grow larger.
        }
    }
};
const VerseObj = {ver:{}, ndx:0, arr:[]};
// update Style
const get_GrpClassName = (c,n,a) => c.getAttribute("class");
// *********** DEPRECATED
//const f_NL2Arr = (nl) => {return [...nl]};
const f_map = (arr) => (fn) => {return arr.map(fn)};
const pickOne_Elem = (arr) =>  {
    return  (name) => {
        let pick = (val) => {
            return val.getAttribute("class") === name
        };
        return arr.filter(pick);  // an array with filtered Element[s].
    }
};
const pickOne_fromNL = ( nodelist) => {
    return pickOne_Elem([...nodelist]);
};
