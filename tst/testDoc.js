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
    if (R.gte(childCnt(col[PST]), 1)
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
//      TESTING NEW READ_Next
//const CAN_READ = R.propSatisfies(R.gt(R.__, 0), 'length'); // coll -> Bool
const MOVE_ = function MOVE_ (col) {  //
    R.pipe(
        R.call(APPEND_NextChild, FUT, CUR, col),
        R.call(APPEND_NextChild, CUR, PST, col)
    )
};
//
const CAN_READ = function CAN_READ (NDX, col) {
    return R.gt(
        R.prop(
            'childElementCount', col[NDX]
        ), 0
    )
}; // coll -> Bool
const curryCAN_READ = R.curry(CAN_READ);
//C_Ret = curreyCAN_READ(FUT, C_Grp_NL);

const TST_READ_Next = R.when(curryCAN_READ(FUT),MOVE_);
//C_Ret = TST_READ_Next(C_Grp_NL);


// TESTS:
// TESTS:   READ_Next
var tstREAD_ = function tst(coll) {
    var cut, exp, ret, fn;
    var Cnt = R.curry(function (NDX, coll) {
        return R.prop('childElementCount', coll[NDX]);
    });
    var deltaCnt = R.curry(function deltaCnt(NDX, fn, coll) {
        var childCnt = Cnt(NDX);
        var cC0 = childCnt(coll);
        fn(coll);
        var cC1 = childCnt(coll);
        return cC1 - cC0;
    });
    var deltaCnt_PST = deltaCnt(PST);
    // ********** TESTS ****************
    //test1: NO CHANGE TO COLLCTION
    fn = c => c;
    ret = deltaCnt_PST(fn, coll);
    exp = 0;
    console.assert(ret === exp, 'tst:READ_Next\n    EXP:deltaChildCount[' + exp + '] NOT [' + ret + ']');
    //test2 READ_Next
    fn = READ_Next;
    ret = deltaCnt_PST(fn, coll);
    exp = 1;
    console.assert(ret === exp, 'tst:READ_Next\n    EXP:deltaChildCount[' + exp + '] NOT [' + ret + ']');
    //test3 READ_Next AGAIN
    fn = READ_Next;
    ret = deltaCnt_PST(fn, coll);
    exp = 0;
    console.assert(ret === exp, 'tst:READ_Next\n    EXP:deltaChildCount[' + exp + '] NOT [' + ret + ']');
    //test3 READ_Last
    fn = READ_Last;
    ret = deltaCnt_PST(fn, coll);
    exp = -1;
    console.assert(ret === exp, 'tst:READ_Last\n    EXP:deltaChildCount[' + exp + '] NOT [' + ret + ']');
};
tstREAD_(C_Grp_NL);  // todo TEST CRIPPLED

// SHORTEN TESTING W/O THESE
SET_All_Verse_Styles(StyleObj);
//BindHandlers(book);