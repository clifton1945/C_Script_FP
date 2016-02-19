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
//const childCnt = R.curry(R.prop('childElementCount'));  // USED IN tstREAD()

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
    col[toNdx].insertBefore(R.prop('lastElementChild', col[frmNdx]), R.prop('firstElementChild', col[toNdx]));
    return col
};
// TODO AFTER 1TAAT: COMPOSE all 4 XXX_to_YYY BY PASSING the Function.
const PST_to_CUR = R.partial(INSERT_LastChild, [PST, CUR]);
const CUR_to_FUT = R.partial(INSERT_LastChild, [CUR, FUT]);
const MOVE_Last = function MOVE_Last (col){
    //C_Both(FUT_to_CUR);
    //C_Both(CUR_to_PST);
    R.pipe(
        R.call(PST_to_CUR, col),
        R.call(CUR_to_FUT, col),
        C_GrpStateCnt('MOVE_Last', col)
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
        R.call(CUR_to_PST, col),
        C_GrpStateCnt('MOVE_Next', col)
    );
};
const READ_Next = R.when(CAN_READ(FUT),MOVE_Next);
// TESTS: