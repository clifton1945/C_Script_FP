/**
 * Created by CLIF on 12/30/2015.
 */
"use strict";
const C_It = (txt) => document.querySelector(".console").textContent = txt;
//
const mapWith = (fn) => (list) => list.map(fn);
const mapW_arr = (arr) => (fn) => {return arr.map(fn)};
const mapW_fn = (fn) => (arr) => {return arr.map(fn)};
//
const DO = (f) => (arg) => f(arg);
const FOROF_EACH = (arr) => (fn) =>  {
    for ( let a of arr) { fn(a)}
};

const f_NL2Arr = (nl) => {return [...nl]};
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
const set_StyleTmpl = (wt) => {
    return `opacity:${wt}; font-size:${wt * 100}%`;  // color:red is just for testing.
};
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