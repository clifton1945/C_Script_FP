
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

/**
 * SELECT_vGrpStyleObj: a function TO SELECT A verse Group's _vGrpStyleObj
 */
___data = GET_VerseGrpsArr()[2];  //TEST DATA >> v Grp div.fut
// BUILD away
___ret = SELECT_vGrpStyleObj(___data)(StyleObj);
___msg = "CONFIRM this is THE futStyleObj.";
___srt = ___ret.name === 'fut' && ___ret.smlWt === 0.5;
console.assert(___srt, ___msg); // true
// OK, I can EXTRACT the style settings FOR A verseGrp FROM global StyleObj
//*****************************************************


/**
 * #2 >>  I need a GrpVersesNL >> ARR holding all the verses of each of 3 Groups: pst, cur, fut
 *  option A: just use a vGrp.querySelectorAll( ' > P')
 *  option B: vGrp.children
 * let's go with B:  no hit server.
 */
// PUTTING MAKE_vGrp_VerseColl INTO functions.js
// OK I can produce a collection of verses for each verse Group:pst, cur, fut
// **************************************************
//NOW SWITCH TO MAP EACH Verse OFTHE VerseCollection
// AND CALL this fn GET_VerseObjsArr
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
const GET_VerseObjsArr = ___pipe;
___data = GET_VerseGrpsArr ();  // standalone. no arg needed
f_map( ___pipe)(___data);
