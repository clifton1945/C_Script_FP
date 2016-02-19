"use strict";

let C_Cut, C_Ret, C_Msg;
const book = document.querySelector('.book');
const C_Grp_Tmpl = '.ChptrReadGrps > div';
const V_Grp_Tmpl = '.ChptrReadGrps  .VerseReadGrps > div';
const PST = 0;
const CUR = 1;
const FUT = 2;
var C_Grp_NL = book.querySelectorAll(C_Grp_Tmpl); // NL:: 3 div.classes: pst, cur, fut
var V_Grp_NL = book.querySelectorAll(V_Grp_Tmpl); // NL:: 3 div.classes: pst, cur, fut
const GET_V_Grp_NL = (book) =>  book.querySelectorAll(V_Grp_Tmpl);


var tstREAD_ = function tst(coll) {
    var cut, exp, ret, fn;
    var deltaCnt = R.curry(function deltaCnt(NDX, fn, coll) {
        var cC0 = Cnt(NDX, coll);
        fn(coll);
        var cC1 = Cnt(NDX, coll);
        //C_GrpStateCnt(coll);  // TRACER
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
    //test3 READ_Next Chprt 3:
    fn = READ_Next;
    ret = deltaCnt_PST(fn, coll);
    exp = 0;
    console.assert(ret === exp, 'tst:READ_Next\n    EXP: coll[PST].deltaChild_N[' + exp + '] NOT [' + ret + ']');
    //test4 READ_Last Chprt 2:
    fn = READ_Last;
    ret = deltaCnt_PST(fn, coll);
    exp = -1;
    console.assert(ret === exp, 'tst:READ_Last\n    EXP: coll[PST].deltaChild_N[' + exp + '] NOT [' + ret + ']');
    //test5 READ_Last Chptr 1;
    fn = READ_Last;
    ret = deltaCnt_PST(fn, coll);
    exp = -1;
    console.assert(ret === exp, 'tst:READ_Last\n    EXP: coll[PST].deltaChild_N[' + exp + '] NOT [' + ret + ']');
    //test6 READ_Last Chptr 1 None to read
    fn = READ_Last;
    ret = deltaCnt_PST(fn, coll);
    exp = 0;
    console.assert(ret === exp, 'tst:READ_Last\n    EXP: coll[PST].deltaChild_N[' + exp + '] NOT [' + ret + ']');
};
//tstREAD_(C_Grp_NL);
//tstREAD_(V_Grp_NL);  // NOTE this works. BUT the exp===0 fail IN Test 4 does not work for verses

// SHORTEN TESTING W/O THESE
//SET_All_Verse_Styles(StyleObj);
BindHandlers(book);