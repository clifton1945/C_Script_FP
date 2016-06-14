/**
 * 160614  REFACT    _RESTYLE_all_trgtEs()
 * @0734  STABLE new _csdValu()
 * @0636  STABLE BUT WIP
 * @0525  IS STABLE.
 * PLAN: REFACTOR the working code; probably split _set_trgtCSD; improve tests.
 */
"use strict";
// import { _StepER, assert} from "tst/setWeight_tests-compiled"; //??
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
        stepSize: -.8,
        fontSize: "90%",
        opacity: 0.9001,
        textAlign: "left",
        backgroundColor: "rgba(145, 248, 29, 0.29)"
    },
    cur: {
        stepSize: 0, // start gig  stay big
        fontSize: "100%",
        opacity: 1.0,
        textAlign: "center",
        // backgroundColor: "rgba(255, 0, 0, 0.24)"
    },
    pst: {
        stepSize: .75,
        fontSize: "60%",
        opacity: 0.4,
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

/**
 *      _base_clss_CSD:: (E:clssElem) -> D:clssCSD
 *  extracts the class style Dict -fut,cur,pst- from the class Element,
 *  NOTE: the base css style declaration dictionary, CSD_D, is hard coded in.
 */
const _base_clss_CSD = R.compose(R.flip(R.prop)(CSD_D), R.prop('className'));

/**
 *      _set_trgtCSD:: (D:base CSD -> N:ndx -> L:sibs) -> D:trgt CSD
 *      as of now this sets_oneCSD; in series it sets_alt_trgtCSD
 *  This IS the function that DOES all the WORK of restyling each element/
 *  USED IN: simpleTests.js
 *  its csd param IS 1of3 specific rClss Elems: fut, cur, pst- each with specific csd {k:values} s.
 *  is [see code for a better implementation]
 *  wghtER:: (N:ndx, L:[sibs])-> N:wt
 *  csdER::     compose
 *  set_csdLens::       Str:key -> Lens fn:keyLens
 *  get_baseValu::  (D:CSD, Lens:keyLens, D:CSD)-> a:valu
 *  lade_baseValu::   (a:base, N:wt) -> a:trgt
 *  set_trgtValu::  (lens, valu, baseCSD) -> trgtCSD
 *
 * tsts: lets look at before and after for a property csd. Use lens
 *
 * NOTE:@private SET in opening Doc SEEN AS private symbol seen in Structure Tool
 */
let _set_trgtCSD;
_set_trgtCSD = R.curry(
    (baseCSD, trgt_ndx, trgt_sibs) => {
        assert(false, R.isNil(trgt_ndx), 'ndx isNil IN _trgt_clss_CSD');
        var TST;
        // some clss_CSD.values of this clss
        /**
         *      _csdLens:: S:csdKey -> Lens:csdLens
         */
        var _csdLens = R.lensProp;// (S:propKey)-> Lens
        /**
         *      _csdValu:: S:csdKey -> D:csdValu
         */
        var _csdValu = R.compose(R.view(R.__, baseCSD), _csdLens);// S:key -> D:keyCSD

        var _csdStep = _csdValu('stepSize');
        var _csdOpacity = _csdValu('opacity');
        var _csdFontSize = _csdValu('fontSize');

        // now weighting:: stepSize * wt + the starting value of some new Property
        var wt = _StepER(R.length(trgt_sibs))(trgt_ndx);
        assert(true, R.is(Number)(wt), 'expect all numbers');
        var _lade_baseValu = R.multiply;// (N:wght) -> N:step -> N:lade
        // see 'lade:..

        var key = 'opacity';
        TST = _lade_baseValu(wt)(_csdStep(baseCSD));
        var opacValu = _csdOpacity(baseCSD) + TST;
        var _set_trgtCSD = R.set(_csdLens(key), opacValu);
        TST = _set_trgtCSD(baseCSD);
        return TST
    }
);
/**
 *       _set_trgtStyles:: (base_CSD, trgt_E) -> trgt_CSD
 *
 *  REF: Object.assign( to target, from ...sources) -> trgt
 */
const _set_trgtStyles = R.curry(
    (csd, e_trgt)=> Object.assign(e_trgt.style, csd)
    // (csd, e_trgt)=> e_trgt.style = csd
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
        return R.addIndex(R.map)(
            (trgtE, ndx, col)=> {
                var base = _base_clss_CSD(clssE);// E -> CSD
                var trgt = _set_trgtCSD(base, ndx, col);// (CSD, N)-> CSD THIS IS THE WORKER FUNCTION !!!
                return _set_trgtStyles(trgt, trgtE);
            },
            _rClss_Chldren(clssE)
        )
    }
);
/**
 *      ---------------------------- INVOKE and TEST
 */
var cee = R.map((v)=>R.values(R.values(v)));
// C_Both('vals were: ' + JSON.stringify( cee(CSD_D.fut)));
var fut0 = R.map(R.props(['fontSize', 'opacity']))(CSD_D);//
// C_Both('Clss base props: ' + JSON.stringify(R.values(fut0)));

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

//tests  __base_rClss_CSD
    tNum = 2;
    CUT = _base_clss_CSD;
    var test_CSDs = R.map(CUT);//  L:nl -> [[D:d, D:d, D:d]]
    RET = test_CSDs(NL);//  ->  [[D:d, D:d, D:d]]
    assert("60%", RET[0].fontSize, tNum);
    assert("90%", RET[2].fontSize, tNum);

// test   cur_Chptr_rClss_NL
    tNum = 1;
    // var nl = cur_Chptr_rClss_NL;
    assert('fut', NL[2].className, tNum);
    assert(6, NL[2].childElementCount, tNum);

// final MSG
    MSG = 'testMe: completed';
    C_Both(MSG);
}
testMe();