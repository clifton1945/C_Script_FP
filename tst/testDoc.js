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
// first encompass the verses associated just with curChptr and its three VerseReads.
/**
 * first simple test of GET_VerseReadGrpsArr(): when invoked with just () returns >> a value: VerseReadArr
 */
___cut = GET_VerseReadGrpsArr(); // NOTE: () >> value
___msg = "should look like an array with div.pst...cur...fut";
___srt = ___cut.length === 3 && isArray(___cut);
console.assert(___srt, ___msg);
//*****************************************************
// 2nd
/**
 * simple test of SELECT_VerseReadGrp_StyleObj fn( data)(StyleObj)
 * : a function TO SELECT the current VerseReadGrps StyleObj
 */
// the style needs to know WHICH VerseReadGrps
___data = GET_VerseReadGrpsArr()[2]; // HERE IS A VerseReadGrps with n Verses
___cut = SELECT_VerseReadGrp_StyleObj(___data)(StyleObj); // >> returns One Value: a subset of the StyleObj.
___msg = "CONFIRM this is THE futStyleObj.";
___srt = ___cut.name === 'fut' && ___cut.smlWt === 0.5;
console.assert(___srt, ___msg);
// OK, I can EXTRACT the specific FROM global StyleObj FOR a specific VerseReadGrps element.
// NOW
//*****************************************************
/**
 * simple test of UPDATE_VerseObj(the global VerseObj)(a verse returned by map i.e. val, ndx, ary
 * @type {{val: string, ndx: number, ary: number[]}} : TEST DATA!!
 * @private
 */
___data = ['some vers element', 222, [1,2,3,4]];
___cut = UPDATE_VerseObject(VerseObj)(...___data);
___msg = "EXP the test data is now in the Global VerseObj.";
___srt = VerseObj.ndx === 222; // don't expect 222 anywhere else.
console.assert(___srt, ___msg);
//*****************************************************
//SO BUILD something that UPDATES All the Verses IN One VerseReadGrps group
//___data = GET_VerseReadGrpsArr()[2];  // HERE IS One VerseReadGrps group: fut.

___pipe = pipeline(  // test only. EMBEDS one of three VerseReadGrps in the test
    GET_VerseReadGrpsArr
    ,(a) => a[2]  //  filter to fut VerseReadGrps
    ,(col) => col.children  // FROM One VerseReadGrps TO >> Collection of verse elem
    ,Coll2Array
    ,f_map( C_Trace( (v) => v.innerHTML))
);

___data = GET_VerseReadGrpsArr()[2];  // the fut VersesReadGrp with 7 Verses
___cut = ___pipe ();
___ret = ___cut; // ISA array of div.vers
___srt = ( ___cut.length === 7 );
console.assert(___srt,`___cut = array of 7 vers`)
;

//*****************************************************
/**
 * THINKING
 * I'll only want to CEE the current ChapterReadGrps AND Current VerseReadGrps AND HIDE the pst and fut.
 * SO - the two div#id are constants.
 * I'll constantly BE READING: next || last verse // chptr
 * SO the data aspect is
 */

