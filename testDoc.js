/**
 * testDoc.js
 *   using new class names in testDoc.html
 * Created by CLIF on 1/9/2016.
 */


var ov;
let ___cut, ___srt, ___ret, ___msg, ___pipe, ___data;
___cut = GET_VerseGrpsArr (); // AGAIN invoke this with  ()
___srt = (
    ___cut.length === 3 &&
    isArray(___cut)
);
console.assert(___srt,`___cut = GET_VerseGrpsArr ();
___srt = (___cut.length === 3 &&
    isArray(___cut)
`);
