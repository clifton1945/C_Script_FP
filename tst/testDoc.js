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
// CODE UNDER TEST
const INSERT_LastChild = function INSERT_LastChild(frmNdx, toNdx, col) {
    // eg toNdx.insert (frmNdx.last..)INFRONT_OF(toNdx.first..)e.g pst>cur; cur>fut
    col[toNdx].insertBefore(R.prop('lastElementChild', col[frmNdx]), R.prop('firsElementChild', col[toNdx]));
    return col
};
const READ_Last = function READ_Last(col) {
    if (R.gte( childCnt(col[PST]), 1)
    ) {
        R.pipe(
            R.call(INSERT_LastChild, PST, CUR, col),
            R.call(INSERT_LastChild, CUR, FUT, col)
        )
    }
};
const APPEND_NextChild = function APPEND_NextChild(frmNdx, toNdx, col) {
    // frm>to  e.g. fut>cur; cur>pst
    // FP
    col[toNdx].appendChild(R.prop('firstElementChild', col[frmNdx]));
    return col
};
const READ_Next = function READ_Next(col) {
    if (R.gt(childCnt(col[FUT]), 0)) {
        R.pipe(
            R.call(APPEND_NextChild, FUT, CUR, col),
            R.call(APPEND_NextChild, CUR, PST, col)
        )
    }
};
// TESTS:
var C = C_Grp_NL;
var V = V_Grp_NL;
// TESTS:   READ_Next
var tstREAD_Next = function tst(coll) {
    var cut, exp, ret;
    var Cnt = (NDX, coll) => R.prop('childElementCount', coll[NDX]);
    var deltaCnt = (NDX, coll) => {
        var c0 = Cnt(NDX,coll);
        return c0
    };
    //READ_Next(coll);
    //READ_Next(coll);
    //READ_Next(coll);
    exp = 111;
    ret = deltaCnt(PST, coll);
    console.assert(ret === exp, `tst:READ_Next
    EXP:deltaChildCount[${exp}] NOT [${ret}]`);
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