/**
 *  simpleTests.js
 * 160621
 * @0635 WORKING STABLE
 *  first REFACT weighting
 *      STABLE BUT NOT GIT WIP BEGAN using new weighting
 *      CREATED  wtFunc_pst AND wtFunc_fut FROM wt_factor IN * transformers_tests.js
 *  second REFACT to eliminate the rClass divs
 * 160620
 * # 1408 USING transformers_test.js functions:  _transform_CSD() AND wtFunc_pst()
 * 160617  simpleTests.js:: STABLE
 * @0823 STABLE with both N:opacity and S:fontSize csd s.
 *      whenStr_parseFloat() AND _get_Dict_Valu()
 * @0658 WIP CUT= _get_Dict_Valu IN _set_trgtCSD
 * REFACT    _RESTYLE_all_trgtEs()
 */
"use strict";
/**
 *       --------------------------DATA:
 */
/**
 *      cur_Chptr_rClss_NL:: L:[E,E,E]
 *      a nodeList of rClass Elements: NL: pst, cur, fut
 */
const NL = cur_Chptr_rClss_NL;
/**
 *      CssStylDecl_Dict:: D:{{},{},{}}
 * @type {{fut: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}, cur: {fontSize: string, opacity: number, textAlign: string}, pst: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}}}
 */
const CssStylDecl_Dict = { //
    fut: {
        stepSize: -0.750,
        fontSize: "45%",
        opacity: '0.45',
        textAlign: "left",
        backgroundColor: "rgba(145, 248, 29, 0.29)"
    },
    cur: {
        stepSize: 0, // start gig  stay big
        fontSize: "100%",
        opacity: '1.0',
        textAlign: "center",
        // backgroundColor: "rgba(255, 0, 0, 0.24)"
    },
    pst: {
        stepSize: 0.25,
        fontSize: "60%",
        opacity: '0.4',
        textAlign: "left",
        backgroundColor: "rgba(255, 0, 0, 0.24)"
    }
};
/**
 *      CSD+D :: ShortCut -> CssStylDecl_Dict
 */
let CSD_D = CssStylDecl_Dict; // -> D:csd

/**
 *      --------------------------HELPERS for _RESTYLE_trgts
 */
const whenStr_parseFloat = R.when(R.is(String), parseFloat);

/**
 *      _get_Dict_Valu: S:key -> D:{k,v} -> N:v
 *      R.lensProp::    Str -> Lens s a
 *      R.view::        Lens s a -> s -> a
 *      parseFloat::    Str | Num -> N
 */
const _get_Dict_Valu = R.compose(whenStr_parseFloat, R.view, R.lensProp);

// ------------------------------- Tests
assert(50, whenStr_parseFloat('50%'), ' whenStr_parseFloat()');
assert(50, whenStr_parseFloat('50'), ' whenStr_parseFloat()');
assert(90, whenStr_parseFloat(_get_Dict_Valu('fontSize')({fontSize: '90%'})), '_get_Dict_Valu');
assert(-0.75, _get_Dict_Valu('stepSize')({stepSize: -0.75}), '_get_Dict_Valu');
assert(0.9001, _get_Dict_Valu('opacity')({opacity: 0.9001}), '_get_Dict_Valu');

/**
 *      _get_clss_CSD:: (E:clssElem) -> D:clssCSD
 *  extracts the class style Dict -fut,cur,pst- from the class Element,
 *  NOTE: the base css style declaration dictionary, CSD_D, is hard coded in.
 */
const _get_clss_CSD = R.compose(R.flip(R.prop)(CSD_D), R.prop('className'));

const _set_trgtElem = R.curry(
    /**
     *      _set_trgtStyles: CSD D -> E: trgt -> mutated E:trgt
     * @param csd
     * @param e_trgt
     */
    (csd, e_trgt)=> Object.assign(e_trgt.style, csd)
);

/**
 *       _rClss_Chldren:: clssE -> L:[trgtE, trgtE, ...]
 *      an rClss Element:e -> a list of its verse elements.
 *      This is the target list of Verse Elements to mutate
 *
 */
const _rClss_Chldren = R.prop("children");// clssE -> L:[e, e,..]

/**
 *       _RESTYLE_trgtEs: L:nodeList ->  L:nodeList
 *      all Elements in all rClasses are RESTYLED =f(trgt)
 *
 */
const _RESTYLE_all_trgtEs = R.map(
    (clssE) => {
        var base = _get_clss_CSD(clssE);// E -> CSD
        var wt_factor = wtFunc_pst;
        return R.addIndex(R.map)(
            (trgtE, ndx, col)=> {
                var trgt = _transform_CSD(base, wt_factor(ndx, col));// (CSD, N)-> CSD THIS IS THE WORKER FUNCTION !!!
                return _set_trgtElem(trgt, trgtE);
            },
            _rClss_Chldren(clssE)
        )
    }
);
/**
 *      ---------------------------- INVOKE and TEST
 */

var REStylED_trgts = _RESTYLE_all_trgtEs(NL);

// var fut1 = REStylED_trgts[1];// ->[csd, csd ...]
// var fut2 = R.map(R.props(['fontSize', 'opacity']))(fut1);
// C_Both(cee(fut));
// C_Both('vals  are: ' + JSON.stringify(R.values(fut2)));

function testMe() {
    var MSG = '', CUT, _CUT, RET, EXP, TST, tNum = 0;
    var trgt;

// //tests  _RESTYLE_trgts
//     tNum = 4;
//     CUT = _RESTYLE_all_trgtEs(NL); // INVOKED
//     trgt = document.querySelector('div #tst1');
//     RET = trgt.style.textAlign;
//     assert('right', RET, tNum);

// tests  _rClss_Chldren
    tNum = 3;
    CUT = _rClss_Chldren;
    const stub_rclssElem = document.querySelector('div #cur_VerseReadGrp');//
    RET = CUT(stub_rclssElem);// -> HTMLCollection[2]
    assert(1, RET.length, tNum);

// //tests  __base_rClss_CSD
//     tNum = 2;
//     CUT = _get_clss_CSD;
//     var test_CSDs = R.map(CUT);//  L:nl -> [[D:d, D:d, D:d]]
//     RET = test_CSDs(NL);//  ->  [[D:d, D:d, D:d]]
//     assert("60%", RET[0].fontSize, tNum);
//     assert("90%", RET[2].fontSize, tNum);
//
// // test   cur_Chptr_rClss_NL
//     tNum = 1;
//     // var nl = cur_Chptr_rClss_NL;
//     assert('fut', NL[2].className, tNum);
//     assert(6, NL[2].childElementCount, tNum);

// final MSG
    MSG = 'ran simpleTests->';
    C_Both(MSG);
}
testMe();