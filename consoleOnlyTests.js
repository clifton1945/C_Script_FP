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

___cut = (el) => console.log(el.className);
FOROF_EACH(VerseGrpsArr)(___cut);

//mock Data
var o = VerseGrpsArr;
let mockVGrp = {val:o[2], ndx:2, arr:o};  // a Mock map return

// CUT ITERATE_over_eacf
//___ret = mapW_arr(VerseGrpsArr)((obj) => {obj});
//// Test
//___msg = `ASSET  arr of 3 chapter verseGrp classes: pst, cur, fut`;
//___srt = (___ret[0] === 'pst' && ___ret[2] == 'fut') ;
//console.assert(___srt, ___msg);// PASSED

//C_It("consoleOnlyTests.#01>> " + ___ret);