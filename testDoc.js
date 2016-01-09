/**
 * testDoc.js
 *   using new class names in testDoc.html
 * Created by CLIF on 1/9/2016.
 */


var ov;
let ___cut, ___srt, ___ret, ___msg, ___pipe, ___data;
___cut = GET_VerseReadArr (); // AGAIN invoke this with  ()
___srt = (
    ___cut.length === 3 &&
    isArray(___cut)
);
console.assert(___srt,`___cut = GET_VerseReadArr ();
___srt = (___cut.length === 3 &&
    isArray(___cut)
`);

/**
 * SELECT_vGrpStyleObj: a function TO SELECT A verse Group's _vGrpStyleObj
 */
___data = GET_VerseReadArr()[2];  //TEST DATA >> v Grp div.fut
// BUILD away
___ret = SELECT_vGrpStyleObj(___data)(StyleObj);
___msg = "CONFIRM this is THE futStyleObj.";
___srt = ___ret.name === 'fut' && ___ret.smlWt === 0.5;
console.assert(___srt, ___msg); // true
// OK, I can EXTRACT the style settings FOR A verseGrp FROM global StyleObj
//*****************************************************
