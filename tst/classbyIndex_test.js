/**
 *  classByIndex_tests.js
 * 160623 built func: splitAtCur(begNdx)
 *  @0804:    STABLE: 3 tests   ADDED file classByIndex.js
 *      SplitAtCur:: (N:ndx) -> L:trgtList -> [[beforeINdex], [beginAtIndex]]
 *  @0555 use index in chapter instead of div.class
 */
"use strict";
/**
 *       --------------------------DATA:
 */

/**
 *      -------------------------- HELPERS for CodeUnderTest
 */

/**
 *      -------------------------- INVOKE and TEST
 */

var REStylED_trgts = _RESTYLE_all_trgtEs(NL);

testMe();
function testMe() {
    var MSG, _CUT, RET, EXP, TST;
    MSG = ` classByIndex_tests -> `;
    var stubList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];// pretend these are verse INDEXES
    var verseColl = cur_Chptr_rClss_NL[2].children;// 6 verse in rClss:fut
    var cur_Index = {beg: 3, end: 5};
    // tests
    /**
     *      SplitAtCur:: (N:ndx) -> L:trgtList -> [[beforeINdex], [beginAtIndex]]
     *
     * @param begNdx
     */
    var spltAtCur = (begNdx) => R.splitAt(begNdx);// NOTE; splits AT INDEX!!
    RET = spltAtCur(cur_Index.beg)(stubList);
    MSG += '#1, ';
    assert(3, R.head(RET[1]), 'EXP 2nd Ary head is stubList[3] ');

    RET = spltAtCur(cur_Index.beg)(verseColl);
    MSG += '#2, ';
    assert(3, R.indexOf(R.head(RET[1]))(verseColl), ' > EXP 2nd Ary head is verseColl[3]');
    MSG += '#3, ';
    assert('chptr:2 verse:7 ndx:6', RET[1][0].innerText, ' > EXP 2nd Ary head text is chptr:2 verse:7 ndx:6');
// final MSG
    MSG += `
    finished classByIndex_tests`;
    C_Both(MSG);
}
