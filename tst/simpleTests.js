/**
 * 160616  simpleTests.js::  CUT= _set_trgtCSD
 * @1908 Both fontSize and opacity WORK!
 * REFACT    _RESTYLE_all_trgtEs()
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
        stepSize: -0.750,
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
        stepSize: 0.25,
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
 *      _set_trgtCSD:: D -> N -> L -> D:
 * @param baseCSD
 * @param trgt_ndx
 * @param trgt_sibs
 * @returns trgtCSD ready to be applied to an Element
 */
let _set_trgtCSD = R.curry(
    /**
     *      _set_trgtCSD::
     * @param baseCSD
     * @param trgt_ndx
     * @param trgt_sibs
     * @returns {*}
     */
    (baseCSD, trgt_ndx, trgt_sibs) => {
        assert(false, R.isNil(trgt_ndx), 'ndx isNil IN _trgt_clss_CSD');
        var TST;
        /**
         *      _csdLens:: S:csdKey -> Lens:csdLens
         */
        const _csdLens = R.lensProp;// (S:propKey)-> Lens

        var wtSTUB = _StepER(R.length(trgt_sibs))(trgt_ndx); // uses _StepER() from setWeight_tests.js

        /**
         *      _lade_baseValu:: N:wtSTUB -> N:step -> N: wtSTUB*step
         */
        var _lade_baseValu = R.multiply;// (N:wght) -> N:step -> N:lade
        assert(true, R.is(Number)(wtSTUB), 'expect all numbers');

        // REFACT HARD CODED NOW call bth is next

        // var csdKey = 'fontSize'; // these will soon be arguments
        var csdKey = 'opacity';

        /**
         *      _base_csdValu:: S:csdKey -> D:csdValu
         *      the param: baseCSD is already partial ed
         */
        const _base_csdValu = R.compose(
            parseFloat,
            R.view(R.__, baseCSD),//
            _csdLens);// S:key -> D:keyCSD

        /**
         *      csdStep::: -> N: v1 || v2
         *      constant for each of three rClasses
         */
        var csdStep = _base_csdValu('stepSize');
        csdStep = csdKey == 'fontSize' ? csdStep * 100 : csdStep;
        // to much trouble to test for all three steps since baseCSD is 'baked in'

        /**
         *      csdValu:: S:key -> N:v1 || v2
         */
        var csdValu = _base_csdValu(csdKey);
        csdValu += _lade_baseValu(wtSTUB)(csdStep);
        csdValu = csdKey == 'fontSize' ? `${csdValu}%` : csdValu;
        assert(true, R.is(Number, _base_csdValu('fontSize')), '@125 forced fontSize:Str->Num');

        /**
         *      set_trgt_csd:: S:csdKey -> D:trgtCSD
         */
        const set_trgt_csd = R.compose(
            R.set(R.__, csdValu, baseCSD),
            _csdLens);//S:key -> D:
        var noop = 110;
        return set_trgt_csd(csdKey)
    }
);
/**
 *      _set_trgtElem: CSD D -> E: trgt -> mutated E:trgt
 * @param csd
 * @param e_trgt
 *
 *  REF: Object.assign( to target, from ...sources) -> trgt
 */
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
        var base = _base_clss_CSD(clssE);// E -> CSD

        return R.addIndex(R.map)(
            (trgtE, ndx, col)=> {
                var trgt = _set_trgtCSD(base, ndx, col);// (CSD, N)-> CSD THIS IS THE WORKER FUNCTION !!!
                return _set_trgtElem(trgt, trgtE);
            },
            _rClss_Chldren(clssE)
        )
    }
);
/**
 *      ---------------------------- INVOKE and TEST
 */
// var cee = R.map((v)=>R.values(R.values(v)));
// C_Both('vals were: ' + JSON.stringify( cee(CSD_D.fut)));
// var fut0 = R.map(R.props(['fontSize', 'opacity']))(CSD_D);//
// // C_Both('Clss base props: ' + JSON.stringify(R.values(fut0)));

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