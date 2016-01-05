/**
 * Created by CLIF on 1/1/2016.
 */
/**
 * Created by CLIF on 12/8/2015.
 */
"use strict";
// for now these are GLOBAL vars.
var ov;

//TESTS
ov = "test2: set_VerseStyle() ON ALL curChapter verses ";

let ___cut, ___srt, ___ret, ___msg;
// PLAN: forEach Chnptr forEach Verse UPDATE eachVerse_Style
// Test  that pipeline and the two functions work: GotIW!
___cut = pipeline(
    () => '#curChptrGrp .verseGrps > div',
    (str) => document.querySelectorAll(str)
);
___msg = `ASSERT GET_VerseGrpsColl  IS NOT an Array.`;
___srt = !Array.isArray(___cut());  //NOTE the invoking ()
console.assert(___srt, ___msg);// PASSED

// CodeUnderTest - CUT:   DO CONVERT NodeList TO Array)
let GET_VerseGrpsCollStr = () => '#curChptrGrp .verseGrps > div';
let GET_VerseGrpsColl = (str) => document.querySelectorAll(str);
//ADD  CONVERT2_VerseGrpsArr_FROM(VerseGrpsNL)
let CONVERT_NLtoARR = (nl) => [...nl];
// LETS name these assembled functions: GET_VerseGrpsArr
let GET_VerseGrpsArr = pipeline(
    GET_VerseGrpsCollStr,
    GET_VerseGrpsColl,
    CONVERT_NLtoARR
);
___msg = `and CONFIRM VerseGrpsArr NOW IS an Array.`;
___srt = Array.isArray(GET_VerseGrpsArr ());// NOTE the following () !!
console.assert(___srt, ___msg);// PASSED

// **************  the Plan GIVEN the currentChptrGrp
// SET_VerseGrpsNLStr_()
// GET_VerseGrpsNL_FROM(VerseGrpsNLStr)
// CONVERT2_VerseGrpsArr_FROM(VerseGrpsNL)
//
// AND APPLY__EXTRACT_StyleObj_FROM(VerseGrp)FOROF(VerseGrpArr)
// OR
// AND APPLY__EXTRACT_StyleObj_FROM(VerseGrp)FOROF(VerseGrpArr)
//// EXTRACT_VerseGrp_FOROF_(VerseGrpArr) 
//// EXTRACT_VerseGrpName_FROM(VerseGrp)
//// EXTRACT_ThisStyleObj_FROM(VerseGrpName)(StyleObj)

//// ASSMBL_VerseObj_FOROF_FROM (GET_ThisVerseGrp_VerseNL)
////// EXTRACT_VerseObj USING (Verse)
////// UPDATE StyleWt USING (EXTRACT_VerseObj)
////// UPDATE StyleTmpl USING (UPDATE_StyleWt)
////// UPDATE Verse USING (UPDATE_StyleTmpl)
//  ***************************

// BEFORE I //// EXTRACT_VerseGrp_FOROF_(VerseGrpArr)
// Two things needed:
//    1. a group StyleObj subset
//    2. a group verse node list.
//
// First build a function SELECT_vGrpStyleObj function
// An  I'll need a test v_Grp
var ___here_is_a_test_v_Grp = GET_VerseGrpsArr()[2];

//  NOW USE a pipeline() to assemble a  SELECT_vGrpStyleObj()()
// it will need to apply (vGrpName)(StyleObj)
___cut = pipeline(
    function (vGrp) {
        return vGrp.className;
    }, // need to select 1 / 3 groups
    function (vGrpName) {
        return function (sO) {
            return sO[vGrpName];
        };
    }); // in the end this needs two arguments w/
___ret = ___cut(StyleObj);
___ret = ___ret(___here_is_a_test_v_Grp);
// NOW make this into a fixed function.
___ret = SELECT_vGrpStyleObj(StyleObj)(___here_is_a_test_v_Grp);
___msg = "CONFIRM this is THE futStyleObj.";
___srt = ___ret.name === 'fut' && ___ret.smlWt === 0.5;
console.assert(___srt, ___msg); // PASSED

// #2 >>  I need a GrpVersesNL >> ARR holding all the verses of 1 of 3 Groups: pst, cur, fut
//// opton A: just use a vGrp.querySelectorAll( ' > P')
//// option B: vGrp.childElements????
// (UPDATE_VerseGrpStyle}FOROF_EACH(VerseGrp) USING (VerseGrpArr)
//// GET_ThisVerseGrp_VerseNL FROM (VerseGrp)
//// {UPDATE_VerseStyle) FOROF_EACH (Verse) USING (GET_ThisVerseGrp_VerseNL)
___here_is_a_test_v_Grp.childElementCount; // WIP
//
////// EXTRACT_VerseObj OFTHIS (Verse)

//
//FOROF_EACH(GET_VerseGrpsArr)(UPDATE_VerseGrpStyle);