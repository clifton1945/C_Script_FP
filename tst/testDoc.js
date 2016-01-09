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
// I'll assume I'll always want to CEE  and MODIFY just the verses IN the curChptrRead div.
// AND that the style of the verses will vary as fn(VerseRead group) AND (the current VersObject)
//

// first encompass the verses associated just with curChptr and its three VerseReads.
/**
 * simple test of GET_VerseReadArr(): when invoked with just () returns >> a value: VerseReadArr
 */
___cut = GET_VerseReadArr (); // AGAIN invoke this with  ()
___srt = (
    ___cut.length === 3 &&
    isArray(___cut)
);
console.assert(___srt,`___cut = GET_VerseReadArr ();
___srt = (___cut.length === 3 &&
    isArray(___cut)
`);
//*****************************************************
// 2nd
/**
 * simple test of SELECT_VerseRead_StyleObj fn( data)(StyleObj)
 * : a function TO SELECT the current VerseRead StyleObj
 */
// the style needs to know WHICH VerseRead
___data = GET_VerseReadArr()[2];  //TEST DATA >> v Grp div.fut
___cut = SELECT_VerseRead_StyleObj(___data)(StyleObj);  // >> returns a  Value: curStyleObj subset.
___msg = "CONFIRM this is THE futStyleObj.";
___srt = ___cut.name === 'fut' && ___cut.smlWt === 0.5;
console.assert(___srt, ___msg); // true
// OK, I can EXTRACT the specific FROM global StyleObj FOR a specific VerseRead element.


//*****************************************************
// Next - thinking out loud- I need to UPDATE_VerseObj USING( current_Style value)  and (current_Verse).
// DO OTAAT to get the brother of SELECT_VerseRead_StyleValue.
// FINALLY the UPDATE_vers_style can be called using it's calc_wt >> style str >> verse.setAttribute.style str.
//
//SO BUILD a vers Obj
___pipe = pipeline(
    (col) => col.children,  // one vGrp >> array of verseObjs for that group
    Coll2Arry,
    f_map (
        (val, ndx, ary) => {
            VerseObj.val = val;
            VerseObj.ndx = ndx;
            VerseObj.ary = ary;
            C_It(`TRACE: VerseObj.ndx:${VerseObj.ndx},.ary.length:${VerseObj.ary.length},
            innerHTML  ${VerseObj.val.innerHTML}`);
            return VerseObj
        }
    ) // >> each child - a verse - transformed to a VerseObj.
);
const UPDATE_VerObj = ___pipe;
___data = GET_VerseReadArr ();  // standalone. no arg needed
f_map( ___pipe)(___data);

