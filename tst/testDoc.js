"use strict";

let C_Cut, C_Ret, C_Msg;
// CUT: CodeUnderTest ****************************
const book = document.querySelector('.book');
const C_Grp_Tmpl = '.ChptrReadGrps > div';
const V_Grp_Tmpl = '.ChptrReadGrps > .cur .VerseReadGrps > div';
const C_Grp_NL = book.querySelectorAll(C_Grp_Tmpl); // NL:: 3 div.classes: pst, cur, fut
const V_Grp_NL = book.querySelectorAll(V_Grp_Tmpl); // NL:: 3 div.classes: pst, cur, fut

// TODO  WILL the two _Grp_NL NEED TO BE REQUERIED EACH ReadEvent ??????
// AND PASSED TO the appropriate READ_Last() || READ_First()
// CodeUnderTest: NodeListObject
const PST = 0;
const CUR = 1;
const FUT = 2;
/**
 * TESTS READ_...(querySelectorAll_Tmpl) -> ModifiedDOM {
    transform:: str -> NLO;
    READ_Next::
    maybe:: CAN_READ(frm: fut) (
        READ_1_Grp (to: cur, frm: fut);
        READ_1_Grp (to: pst, frm: cur);
    }
 */
C_Msg = "tst:Grp NodeList \n";
//TESTS GET_Grp_NLO:: Str -> NodeList obj
const GET_className = (SYM) => R.prop('className',C_Grp_NL[SYM]);
C_Msg += ` EXP:pst===${GET_className(PST)}, \n`;
C_Msg += ` EXP:cur===${GET_className(CUR)}, \n`;
C_Msg += ` EXP:fut===${GET_className(FUT)}`;
C_Both(C_Msg);
// WRAP UP TESTS: GET_Grp_NLO
let tst = GET_className(PST)==='pst' && GET_className(CUR)==='cur' && GET_className(FUT)==='fut';
console.assert(tst);
//
// Functions
// TODO ADD TEST: CAN_READ_Next || CAN_READ_Last
//const CAN_MOVE = R.propSatisfies(GET_childCount(frmSYM);  // maybe use R.isEmpty:: a->Bool

// CUT:     READ_LastChild
//const CAN_MOVE = R.propSatisfies(GET_childCount(frmSYM);  // maybe use R.isEmpty:: a->Bool
const MOVE_LastChild = function MOVE_LastChild(frmGrp, toGrp) {
    // eg toGrp.insert (frmGrp.last..)INFRONT_OF(toGrp.first..)e.g pst>cur; cur>fut
    toGrp.insertBefore(R.prop('lastElementChild', frmGrp), R.prop('firsElementChild',toGrp));
};
const APPEND_NextChild = function APPEND_NextChild(frmGrp, toGrp) {
    // frm>to  e.g. fut>cur; cur>pst
    // FP
    toGrp.appendChild(R.prop('firstElementChild', frmGrp));
    //toGrp.appendChild(frmGrp.firstElementChild);
};
// TESTS:   READ_Next
C_Msg = "tst:READ_Last  \n";

// TESTS:   READ_Next
var G = V_Grp_NL;
C_Msg = "tst:READ_Last  \n";
C_Msg += '  EXP:curCount:' + G[CUR].childElementCount + '=== 1, \n';
APPEND_NextChild(G[FUT], G[CUR]);
C_Msg += '  EXP:curCount:' + G[CUR].childElementCount + '=== 2, \n';
APPEND_NextChild(G[CUR], G[PST]);
C_Msg += '  EXP:curCount:' + G[CUR].childElementCount + '=== 1, \n';
C_Both(C_Msg);
APPEND_NextChild(G[FUT], G[CUR]);
APPEND_NextChild(G[CUR], G[PST]);
MOVE_LastChild(G[CUR], G[FUT]);
MOVE_LastChild(G[PST], G[CUR]);
MOVE_LastChild(G[CUR], G[FUT]);
MOVE_LastChild(G[PST], G[CUR]);

//


// SHORTEN TESTING W/O THESE
SET_All_Verse_Styles (StyleObj);
BindHandlers(book);