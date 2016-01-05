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

const FOROF_EACH = (arr) => (fn) =>  {
    for ( let a of arr) { fn(a)}
};
const SELECT_vGrpStyleObj = pipeline(
    (VerseGrp) => VerseGrp.className,
    (VerseGrpName) => (styleObj) => styleObj[VerseGrpName]
);

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
const DO = (f) => (arg) => f(arg);

// OBJECTS
const StyleObj = {
    fut: {
        name: 'fut'
        , smlWt: .5
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
        name:'cur',
        smlWt: 1.0,
        lrgWt: 1.0,
        calcWt: (sObj, vObj) => {
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
        name: 'pst'
        , smlWt: 0.4
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


// SOMEONE ELSES PIPELINE - to ASSEMBLE || COMPOSE functions
function runStep(intermediate, step) {
    return step(intermediate);
}
function pipeline() {
    var steps = [].slice.call(arguments, 0);
    return function(initialValue) {
        return steps.reduce(runStep, initialValue);
    };
}
function addTwo(x) {
    return x + 2;
}
function timesFive(x) {
    return x * 5;
}
// Using pipeline from :
//var addTwoThenTimesFive = pipeline(addTwo, timesFive);
//C_It(addTwoThenTimesFive(1)); //=> 15
//addTwoThenTimesFive(-1); //=> 5
//C_It(addTwoThenTimesFive(100)); //=> 510
