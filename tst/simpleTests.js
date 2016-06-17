/**
 * 160617  simpleTests.js:: STABLE
 * @1605  BROKEN  WIP  but slowly adding tests and code
 *  USING:: _getValu_frm_csdKey(), _getValu_frm_csdDict()
 * NOW go thru and continue separation of code
 * @0823 STABLE with both N:opacity and S:fontSize csd s.
 *      whenStr_parseFloat() AND _get_Dict_Valu()
 * @0658 WIP CUT= _get_Dict_Valu IN _set_trgtCSD
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
 *      whenStr_parseFloat:: S:v || N:v -> N:v
 */
const whenStr_parseFloat = R.when(R.is(String), parseFloat);
assert(50, whenStr_parseFloat('50%'), ' whenStr_parseFloat()');
assert(50, whenStr_parseFloat('50'), ' whenStr_parseFloat()');
const _setView = R.compose(R.view, R.lensProp);//:: S;k -> a:{k:v) -> a:v

/**
 *      _getValu_frm_csdKey::      S:key -> D:{k,v} -> N:v
 *      R.lensProp::            Str -> Lens s a
 *      R.view::                Lens s a -> s -> a
 *      whenStr_parseFloat::    Str | Num -> N
 */
let _getValu_frm_csdKey = R.curry(
    (lensKey, dict) => whenStr_parseFloat(R.view(R.lensProp(lensKey), dict)));//NG
assert(90, _getValu_frm_csdKey('fontSize')({fontSize: '90%'}), '_getValu_frm_csdKey');
assert(-0.75, _getValu_frm_csdKey('stepSize')({stepSize: -0.75}), '_getValu_frm_csdKey');
assert(0.9001, _getValu_frm_csdKey('opacity')({opacity: 0.9001}), '_getValu_frm_csdKey');

/**
 *      _getValu_frm_csdDict::  = (D:dict) => (S:lensKey) =>  N:v
 */
let _getValu_frm_csdDict = R.flip(_getValu_frm_csdKey);
assert(90, _getValu_frm_csdDict({fontSize: '90%'})('fontSize'), '_getValu_frm_csdDict flip');
assert(-0.75, _getValu_frm_csdDict({stepSize: -0.75})('stepSize'), '_getValu_frm_csdDict flip');
assert(0.9001, _getValu_frm_csdDict({opacity: 0.9001})('opacity'), '_getValu_frm_csdDict flip');

/**
 *      _get_clss_CSD:: (E:clssElem) -> D:clssCSD
 *  extracts the class style Dict -fut,cur,pst- from the class Element,
 *  NOTE: the base css style declaration dictionary, CSD_D, is hard coded in.
 */
const _get_clss_CSD = R.compose(R.flip(R.prop)(CSD_D), R.prop('className'));

/**
 *      _set_trgt_CSD:: D -> N -> L -> D:
 * @param baseCSD
 * @param trgt_ndx
 * @param trgt_sibs
 * @returns trgtCSD ready to be applied to an Element
 */
let _set_trgt_CSD = R.curry(
    /**
     *      _set_trgtCSD::
     * @param baseCSD
     * @param trgt_ndx
     * @param trgt_sibs
     * @returns {*}
     */
    (baseCSD, trgt_ndx, trgt_sibs) => {
        var TST;
        var wtSTUB = _StepER(R.length(trgt_sibs))(trgt_ndx); // uses _StepER() from setWeight_tests.js

        /**
         *      _lade_baseValu:: N:wtSTUB -> N:step -> N: wtSTUB*step
         */
        var _lade_baseValu = R.multiply;// (N:wght) -> N:step -> N:lade
        assert(true, R.is(Number)(wtSTUB), 'expect all numbers');

        /**
         *      csdStep::: D:csd -> N: v1 || v2
         *      constant for each of three rClasses
         */
        var csdStep = _getValu_frm_csdKey('stepSize');
        csdStep = csdKey == 'fontSize' ? csdStep * 100 : csdStep;
        assert(-0.75, csdStep({stepSize: -0.75}), 'csdStep:: tst csd');
        
        
        // var csdKey = 'fontSize'; // these will soon be arguments
        var csdKey = 'opacity';

        /**
         *      _csdLens:: S:csdKey -> Lens:csdLens
         *
         */
        const _csdLens = R.lensProp;// (S:propKey)-> Lens

        /**
         *      _csdValu_base:: S:csdKey -> D:csdValu
         *
         */
        const _csdValu_base = _getValu_frm_csdKey;
        csdKey = 'fontSize';
        assert(85, _csdValu_base(csdKey)({fontSize: '85%'}), '_csdValu_base >> tst csd');
        var fontSize_csdBase = _getValu_frm_csdKey('fontSize');
        assert(85, fontSize_csdBase({fontSize: '85%'}), 'fontSize_csdBase >> tst csd');

        /**
         *      csdValu:: S:key -> N:v1 || v2
         */
        var csdValu = _csdValu_base(csdKey);
        csdValu += _lade_baseValu(wtSTUB)(csdStep);
        csdValu = csdKey == 'fontSize' ? `${csdValu}%` : csdValu;
        // assert(true, R.is(Number, _csdValu_base('fontSize')), 'csdValu > forced fontSize:Str->Num');

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
        var base = _get_clss_CSD(clssE);// E -> CSD
        return R.addIndex(R.map)(
            (trgtE, ndx, col)=> {
                var trgt = _set_trgt_CSD(base, ndx, col);// (CSD, N)-> CSD THIS IS THE WORKER FUNCTION !!!
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
    CUT = _get_clss_CSD;
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
    MSG = 'completed tests';
    C_Both(MSG);
}
testMe();