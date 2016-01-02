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
let VerseGrpsCollStr = '#curChptrGrp .verseGrps > div';
let VerseGrpsColl = document.querySelectorAll(VerseGrpsCollStr);
// Test
___msg = `ASSERT VerseGrpsColl IS NOT an Array.`;
___srt = !Array.isArray(VerseGrpsColl);
console.assert(___srt, ___msg);// PASSED
// CodeUnderTest - CUT:   DO( CONVERT NodeList TO Array)
let VerseGrpsArr = DO((collection) => [...collection])(VerseGrpsColl);
// Test
___msg = `ASSERT VerseGrpsArr IS an Array.`;
___srt = Array.isArray(VerseGrpsArr);
console.assert(___srt, ___msg);// PASSED

// **************  the Plan
// (UPDATE_VerseGrpStyle}FOROF_EACH(VerseGrp) USING (VerseGrpArr)
//// EXTRACT_VerseGrpName OFTHIS (VerseGrp)
//// EXTRACT_StyleObj OFTHIS (VerseGroupName)
//// {UPDATE_VerseStyle) FOROF_EACH (Verse) USING (StyleObj)
////// EXTRACT_VerseObj USING (Verse)
////// UPDATE StyleWt USING (EXTRACT_VerseObj)
////// UPDATE StyleTmpl USING (UPDATE_StyleWt)
////// UPDATE Verse USING (UPDATE_StyleTmpl)



// (UPDATE_VerseGrpStyle}FOROF_EACH(VerseGrp) USING (VerseGrpArr)
//// EXTRACT_VerseGrpName OFTHIS (VerseGrp)
//// EXTRACT_StyleObj OFTHIS (VerseGroupName)
const EXTRACT_StyleObj = ( VerseGrpName) => {
    return StyleObj[VerseGrpName]
};

const UPDATE_VerseGrpStyle = (el) => {
    console.log(EXTRACT_VerseGrpName(el));
};

FOROF_EACH(VerseGrpsArr)(UPDATE_VerseGrpStyle);


