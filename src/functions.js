/**
 * Created by CLIF on 12/30/2015.
 */
"use strict";
// *********** TRACE HELPERS
//const Doc_It = (txt) => document.querySelector(".console").textContent = txt;
const C_It = (txt) => console.log(txt);
/**
 * a Wrapper to log and pass thru an object.
 * @param fn :  sets what will be seen.
 * @constructor
 */
//const C_This =  (txt) => (obj) => {
//    console.log( `${txt} @ ${obj}` );
//    return obj
//};
const C_Trace = (fn) => (obj) => {
    console.log(fn(obj));
    return obj
};
const C_TraceD = (fn=(obj)=>`${obj}`) => (obj) => {
    console.log(fn(obj));
    return obj
}; //C_TraceD()([1,2,3]);//>> 1,2,3

const C_TraceS = (fn=(obj)=>`${obj}`) => (obj) => {
    console.log(fn(obj));
    return obj
}; //C_TraceD()([1,2,3]);//>> 1,2,3

const isArray = (coll) => Array.isArray(coll);
const C_isArray = (coll) => {
    console.log(`${coll} isArray:[${isArray(coll)}]`);
    return coll};
// ******************  FUNCTIONS
const Coll2Array = (coll) => [...coll];
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

/**
 * GET_VerseReadGrpsArr:  use hardcoded query RETURNS current chapter's 3 verseGroups
 *    AS an array.
 *    hard code because I ALWAYS want just the currrent Chapter.
 */
const GET_VerseReadGrpsArr = pipeline(
        ( str = '#cur_ChptrReadGrp  .VerseReadGrps > div') => str  // > str
        //,C_Trace((str) => `query str:${str}`)
        ,(str) => document.querySelectorAll(str) // > NodeList w/ 3 divs.
        ,Coll2Array
        //,C_Trace((ary) => `${ary.length} VerseReadGrps`)
);  // fn ()  returns a value, if CALLEDBY ()
/**
 * EXTRACTS style settings FOR this (verseGrp) FROM global (StyleObj)
 */
const SELECT_VerseReadGrp_StyleObj = pipeline(
    (VerseGrp) => VerseGrp.className,
    (VerseGrpName) => (styleObj) => styleObj[VerseGrpName]
);  // CALLEDBY (VerseGrp)( general StyleObj) >> just the StyleObj data for this VrsereadGroup
/**
 * UPDATES  the global VerseObj FOR this vers elem.
 * @param vO:  the global VerseObj
 * @constructor
 */
const UPDATE_VerseObject = (vO) => (...vers) => {
    vO.val = vers[0];
    vO.ndx = vers[1];
    vO.ary = vers[2];
    //C_Trace((o) => o.ndx)(vO);
    return vO
};

///**
// * calculates a specific verse style wt USING StyleObj.calcWt
// * @param so: StyleObj
// */
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

