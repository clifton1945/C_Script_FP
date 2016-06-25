/**
 *  classByIndex_tests.js
 *  160625 triageByIndex_tests
 *      @1604 -> ADDED, STABLE, TEST _this_clssCSD = (gdict) => (rngdict) => R.compose( _clssCSD(gdict),
 triageByIndex(rngdict));// N:ndx -> D;this verse rClss csd
 *      @1255 -> triageByIndex() -> STABLE & TESTED
 *      @0956 -> isPst, isCur, isFut -> STABLE & TESTED
 *      @0736 -> SWITCH TO THE THREE ltBeg, gtEnd, tweenBegEnd events.
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
var isPst = (dict) => ltBeg(dict); //: D:N:i -> Bool
var isFut = (dict) => gtEnd(dict); //: N:i -> Bool
var isCur = (dict) => tweenBegEnd(dict);
/**
 *      triageByIndex:: D:curRnge -> N:i -> S:rClss name
 *
 * @param rngD
 * @param i
 */
var triageByIndex = R.curry((rngD, i) =>
    ltBeg(rngD)(i) ? 'pst' :
        gtEnd(rngD)(i) ? 'fut' :
            tweenBegEnd(rngD)(i) ? 'cur' :
                'hey, triageByIndex() is broken.');
/**
 *      -------------------------- INVOKE and TESTS
 */
myBaseCSD_tests();
// triageByIndex_tests();
// isPst_isCur_isFut_tests();
// var REStylED_trgts = _RESTYLE_all_trgtEs(NL);

function myBaseCSD_tests() {
    // 1. WANT Something like N:i -> S:rClssName
    // WANT the opposite of R. apply, .when, .unless, ifElse WHICH are use one predicate over many obj
    // how about R.apply
    // 2. WANT Something like S:rClssName -> ????  -> fn:(el, ndx, col)-> D: of rClss stuff
    var NUM, _CUT, RET, EXP, MSG, TST;
    MSG = ` mBCSD_t -> `;
    // var stubList = [0, 1, 2, 3, 4, 5, 6];// pretend these are verse INDEXES
    var stubVerses = curChptrVersesNL;
    var stub_curRngeD = {beg: 4, end: 5};
    var stub_glblCSD = {fut: {backgroundColor: "green"}, cur: {}, pst: {backgroundColor: 'pink'}};
    // CUT HELPERS
    // var isPst = ltBeg(stub_curRngeD); //: N:i -> Bool
    // var isFut = gtEnd(stub_curRngeD); //: N:i -> Bool
    // var isCur = tweenBegEnd(stub_curRngeD);
    // CUT
    var _clssCSD = (dict) => R.prop(R.__, dict);// D:glblCSD -> S:csdName -> CSD:namedCSD
    // TESTS:
    MSG += ` #1:pst.backgroundColor `;
    TST = _clssCSD(stub_glblCSD)('pst');
    assert('pink', TST.backgroundColor, MSG);
    MSG += ` #2:cur.backgroundColor->undefined `;
    TST = _clssCSD(stub_glblCSD)('cur');
    assert(undefined, TST.backgroundColor, MSG);

    /**
     *      _this_clssCSD:: D:glblDict -> D:curRngeDict -> N:rClssNdx -> D:rClssCSD
     */
    var _this_clssCSD = (gdict) => (rngdict) => R.compose(// NOTE es6 style
        _clssCSD(gdict),
        triageByIndex(rngdict));// N:ndx -> D;this verse rClss csd
    //TESTS
    MSG += ` #3:_this_clssCSD(3) `;
    TST = _this_clssCSD(stub_glblCSD)(stub_curRngeD)(6);// 6-> fut -> backgroundColor:green.
    assert('green', TST.backgroundColor, MSG);

// final Msg
    MSG += `
    myBaseCSD_tests~classByIndex_tests. DONE`;
    C_Both(MSG);
}
function triageByIndex_tests() {
    // TESTS basic only. No edge tests
    var NUM, _CUT, RET, EXP, MSG, TST;
    MSG = ` cBI_t -> `;
    var stubList = [0, 1, 2, 3, 4, 5, 6];// pretend these are verse INDEXES
    var stubVerses = curChptrVersesNL;
    var stub_curRngeD = {beg: 4, end: 5};
    // CUT HELPERS
    var isPst = ltBeg(stub_curRngeD); //: N:i -> Bool
    var isFut = gtEnd(stub_curRngeD); //: N:i -> Bool
    var isCur = tweenBegEnd(stub_curRngeD);
    // CUT

    // TESTS
    MSG += ` #1:i:0,1,2,3,33 `;
    TST = {beg: 1, end: 2};
    assert('pst', triageByIndex(TST)(0), MSG);
    assert('cur', triageByIndex(TST)(1), MSG);
    assert('cur', triageByIndex(TST)(2), MSG);
    assert('fut', triageByIndex(TST)(3), MSG);
    assert('fut', triageByIndex(TST)(333), MSG);


// final Msg
    MSG += `
    triageByIndex~classByIndex_tests. DONE`;
    C_Both(MSG);
}
function isPst_isCur_isFut_tests() {
    var NUM, _CUT, RET, EXP, MSG, TST;
    MSG = ` cBI_t -> `;
    var stubList = [0, 1, 2, 3, 4, 5, 6];// pretend these are verse INDEXES
    var stubVerses = curChptrVersesNL;
    var stub_curRngeD = {beg: 4, end: 5};
    // CUT
    // var isPst = (dict) => ltBeg(dict); //: D:N:i -> Bool
    // var isFut = (dict) => gtEnd(dict); //: N:i -> Bool
    // var isCur = (dict) => tweenBegEnd(dict);
    // TESTS
    MSG += ` #1:isPst, `;
    TST = R.map(i => isPst(stub_curRngeD)(i))([3, 4, 5, 6]);//-> [true, false, false]
    assert([true, false, false, false], TST, MSG);
    MSG += ` #2:isCur, `;
    TST = R.map(i => isCur(stub_curRngeD)(i))([3, 4, 5, 6]);//-> [false, false, true]
    assert([false, true, true, false], TST, MSG);

    MSG += ` #3:isFut, `;
    TST = R.map(i => isFut(stub_curRngeD)(i))([3, 4, 5, 6]);//-> [false, false, true]
    assert([false, false, false, true], TST, MSG);

// final Msg
    MSG += `
    isPst_isCur_isFut_tests~classByIndex_tests.DONE`;
    C_Both(MSG);
}