/**
 * 160616  CUT= _set_trgtCSD    REFACT    _RESTYLE_all_trgtEs()
 * @0630  WIP TO USE js parseFloat:: Str->Num.Float  conversion,
 *  it ignores the % Char in "80%", thus stripping the %
 *  it also seems to accept Numbers.
 *  I may not have to convert all CSD values to Strings
 * @0530     still stable and working for 'opacity' csdKey BUT mot for 'fontSize'
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
        // some clss_CSD.values of this clss
        /**
         *      _csdLens:: S:csdKey -> Lens:csdLens
         */
        const _csdLens = R.lensProp;// (S:propKey)-> Lens
        /**
         *      get_base_csdValu:: S:csdKey -> D:csdValu
         */
        const get_base_csdValu = R.compose(
            parseFloat,
            R.view(R.__, baseCSD),
            _csdLens);// S:key -> D:keyCSD

        var _csdStep = get_base_csdValu('stepSize');
        var _csdOpacity = get_base_csdValu('opacity');
        var _csdFontSize = get_base_csdValu('fontSize');

        // now weighting:: stepSize * wt + the starting value of some new Property
        var wt = _StepER(R.length(trgt_sibs))(trgt_ndx);
        assert(true, R.is(Number)(wt), 'expect all numbers');
        var _lade_baseValu = R.multiply;// (N:wght) -> N:step -> N:lade
        // see 'lade:..

        var key = 'opacity';
        TST = _lade_baseValu(wt)(_csdStep);
        var opacValu = _csdOpacity + TST;

        /**
         *      set_trgt_csd::TESTING S:csdKey -> D:trgtCSD
         */
        const set_trgt_csd = R.compose(R.set(R.__, opacValu, baseCSD), _csdLens);//S:key -> D:
        var noop = 110;
        return set_trgt_csd('opacity')
    }
);
/**
 *      _set_trgtStyles: CSD D -> E: trgt -> mutated E:trgt
 * @param csd
 * @param e_trgt
 *
 *  REF: Object.assign( to target, from ...sources) -> trgt
 */
const _set_trgtStyles = R.curry(
    /**
     *      _set_trgtStyles: CSD D -> E: trgt -> mutated E:trgt
     * @param csd
     * @param e_trgt
     */
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