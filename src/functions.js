/**
 * Created by CLIF on 12/30/2015.
 */
"use strict";
// *********** TRACE HELPERS

const Doc_It = (txt) => document.querySelector(".console").textContent = txt;
const C_It = (txt) => console.log(txt);
const C_Both = (txt) => {
    C_It (txt);
    Doc_It (txt);
};

const Trace = (fn=(obj)=>`${obj}`) => (obj) => {
    C_Both(fn(obj));
    return obj
};

// ******************  FUNCTIONS
const f_map = (fn) => (ary) => {return ary.map(fn)};
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
////SOME TESTS
// function addTwo(x) {
//    return x + 2;
//}
//function timesFive(x) {
//    return x * 5;
//}
////Using pipeline from :
//var addTwoThenTimesFive = pipeline(addTwo, timesFive);
//C_It(addTwoThenTimesFive(1)); //=> 15
//addTwoThenTimesFive(-1); //=> 5
//C_It(addTwoThenTimesFive(100)); //=> 510
///**
// * calculates a specific verse style wt USING StyleObj.calcWt
// * @param so: StyleObj
// */

//DEPRECATED
const C_Trace = (fn) => (obj) => {
    console.log(fn(obj));
    return obj
};
const C_TraceD = (fn=(obj)=>`${obj}`) => (obj) => {
    console.log(fn(obj));
    return obj
}; //C_TraceD()([1,2,3]);//>> 1,2,3
const C_TraceS = (fn=(obj)=>`${obj}`) => (obj) => {
    C_It(fn(obj));
    return obj
}; //C_TraceD()([1,2,3]);//>> 1,2,3
const isArray = (coll) => Array.isArray(coll);
const C_isArray = (coll) => {
    C_It(`${coll} isArray:[${isArray(coll)}]`);
    return coll};

//const calcWt = (so) => (vo) => {
//    return so.calcWt(so, vo); // return a style wt.
//};
//const set_VerseStyle = (so) => (vo) => {
//    let fn_calcWt = calcWt(so); // >> fn
//    let tmpl = set_StyleTmpl(fn_calcWt(vo));  // >> fn >> str
//    // NOTE: no return required; this sets the DOM
//    vo.ver.setAttribute("style", tmpl)
//};
//const set_StyleTmpl = (wt) => {
//    return `opacity:${wt}; font-size:${wt * 100}%`;  // color:red is just for testing.
//};
//
//// update Style
//const get_GrpClassName = (c,n,a) => c.getAttribute("class");
//// *********** DEPRECATED
////const f_NL2Arr = (nl) => {return [...nl]};
//const pickOne_fromNL = ( nodelist) => {
//    return pickOne_Elem([...nodelist]);
//};

