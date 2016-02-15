"use strict";

let C_Cut, C_Ret, C_Msg;
// CUT: CodeUnderTest ****************************
const book = document.querySelector('.book');
const C_Grp_Tmpl = '.ChptrReadGrps > div';
const V_Grp_Tmpl = '.ChptrReadGrps > .cur .VerseReadGrps > div';
const C_Grp_NL = book.querySelectorAll(C_Grp_Tmpl); // NL:: 3 div.classes: pst, cur, fut
const V_Grp_NL = book.querySelectorAll(V_Grp_Tmpl); // NL:: 3 div.classes: pst, cur, fut
const PST = 0;
const CUR = 1;
const FUT = 2;
const childCnt = R.curry(R.prop('childElementCount'));

// CUT:     READ_LastChild
const INSERT_LastChild = function INSERT_LastChild(frmGrp, toGrp) {
    // eg toGrp.insert (frmGrp.last..)INFRONT_OF(toGrp.first..)e.g pst>cur; cur>fut
    toGrp.insertBefore(R.prop('lastElementChild', frmGrp), R.prop('firsElementChild', toGrp));
};
const READ_Last = function READ_Last(col) {
    const tapChildCnt = R.tap(function (col) {
        return console.log(
            `  READ_Next PST.Cnt:${childCnt(col[PST])}`);
    }, col);
    tapChildCnt;
    if (R.gte( childCnt(col[PST]), 1)
    ) {
        R.pipe(
            tapChildCnt,
            R.call(INSERT_LastChild, col[PST], col[CUR]),
            R.call(INSERT_LastChild, col[CUR], col[FUT])
        )
    }
};
const APPEND_NextChild = function APPEND_NextChild(frmGrp, toGrp) {
    // frm>to  e.g. fut>cur; cur>pst
    // FP
    toGrp.appendChild(R.prop('firstElementChild', frmGrp));
    //toGrp.appendChild(frmGrp.firstElementChild);
};
const READ_Next = function READ_Next(col) {
    const tapChildCnt = R.tap(function (col) {
        return console.log(
            `  READ_Next FUT.Cnt:${childCnt(col[FUT])}`);
    }, col);
    tapChildCnt;
    if (R.gt(childCnt(col[FUT]), 0)) {
        R.pipe(
            tapChildCnt,
            R.call(APPEND_NextChild, col[FUT], col[CUR]),
            R.call(APPEND_NextChild, col[CUR], col[PST])
        )
    }
};
// TESTS:
var C = C_Grp_NL;
// TESTS:   READ_Next
var tstREAD_Next = function tst(coll) {
    var Cnt = function Cnt(coll) {
            return coll[PST].childElementCount;
        },
        Cnt0,
        exp,
        ret;
    Cnt0 = Cnt(coll);
    READ_Next(coll);
    READ_Next(coll);
    READ_Next(coll);
    ret = Cnt(coll) - Cnt0;
    exp = 1;
    console.assert(ret === exp, `tst:READ_Next
        assert:col[PST] deltaCount: ${ret},  NOT ${exp}`);
};
tstREAD_Next(C);

/**
 * tstREAD_Last
 *   tst CAN READ_ an existing last verse
 *   tst gracefully does not read a non existant verse
 * @param tstColl
 */
var tstREAD_Last = function tst(tstColl) {
    var Cnt0,
        exp,
        cut,
        ret,
        C_Msg = "tst:READ_Last";
    cut = R.prop('childElementCount');
    READ_Last(tstColl);
    READ_Last(tstColl);
    READ_Last(tstColl);
    READ_Last(tstColl);
    READ_Last(tstColl);
    READ_Last(tstColl);
    //READ_Last(tstColl);
    ret = cut(tstColl[FUT]);
    exp = 1;
    console.assert(R.gte(ret, exp,
            `  ${C_Msg}:
        assert:ChptNL.coll[FUT]: ${ret} >= ${exp}`)
    );
};
tstREAD_Last(C);


// SHORTEN TESTING W/O THESE
SET_All_Verse_Styles(StyleObj);
BindHandlers(book);