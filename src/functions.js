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
    C_It(fn(obj));
    return obj
}; //C_TraceD()([1,2,3]);//>> 1,2,3
const isArray = (coll) => Array.isArray(coll);
const C_isArray = (coll) => {
    C_It(`${coll} isArray:[${isArray(coll)}]`);
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

const GET_cur_crGrps_Ary = pipeline(
    ( str = '#cur_ChptrReadGrp  .VerseReadGrps > div') => str  // > str
    //,C_Trace((str) => `query str:${str}`)
    ,(str) => document.querySelectorAll(str) // > NodeList w/ 3 divs.
    ,Coll2Array
    //,C_TraceD((ary) => `GET_cur_crGrps_Ary>> ${ary.length} VerseReadGrps`)
);  // fn ()  returns a value, if CALLEDBY ()
//let ___cut = GET_cur_crGrps_Ary; // NOTE: () >> value
//let ___msg = "should look like an array with div.pst...cur...fut";
//let ___srt = ___cut.length === 3 && isArray(___cut);
//console.assert(___srt, ___msg);

const SET_One_verseGrp_Styles = (styleObj) => (vrGrp) => {
    let sO = styleObj[vrGrp.className];
    //BUILD callback fn: SET_Verse_Style for use in map(fn)(vrGrp.chkldren)
    ___cut = SET_One_Verse_Style(sO);           //REFACT use directly in f_map
    ___data = Coll2Array(vrGrp.children);       //REFACT use directly in f_map
    //C_It(`_this_StyleObj:${sO.name}`);
    //C_It(`_this_VerseReadGrp.len:${___data.length}`);
    f_map( ___cut ) ( ___data   );
};  // CALLEDBY ( global StyleObj)(VerseGrp) >> just the StyleObj data for this VersereadGroup

const SET_All_verse_Styles = (globalStyleObj) =>  (data) => {
    //C_TraceD()(globalStyleObj);
    C_Trace((f)=>`fn;${f}`)(data);
    f_map(SET_One_verseGrp_Styles (globalStyleObj))( data); // calls each of 3 VerseReadGrps
};
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

