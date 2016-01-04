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
let GET_VerseGrpsCollStr = () => '#curChptrGrp .verseGrps > div';
let GET_VerseGrpsColl = (str) => document.querySelectorAll(str);
// Test
___cut = pipeline(GET_VerseGrpsCollStr, GET_VerseGrpsColl) ();  // NOTE following ()
___msg = `ASSERT GET_VerseGrpsColl IS NOT an Array.`;
___srt = !Array.isArray(___cut);
console.assert(___srt, ___msg);// PASSED

// CodeUnderTest - CUT:   DO( CONVERT NodeList TO Array)
let GET_VerseGrpsArr = pipeline(
    GET_VerseGrpsCollStr,
    GET_VerseGrpsColl,
    CONVERT_NodeList_TO_Array () // NOTE the following () !!
);
___msg = `ASSERT VerseGrpsArr IS an Array.`;
___srt = Array.isArray(GET_VerseGrpsArr ());// NOTE the following () !!
console.assert(___srt, ___msg);// PASSED

// **************  the Plan
// (UPDATE_VerseGrpStyle}FOROF_EACH(VerseGrp) USING (VerseGrpArr)
//// EXTRACT_VerseGrpName OFTHIS (VerseGrp)
//// EXTRACT_ThisStyleObj OFTHIS (VerseGroupName)//// GET_ThisVerseGrp_VerseNL FROM (VerseGrp)
//// GET_ThisVerseGrp_VerseNL FROM (VerseGrp)
//// {UPDATE_VerseStyle) FOROF_EACH (Verse) USING (GET_ThisVerseGrp_VerseNL)
////// EXTRACT_VerseObj USING (Verse)
////// UPDATE StyleWt USING (EXTRACT_VerseObj)
////// UPDATE StyleTmpl USING (UPDATE_StyleWt)
////// UPDATE Verse USING (UPDATE_StyleTmpl)

//// EXTRACT_VerseGrpName OFTHIS (VerseGrp)
//// EXTRACT_ThisStyleObj OFTHIS (VerseGroupName)
var ___tst_vgrp = GET_VerseGrpsArr()[2];
//  NOW USE a pipeline()
___cut = pipeline(
    EXTRACT_VerseGrpName,
    EXTRACT_ThisStyleObj(StyleObj)  // NOTE HardCoded Object
);
___cut = ___cut(___tst_vgrp);
___msg = "CONFIRM this is the futStyleObj.";
___srt = (
    ___cut.name === 'fut' &&
    ___cut.smlWt === 0.5);
console.assert(___srt, ___msg);// PASSED


// (UPDATE_VerseGrpStyle}FOROF_EACH(VerseGrp) USING (VerseGrpArr)
//// GET_ThisVerseGrp_VerseNL FROM (VerseGrp)
//// {UPDATE_VerseStyle) FOROF_EACH (Verse) USING (GET_ThisVerseGrp_VerseNL)

//
////// EXTRACT_VerseObj OFTHIS (Verse)

//
//FOROF_EACH(GET_VerseGrpsArr)(UPDATE_VerseGrpStyle);