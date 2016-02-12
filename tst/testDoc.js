"use strict";

let C_Cut, C_Ret, C_Msg;
// CUT: CodeUnderTest ****************************
const book = document.querySelector('.book');
const C_Grp_Tmpl = '.ChptrReadGrps > div';
const V_Grp_Tmpl = '.VerseReadGrps > div';
// the two _Grp_NL WILL NEED TO BE REQUERIED EACH ReadEvent.
// AND PASSED TO the appropriate READ_Last() || READ_First()
// CodeUnderTest: NodeListObject
const C_Grp_NL = book.querySelectorAll(C_Grp_Tmpl); // NL:: 3 div.classes: pst, cur, fut
const PST = Symbol();
const CUR = Symbol();
const FUT = Symbol();
C_Grp_NL[PST] = C_Grp_NL[0];
C_Grp_NL[CUR] = C_Grp_NL[1];
C_Grp_NL[FUT] = C_Grp_NL[2];
// FUNCTIONS

const GET_childCount = (SYM) => R.prop('childElementCount',C_Grp_NL[SYM]);
const GET_firstChild = (SYM) => R.prop('firstElementChild',C_Grp_NL[SYM]);
const GET_lastChild = (SYM) => R.prop('lastElementChild',C_Grp_NL[SYM]);

/**
 * TESTS READ_...(querySelectorAll_Tmpl) -> ModifiedDOM {
    transform:: str -> NLO;
    READ_Next::
    maybe:: CAN_READ(frm: fut) (
        READ_1_Grp (to: cur, frm: fut);
        READ_1_Grp (to: pst, frm: cur);
    }
 */
C_Msg = "tst:READ_ Grp Next && Last:\n";
//TESTS GET_Grp_NLO:: Str -> NodeList obj
const GET_className = (SYM) => R.prop('className',C_Grp_NL[SYM]);
C_Msg += ` EXP:pst===${GET_className(PST)}, \n`;
C_Msg += ` EXP:cur===${GET_className(CUR)}, \n`;
C_Msg += ` EXP:fut===${GET_className(FUT)}`;
C_Both(C_Msg);
// WRAP UP TESTS: GET_Grp_NLO
let tst = GET_className(PST)==='pst' && GET_className(CUR)==='cur' && GET_className(FUT)==='fut';
console.assert(tst);
// TESTS: READ_Next

// SHORTEN TESTING W/O THESE
SET_All_Verse_Styles (StyleObj);
BindHandlers(book);