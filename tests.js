/**
 * Created by CLIF on 12/8/2015.
 */
"use strict";
// for now these are GLOBAL vars.
var ov;

//Code Under Test
const update_aVerseGrpStyle = ( verseGrpEl) => {

};

//TESTS
ov = "test2: set_VerseStyle() ON ALL curChapter verses ";
QUnit.test(ov, function (assert) {
    var cut, exp, ret, msg, x;
    // PLAN
    let VerseGrpsCollStr = '#curChptrGrp .verseGrps > div';
    let VerseGrpsColl = document.querySelectorAll(VerseGrpsCollStr);
    console.assert(!Array.isArray(VerseGrpsColl), "EXP VerseGrpsColl IS NOT an Array.");
    QUnit.ok("collect IS NOT array", function (assert) {
        assert.ok(!Array.isArray(VerseGrpsColl));
    });
    //let cut = DO((collection) => [...collection])(VerseGrpsColl);
    //mapWith(verseGrpsArr)(update_aVerseGrpStyle);
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
    //QUnit.expect(0);
    QUnit.ok("a test", function (assert) {
        assert.ok(true);
    })
});
const update_VerseStyleForThisGrp = (so) => (ver, ndx, arr) => {
    return set_VerseStyle(so)({ver, ndx, arr})
};
ov = "test1: set_VerseStyle() ON ALL .fut verses ";
QUnit.test(ov, function (assert) {
    QUnit.expect(0);
    var cut, exp, ret, msg;
    // BUILD REAL DATA
    let grp = document.querySelector('#curChptrGrp');
    let verseGrpsNL = grp.querySelectorAll('.verseGrps > div');
    let versesNL = grp.querySelectorAll('.verseGrps > .pst > P');
    //  USE REAL StyleObj
    let so = StyleObj.fut;
    // RUN tests map(vo)
    msg = "SEE all .fut verses styles";
    [...versesNL].map(update_VerseStyleForThisGrp(so));
    //[...versesNL].map(set_VerseStyle(so));
    //consIt(tst_vo.ver.outerHTML);
    QUnit.expect(0);
});


