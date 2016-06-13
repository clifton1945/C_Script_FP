/**
 * 160613
 * @1435  working stable  actually mutating the verse div opacity!!
 * @1117   setWeight_tests._StepER IS WORKING!!
 * @1051  CUT now IS _set_one_trgtCSD()
 *      CAN I USE setWeight.js ???
 * @1036  STABLE:  a lot of trouble and work to get simpleTests working again;
 *  the problem continues to be  using requires in .js node test BUT not .html
 *  a lot of fiddling with the <script src=  calls
 * taking stuff out of the two functions and function_01
 * trying to import - or the equivent - setWeight_tests
 *
 * 160611
 * WIP moving towards modifying the baseCSD WITH _lade_baseValu()
 * AND using WS annotating the BreakPoints YEAH
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
        stepSize: -50, //  90 - 50 -> 40
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
        stepSize: 70, 
        fontSize: "70%", // TEST VALUE FIX
        opacity: 0.7,
        textAlign: "right",
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
 *      _rClssE_key:  clssE -> S:e.classNameKey
 * const _rClssE_key = R.prop('className');
 * @param rcE
 */
/**
 *      _rClss_:: _rClss_S:: key -> CSD:base -> CSD:clss
 *  const _rClss_ = R.flip(R.prop);
 *  requires base CSD: CssStyleDeclarations a Dict of ALL Classes
 */
/**
 *      _base_clss_CSD:: clssE -> D:CSD
 *  more understandable version is
 *     const _base_clss_CSD = R.compose(_rClss_(CSD_D), _rClssE_key);
 *  requires a CssStylDecl_Dict aka CSD_D
 */
const _base_clss_CSD = R.compose(R.flip(R.prop)(CSD_D), R.prop('className'));

/**
 *          transformer::{K:(v->v)}
 * @type {{fontSize: (XML|string|void|*), textAlign: (XML|string|void|*)}}
 */
let transformer = {
    fontSize: R.replace('100', '55'),
    textAlign: R.replace("right", "center"), // NOTE:  ON ANY CSD WITH textAlign:'center'
    // opacity: R.replace("0.9", "0.4"), // REFACT: DOES NOT PLAY WELL WITH transformer
};

/**
 *      _EVOLVE_CSD:: CSD:{k:v) -> CSD{k:v}
 *  evolves the base CSD BY weighting some of the  properties.
 */
let _EVOLVE_CSD;

// // _wghtER::
// let _y = (x)=> 20 * x + 15;// (N:x) -> N:y
// _y = (x)=>-50 / 5 * (x) + 90;
// let _opac = (x)=> -0.50 / 5 * (x) + 0.90;
// assert('0.4', R.toString(_opac(5)), " _opac:");
// assert(0.9, _opac(0), " _opac:");

/**
 *      _set_one_trgtCSD:: (D:base CSD -> N:ndx -> L:sibs) -> D:trgt CSD
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
let _set_one_trgtCSD;
_set_one_trgtCSD = R.curry(
    (baseCSD, trgt_ndx, trgt_sibs) => {
        var TST;
        assert(false, R.isNil(trgt_ndx), 'ndx isNil IN _trgt_clss_CSD');
        var _propLens = R.lensProp;// -> Lens
        var _opacLens = _propLens('opacity');
        var _baseValu = R.view(_propLens('opacity'));// (baseCSD) -> a:baseValu
        var wt = _StepER(R.length(trgt_sibs))(trgt_ndx);
        assert(true, R.is(Number)(wt), 'expect all numbers');
        var _lade_baseValu = R.multiply;// (wght) -> csd -> (a:baseValu)-> a:valu
        // TST = _lade_baseValu(wt)(_opacLens(baseCSD));// specific base valu
        TST = _lade_baseValu(wt)(1);

//         var frmt_trgtValu = (a)=>a;// STUB -> a:trgtValu
//         var _set_trgtCSD = R.set(_propLens)(lade_baseValu);// (baseCSD) -> trgtCSD
        var _set_trgtCSD = R.set(_opacLens)(TST);// FIX STUB ADD lading(baseCSD) -> trgtCSD
        // TST = (_baseValu('opacity'))(baseCSD);
        // TST = _lade_baseValu(.2)(30);

        return _set_trgtCSD(baseCSD)
    }
);
/**
 *       _set_trgtStyles:: (base_CSD, trgt_E) -> trgt_CSD
 *
 *  REF: Object.assign( to target, from ...sources) -> trgt
 */
const _set_trgtStyles = R.curry(
    (csd, e_trgt)=> Object.assign(e_trgt.style, csd));

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
                var trgt = _set_one_trgtCSD(base, ndx, col);// (CSD, N)-> CSD THIS IS THE WORKER FUNCTION !!!
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
C_Both('Clss base props: ' + JSON.stringify(R.values(fut0)));

var REStylED_trgts = _RESTYLE_all_trgtEs(NL);

var fut1 = REStylED_trgts[1];// ->[csd, csd ...]
var fut2 = R.map(R.props(['fontSize', 'opacity']))(fut1);
// C_Both(cee(fut));
C_Both('vals  are: ' + JSON.stringify(R.values(fut2)));

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
    assert(2, RET.length, tNum);

//tests  __base_rClss_CSD
    tNum = 2;
    CUT = _base_clss_CSD;
    var test_CSDs = R.map(CUT);//  L:nl -> [[D:d, D:d, D:d]]
    RET = test_CSDs(NL);//  ->  [[D:d, D:d, D:d]]
    assert("70%", RET[0].fontSize, tNum);
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