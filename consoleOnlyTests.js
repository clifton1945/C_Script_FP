/**
 * Code TO SET each Verse[<P>].style. Attrribute
 * as fn(verseGrpName)FROM a calculated weight(verse location)
 *
 * Created by CLIF on 1/1/2016.
 */
// ************** NOT CURRENT !! the Plan GIVEN the currentChptrGrp
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

/**
 * Created by CLIF on 12/8/2015.
 */
"use strict";
// for now these are GLOBAL vars.
var ov;

let ___cut, ___srt, ___ret, ___msg;
/**
 *GET_VerseGrpsArr:  slow series of Tests connfirming pipeline and  : GotIW!
 */
___cut = pipeline(  // get the hard coded nodelist
    () => '#curChptrGrp .verseGrps > div',
    (str) => document.querySelectorAll(str)
);
___msg = `ASSERT GET_VerseGrpsColl  IS NOT an Array.`;
___srt = !Array.isArray(___cut());  //NOTE the invoking ()
console.assert(___srt, ___msg);// PASSED

/**
 *  CUT: CodeUnderTest GET an Array of the 3 verseGroups in the current chapter.)
 */
let GET_VerseGrpsCollStr = () => '#curChptrGrp .verseGrps > div';
let GET_VerseGrpsColl = (str) => document.querySelectorAll(str);
//ADD  CONVERT2_VerseGrpsArr_FROM(VerseGrpsNL)
let CONVERT_NLtoARR = (nl) => [...nl];
// LETS name these assembled functions: GET_VerseGrpsArr
// and move it to functions.js
___cut = GET_VerseGrpsArr (); // NOTE ending () call.
___msg = `and CONFIRM VerseGrpsArr NOW IS an Array.`;
___srt = isArray(___cut);// NOTE the following () !!



//  NOW USE a pipeline() to assemble a  SELECT_vGrpStyleObj()()
// it will need to apply (vGrpName)(StyleObj)
console.assert(___srt, ___msg);// PASSED

// NEXT I'll need two objects *****************************
//    1. a group StyleObj subset
//    2. a group VerseObjlist.
//

/**
 * #1  BUILD a function TO SELECT this verse Group's  _vGrpStyleObj
 */
// *  I'll need a test v_Grp
var ___here_is_a_test_v_Grp = GET_VerseGrpsArr()[2];  // >> v Grp div.fut
// BUILD away
___cut = pipeline(
    (vGrp) => vGrp.className,
    (vGrpName) => (styleObj) => styleObj[vGrpName]
);
___ret = ___cut(___here_is_a_test_v_Grp);
___ret = ___ret(StyleObj);
// NOW make this into a fixed function in functions.js.
___ret = SELECT_vGrpStyleObj(___here_is_a_test_v_Grp)(StyleObj);
___msg = "CONFIRM this is THE futStyleObj.";
___srt = ___ret.name === 'fut' && ___ret.smlWt === 0.5;
console.assert(___srt, ___msg); // true
// OK, I can EXTRACT the style settings FOR this verseGrp FROM global StyleObj
//*****************************************************
/**
 * #2 >>  I need a GrpVersesNL >> ARR holding all the verses of 1 of 3 Groups: pst, cur, fut
 *  option A: just use a vGrp.querySelectorAll( ' > P')
 *  option B: vGrp.children
 * let's go with B:  no hit server.
 */
// first start with the collection of 3 verse Group divs
////  MAKE_vGrpVersesColl = GET_Children_FROM (vGrp) //
let data = GET_VerseGrpsArr ();  // standalone. no arg needed
//PIPELINE:
let pipe = pipeline(
    isArray,
    GET_Children_FROM,
    Coll2Arry,
    isArray
);
___ret = f_map(pipe)(data);  // >> produced a verses HTML Coll with TRACES.


// PUTTING MAKE_vGrp_VerseColl INTO functions.js
// OK I can produce a collection of verses for each verse Group:pst, cur, fut
// **************************************************
//NOW SWITCH TO MAP EACH Verse OFTHE VerseCollection

pipe = pipeline(
    GET_Children_FROM,  // vGrp >> vCollection
    (coll) => [...coll ],
    (val) => {  // C something
        C_It(
            `${val[0].parentElement.className} collection has ${val.length} verses.`
        );
        return val
    }
);
data = GET_VerseGrpsArr();  // will return vGrp

___cut = f_map(GET_Children_FROM)(data);  // todo UNDERLINE VERSION
___ret = f_map(
    (val ) => val
    )
    ([...___cut])
    ;
let tst = ___ret;
