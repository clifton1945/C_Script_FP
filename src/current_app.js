/**
 * Created by CLIF on 1/1/2016.
 */
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

var _cut, _exp, _ret, _msg;
// PLAN
let VerseGrpsCollStr = '#curChptrGrp .verseGrps > div';
let VerseGrpsColl = document.querySelectorAll(VerseGrpsCollStr);
// CodeUnderTest - CUT:   DO( CONVERT NodeList TO Array)
let VerseGrpsArr = DO((collection) => [...collection])(VerseGrpsColl);
// CUT NOW USE THE SHELL OF update_aVerseGrpStyle FLESH IT OUT.
const update_aVerseGrpStyle = (c,n,a) => {
    console.log(a[n].getAttribute('class'));
    return c.getAttribute("class")
};

// CUT mapW_arr( do something to each element )
_ret = mapW_arr(VerseGrpsArr)(update_aVerseGrpStyle);
// Test
_msg = `EXP arr of just chapter verseGrp names`;
_exp = (_ret[0] === 'pst' && _ret[2] == 'fut') ;
C_It("current_app.#01>> " + _ret);

// CUT
//mapWith(VerseGrpsArr)(update_aVerseGrpStyle);
//      update_aVerseGrpStyle = ( verseGrpEl) => {
//      extract_grpNameFrom( VerseGrpEl)                  //>> vgName
//      set_styleObjForThis( vgName)                      //>> styleObj
//      get_verseElemColl( verseGrpEl)                    // verseElemColl
//      MapWith( VerseElemColl,
//          update_aVerseStyle) =
//              ( aVerse) =>
//                  set_verseObjForThis( verseElem) =>      //>> verseObj
//                  set_styleStrFor(styleObj, verseObj)     //>> styleStr
//                      set_verseStyle(verse,styleStr)      // NO return; DOM modified
//}
//const update_VerseStyleForThisGrp = (so) => (ver, ndx, arr) => {
//    return set_VerseStyle(so)({ver, ndx, arr})
//};