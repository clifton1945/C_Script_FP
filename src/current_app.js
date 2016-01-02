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

var _cut, _exp, _ret, _msg, _fn;
// PLAN
let VerseGrpsCollStr = '#curChptrGrp .verseGrps > div';
let VerseGrpsColl = document.querySelectorAll(VerseGrpsCollStr);
// CodeUnderTest - CUT:   DO( CONVERT NodeList TO Array)
let VerseGrpsArr = DO((collection) => [...collection])(VerseGrpsColl);

// CUT NOW USE THE SHELL OF update_aVerseGrpStyle FLESH IT OUT.
_fn = REST_this;

// CUT mapW_arr( do something to each element )
_ret = mapW_arr(VerseGrpsArr)(_fn);
// Test
_msg = `EXP 3 VerseGrpObj: [{pst}, {cur}, {fut}`;
_exp = (_ret[0][0].getAttribute('class') === 'pst' ) ;
console.assert(_exp, _msg);// PASSED

C_It("current_app.#01>> " + _ret);

// CUT
//mapWith(VerseGrpsArr)(update_aVerseGrpStyle);
//      update_aVerseGrpStyle = ( verseGrpEl) => {
//      aVerseGrpObj = REST_this(ChptrGrp)                //>> aVerseGrpObj
//      extract_grpNameFrom( aVerseGrpObj)                  //>> vgName
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