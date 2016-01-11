"use strict";


/**
 * testDoc.js
 * ALL THIS CODE, accumulating in functions.js and objects.js,
 * IS TO APPLY the fn: UPDATE_VERSE_STYLE to every div.vers PRESENTED to it
 *
 * I've changed the doc elements hopefully to let me keep track of the code.
 * But mostly to scrap all the many things open in tests.ja and tests.html.
 * This is a new staart.
 * This is in keeping with my oft repeated understanding that
 *   I MUST just DO OTAAT: One Thing At A Time
 *   Because I can't handle m ore that one - three thing at a time.
 *
 *   using new class names in testDoc.html
 * Created by CLIF on 1/9/2016.
 */

let ___cut, ___srt, ___ret, ___msg, ___pipe, ___data;

//*****************************************************
// I'll assume I'll always want to CEE  and MODIFY just the verses IN the curChptrReadGrps div.
// AND that the style of the verses will vary as fn(VerseReadGrps group) AND (the current VersObject)
//
// first encompass the verses associated just with curChptr and its three VerseReads.
/**
 * first simple test of GET_VerseReadArr(): when invoked with just () returns >> a value: VerseReadArr
 */
//___cut = GET_VerseReadArr (); // AGAIN invoke this with  ()
___pipe =  pipeline(
    () => '#cur_ChptrReadGrps .VerseReadGrps >  div'  // > str
    ,C_Trace((str) => `query str:${str}`)
    ,(str) => document.querySelectorAll(str) // > NodeList w/ 3 divs.
    ,Coll2Array
    ,C_Trace((ary) => `${ary.length} VerseReadGrps`)
);  // returns fn CALLEDBY ()  >> Array
___cut = ___pipe ();
___msg = "should look like an array with div.pst...cur...fut";
___srt = (___cut.length === 3 && isArray(___cut));
console.assert(___srt,___msg);
//*****************************************************
// 2nd
/**
 * simple test of SELECT_VerseRead_StyleObj fn( data)(StyleObj)
 * : a function TO SELECT the current VerseReadGrps StyleObj
 */
// the style needs to know WHICH VerseReadGrps
___data = GET_VerseReadArr()[2];  // HERE IS A VerseReadGrps with n Verses
___cut = SELECT_VerseRead_StyleObj(___data)(StyleObj);  // >> returns One Value: a subset of the StyleObj.
___msg = "CONFIRM this is THE futStyleObj.";
___srt = ___cut.name === 'fut' && ___cut.smlWt === 0.5;
console.assert(___srt, ___msg);
// OK, I can EXTRACT the specific FROM global StyleObj FOR a specific VerseReadGrps element.

////*****************************************************
///**
// * simple test of UPDATE_VerseObj(the global VerseObj)(a verse returned by map i.e. val, ndx, ary
// * @type {{val: string, ndx: number, ary: number[]}} : TEST DATA!!
// * @private
// */
//TODO   reinstate___data = ['some vers element', 222, [1,2,3,4]];
//___cut = UPDATE_VerseObject(VerseObj)(___data);
//___msg = "EXP the test data is now in the Global VerseObj.";
//___srt = ___cut.ndx === 222; // don't expect 222 anywhere else.
//console.assert(___srt, ___msg);

//*****************************************************
//SO BUILD something that UPDATES All the Verses IN One VerseReadGrps group
//___data = GET_VerseReadArr()[2];  // HERE IS One VerseReadGrps group: fut.
//
//___pipe = pipeline(
//    (col) => col.children,  // FROM One VerseReadGrps Group TO >> Collection of verseObjs
//    Coll2Array,              //
//    f_map (                 //
//        UPDATE_VerseObj(VerseObj)  // NOTE curried with VerseObj
//    ) // >> each child - a verse - transformed to a VerseObj.
//);
//
//const UPDATE_VerseObj = ___pipe;
//___data = GET_VerseReadArr()[2];  // HERE IS One VerseReadGrps group with n Verses
//___cut = UPDATE_VerseObj (___data); //
//___srt = (
//    ___cut.length === 3 &&
//    isArray(___cut)
//);
////TODO  REINSTATE TEST
////console.assert(___srt,`___cut = GET_VerseReadArr ();
////___srt = (___cut.length === 3 &&
////    isArray(___cut)
////`);
//
//
////*****************************************************
//// Next - thinking out loud- I need to UPDATE_VerseObj USING( current_Style value)  and (current_Verse).
//// DO OTAAT to get the brother of SELECT_VerseRead_StyleValue.
//// FINALLY the UPDATE_vers_style can be called using it's calc_wt >> style str >> verse.setAttribute.style str.
////
////SO BUILD something that UPDATES All the Verses IN One VerseReadGrps groups
//___pipe = pipeline(
//    (col) => col.children,  // FROM one  >> array of verseObjs for that group
//    Coll2Array,
//    f_map (
//        (val, ndx, ary) => {
//            VerseObj.val = val;
//            VerseObj.ndx = ndx;
//            VerseObj.ary = ary;
//            C_It(
//                `TRACE: VerseObj.ndx:${VerseObj.ndx},.ary.length:${VerseObj.ary.length},
//                innerHTML  ${VerseObj.val.innerHTML}`
//                );
//            return VerseObj
//        }
//    ) // >> each child - a verse - transformed to a VerseObj.
//);
////const UPDATE_VerObj = ___pipe;
////___data = GET_VerseReadArr ();  // standalone. no arg needed
////f_map( ___pipe)(___data);
//
