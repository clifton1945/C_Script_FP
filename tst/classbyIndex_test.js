/**
 *  classByIndex_tests.js
 *  160625
 *      @0956 -> STABLE & TESTED: isPst, isCur, isFut
 *      @0736 -> SWITCH TO THE THREE isPst, isCur, isFut events.
 *      Then invoke the Siblings, wtER, evolveCsd
 *  160624  use splitAtCur() to construct _pstNL, _curNL, _futNL
 *      @1633 ADDED these tests to simpleTests.html
 *      @0930 WIP _pstNL 2 test STABLE
 *
 */
"use strict";
/**
 *       --------------------------DATA:
 */
/**
 *      aChptrVersesNL:: -> L:all verse elements
 *      for use in extracting rClass Lists
 */
var curChptrVersesNL = document.querySelectorAll('#curChptrVerses .vers');
/**
 *      -------------------------- CodeUnderTest and HELPERS
 */
var ltBeg = (dict)=>(i)=> R.lt(i, dict.beg);//D -> N -> Bool
var gtEnd = (dict)=>(i)=> R.gt(i, dict.end);//D -> N -> Bool
var tweenBegEnd = (dict)=>(i)=> R.gte(i, dict.beg) && R.lte(i, dict.end);//D -> N -> Bool
/**
 *      -------------------------- INVOKE and TEST
 */
var REStylED_trgts = _RESTYLE_all_trgtEs(NL);

testMe();
function testMe() {
    var NUM, _CUT, RET, EXP, MSG, TST;
    MSG = ` cBI_t -> `;
    var stubList = [0, 1, 2, 3, 4, 5, 6];// pretend these are verse INDEXES
    var stubVerses = curChptrVersesNL;
    var stub_curRngeD = {beg: 4, end: 5};
    // CUT
    var isPst = ltBeg(stub_curRngeD); //: N:i -> Bool
    var isFut = gtEnd(stub_curRngeD); //: N:i -> Bool
    var isCur = tweenBegEnd(stub_curRngeD);
    // TESTS
    MSG += ` #1:isPst, `;
    TST = R.map(i => isPst(i))([3, 4, 5, 6]);//-> [true, false, false]
    assert([true, false, false, false], TST, MSG);
    MSG += ` #2:isCur, `;
    TST = R.map(i => isCur(i))([3, 4, 5, 6]);//-> [false, false, true]
    assert([false, true, true, false], TST, MSG);

    MSG += ` #3:isFut, `;
    TST = R.map(i => isFut(i))([3, 4, 5, 6]);//-> [false, false, true]
    assert([false, false, false, true], TST, MSG);

// final Msg
    MSG += `
    finished classByIndex_tests`;
    C_Both(MSG);
}
