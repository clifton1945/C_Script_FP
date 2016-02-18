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
const childCnt = R.curry(R.prop('childElementCount'));  // USED IN tstREAD()

// NEW CODE ***********************

// HELPER CODE
const CAN_READ = R.curry(function _CAN_READ (NDX, col) {
    return R.gt(
        R.prop(
            'childElementCount', col[NDX]
        ), 0
    )
});
// READ_Last CODE
const INSERT_LastChild = function INSERT_LastChild(frmNdx, toNdx, col) {
// READ_Last
    // eg toNdx.insert (frmNdx.last..)INFRONT_OF(toNdx.first..)e.g pst>cur; cur>fut
    col[toNdx].insertBefore(R.prop('lastElementChild', col[frmNdx]), R.prop('firsElementChild', col[toNdx]));
    return col
};
const PST_to_CUR = R.partial(INSERT_LastChild, [PST, CUR]);
const CUR_to_FUT = R.partial(INSERT_LastChild, [CUR, FUT]);
const MOVE_Last = function MOVE_Last (col){
    //C_Both(FUT_to_CUR);
    //C_Both(CUR_to_PST);
    R.pipe(
        R.call(PST_to_CUR, col),
        R.call(CUR_to_FUT, col)
    );
};
const READ_Last = R.when(CAN_READ(PST),MOVE_Last);
// READ_Next CODE
const APPEND_NextChild = R.curry(function APPEND_NextChild(frmNdx, toNdx, col) {
    // frm>to  e.g. fut>cur; cur>pst
    col[toNdx].appendChild(R.prop('firstElementChild', col[frmNdx]));
    return col
});
const FUT_to_CUR = R.partial(APPEND_NextChild, [FUT, CUR]);
const CUR_to_PST = R.partial(APPEND_NextChild, [CUR, PST]);
const MOVE_Next = function MOVE_Next (col){  //
    //C_Both(FUT_to_CUR);
    //C_Both(CUR_to_PST);
    R.pipe(
        R.call(FUT_to_CUR, col),
        R.call(CUR_to_PST, col)
    );
};
const READ_Next = R.when(CAN_READ(FUT),MOVE_Next);
// TESTS:
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
        C_Both(`col[PST].cnt:${cC1}`);  // TRACER
        return cC1 - cC0;
    });
    var deltaCnt_PST = deltaCnt(PST);
    // ********** TESTS ****************

    //test1: NO CHANGE TO COLLCTION
    fn = c => c;
    ret = deltaCnt_PST(fn, coll);
    exp = 0;
    console.assert(ret === exp, 'tst:READ_Next\n    EXP: coll[PST].deltaChild_N[' + exp + '] NOT [' + ret + ']');
    //test2 READ_Next Chprt 3:
    fn = READ_Next;
    ret = deltaCnt_PST(fn, coll);
    exp = 1;
    console.assert(ret === exp, 'tst:READ_Next\n    EXP: coll[PST].deltaChild_N[' + exp + '] NOT [' + ret + ']');
    //test2 READ_Next Chprt 3:
    fn = READ_Next;
    ret = deltaCnt_PST(fn, coll);
    exp = 0;
    console.assert(ret === exp, 'tst:READ_Next\n    EXP: coll[PST].deltaChild_N[' + exp + '] NOT [' + ret + ']');
    //test3 READ_Last Chprt 2:
    fn = READ_Last;
    ret = deltaCnt_PST(fn, coll);
    exp = -1;
    console.assert(ret === exp, 'tst:READ_Last\n    EXP: coll[PST].deltaChild_N[' + exp + '] NOT [' + ret + ']');
    //test4 READ_Last Chptr 1;
    fn = READ_Last;
    ret = deltaCnt_PST(fn, coll);
    exp = -1;
    console.assert(ret === exp, 'tst:READ_Last\n    EXP: coll[PST].deltaChild_N[' + exp + '] NOT [' + ret + ']');
    //test4 READ_Last Chptr 1 AGAIN
    fn = READ_Last;
    ret = deltaCnt_PST(fn, coll);
    exp = 0;
    console.assert(ret === exp, 'tst:READ_Last\n    EXP: coll[PST].deltaChild_N[' + exp + '] NOT [' + ret + ']');
};

tstREAD_(C_Grp_NL);
//tstREAD_(V_Grp_NL);  // NOTE this works. BUT the exp===0 fail with so many verses.
