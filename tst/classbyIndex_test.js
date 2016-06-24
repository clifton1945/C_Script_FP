/**
 *  classByIndex_tests.js
 *  160624  use splitAtCur() to construct _pstNL, _curNL, _futNL
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

/**
 *      -------------------------- INVOKE and TEST
 */

var REStylED_trgts = _RESTYLE_all_trgtEs(NL);

testMe();
function testMe() {
    var NUM, _CUT, RET, EXP, MSG, TST;
    NUM = ` cBI_t -> `;
    var stubList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];// pretend these are verse INDEXES
    var stubVerses = curChptrVersesNL;
    // CUT
    var _rClssNL = (beg) => R.compose(R.head, R.splitAt(beg));// NOTE; splits ARE INDEXES!!
    var stub_curRange = {beg: 2, end: 3};
    var _pstNL = _rClssNL(stub_curRange.beg);// NOTE; splits ON INDEXES!!

    // tests

    RET = _rClssNL(2)(stubList);
    NUM += '#1, ';
    MSG = '  >> [0,1] from _rClssNL(stubList)';
    assert([0, 1], RET, MSG);

    NUM += '#2 ';
    RET = _pstNL(stubVerses);
    TST = R.compose(R.prop('innerText'), R.last)(RET);
    EXP = stubVerses[1].innerText;
    MSG = ' >> index:2 from _pstNL(stubVerses)';
    assert(EXP, TST, '\n' + NUM + MSG);

// final NUM
    NUM += `
    finished classByIndex_tests`;
    C_Both(NUM);
}
