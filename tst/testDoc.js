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
var CUT = C_Grp_NL;
var C_Grp_O = {"pst":{}, "cur":{}, "fut":{}};



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
C_Msg += ` EXP:pst===${CUT[0].className}, \n`;
C_Msg += ` EXP:cur===${CUT[1].className}, \n`;
C_Msg += ` EXP:fut===${CUT[2].className}`;
C_Both(C_Msg);
// WRAP UP TESTS: GET_Grp_NLO
let tst = CUT[0].className==='pst' && CUT[1].className==='cur' && CUT[2].className==='fut';
console.assert(tst);
// TESTS

// SHORTEN TESTING W/O THESE
SET_All_Verse_Styles (StyleObj);
BindHandlers(book);