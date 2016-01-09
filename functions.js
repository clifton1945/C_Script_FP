/**
 * Created by CLIF on 12/30/2015.
 */
"use strict";
// *********** TRACE HELPERS
const Doc_It = (txt) => document.querySelector(".console").textContent = txt;
const C_It = (txt) => console.log(txt);
/**
 * a Wrapper to log and pass thru an object.
 * @param fn :  sets what will be seen.
 * @constructor
 */
const C_This =  (fn) => (obj) => {
    C_It( fn(obj));
    return obj
};
const isArray = (coll) => Array.isArray(coll);
const C_isArray = (coll) => {
    C_It(`${coll} isArray:[${isArray(coll)}]`);
    return coll};
const Coll2Arry = (coll) => [...coll];
// ******************  FUNCTIONS
const f_map = (fn) => (ary) => {return ary.map(fn)};
const a_map = (ary) => (fn) => {return ary.map(fn)};
/**
 * Hardcoded query RETURNS cur chapter's 3 verseGroups
 *    AS an array
 */
const GET_VerseGrpsArr = pipeline(
    () => '#curChptrGrp .verseGrps > div',  // > str
    (str) => document.querySelectorAll(str),// > NodeList
    Coll2Arry
);  // CALLED with empty aruments ()
/**
 * EXTRACTS style settings FOR this (verseGrp) FROM global (StyleObj)
 */
const SELECT_vGrpStyleObj = pipeline(
    (VerseGrp) => VerseGrp.className,
    (VerseGrpName) => (styleObj) => styleObj[VerseGrpName]
);  // CALLEDBY (VerseGrp)(StyleObj)
/**
 * returns a children Array FROM an Array
 * @param vGrp
 * @constructor
 */
const GET_Children_FROM = (col) => col.children;
// called by fn(verseGroup)  >> HTMLCollection

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
        name: 'fut'
        , smlWt: .5
        , lrgWt: .9
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
        , smlWt: 0.4
        , lrgWt: 0.9
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
const VerseObj = {val:{}, ndx:0, ary:[]};
// update Style
const get_GrpClassName = (c,n,a) => c.getAttribute("class");
// *********** DEPRECATED
//const f_NL2Arr = (nl) => {return [...nl]};
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

//LEARNING A LITTLE ABOUT pipeline and Currying
let ___cut, ___srt, ___ret, ___msg, ___pipe, ___data;

___cut = (a1) =>
    (a2) =>  C_It(`(a1:${a1}, a2:${a2}) >> 10a1+a2 = ${a2 + 10 * a1}`);
___cut(10)(3);  //>>a1:10, a2:3 >> 103
___cut(3)(10);  //>>a1:3, a2:10 >> 40
// ++++++++++++++++++++++++++++
___ret = pipeline (
    () => 10,        // this is a2:10
    ___cut(3)          // a1:3. cut is a VALUE, not function, ready be called in ___ret()
);
___ret();           //calls cut VALUE >> >>a1:3, a2:10 >> 40
___ret(222);           //calls cut VALUE >> >>a1:3, a2:10 >> 40
___ret(444);           //calls cut VALUE >> >>a1:3, a2:10 >> 40
//****************
___ret = pipeline (
    () => 3,    // a2:3
    ___cut,
    () => 10,   // WOOPS ??  a2:10 ????
    ___cut       // a1:NAN, a2:10
);
___ret(3333333)(5);       //>> cut function. >> a1:10, a2:5 >> 105
___ret(3333333)(1);       //>> cut function. >> a1:10, a2:1 >> 101
___ret(3333333)(7);       //>> cut function. >> a1:10, a2:7 >> 107

