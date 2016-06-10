/**
 * 160610 0700
 * SWITCH TO Lens
 *  They are built for Objects: CSD in my case.
 *  DROP evolve and transform.
 *  They are having a hard time with opacity Numbers.
 *  They are built for Strings
 *  They probably are too complicated
 *  They DO HAVE a Plus: They do all mutating in one place,
 *
 * 160609   WIP ndx INTO transformer Problem with replace opacity ???
 *  @19:45
 *  BROKEN for opacity >> Uncaught TypeError: str.replace is not a function
 *  STABLE _RESTYLE_all_trgtEs()  WORKS. Will need functions rather than Code to modify with ndx
 *  STABLE: _EVOLVE_CSD() and CHANGE the template.fontSize AS a function of trgtE.ndx
 *  WIP: though tedious I have one way GET trgtE.ndx INTO transformer
 *  STABLE w/ _base_clss_CSD
 *  NOT STABLE w/ _trgt_clss_CSD
 *  JUST TOOK stuff FROM transformers.js TP simpleTests.js *
 */
"use strict";
// import {_trgt_clss_CSD } from "transformers_tests-compiled.js"; //BREAKS
/**
 *       --------------------------DATA:
 */
/**
 *      :: L:[E,E,E]
 *      a nodeList of rClass Elements: NL: pst, cur, fut
 */
const NL = cur_Chptr_rClss_NL;
/**
 *      styleProps: D:{{},{},{}}
 * @type {{fut: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}, cur: {fontSize: string, opacity: number, textAlign: string}, pst: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}}}
 */
const CssStylDecl_Dict = { //
    fut: {
        stepSize: -50, //  90 - 50 -> 40
        fontSize: "90%",
        opacity: 0.9,
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
        stepSize: 70, // start small 70 + 40  -> 80
        fontSize: "70%", // TEST VALUE FIX
        opacity: 0.7,
        textAlign: "right",
        backgroundColor: "rgba(255, 0, 0, 0.24)"
    }
};
/**
 *      ShortCut -> CssStylDecl_Dict
 */
let CSD_D = CssStylDecl_Dict; // -> D:csd

/**
 *      --------------------------HELPERS for _RESTYLE_trgts
 */
/**
 *      _rClssE_key:  clssE -> S:e.classNameKey
 * @param rcE
 * @private
 */
// const _rClssE_key = R.prop('className');

/**
 *      S:key -> CSD:base -> CSD:clss
 *  i.e. base CSD: CssStyleDeclarations a Dict of ALL Classes
 */
// const _rClss_ = R.flip(R.prop);

/**
 *          :: clssE -> D:CSD
 *  requires a CssStylDecl_Dict aka CSD_D
 *  basis for evolving into _new_clss_CSD
 *          compose(
 *          _rClssE_key,              //  clssE -> S:k
 *          _rClssE_CSD          // S:k -> D:csd
 *          )
 */
// const _base_clss_CSD = R.compose(_rClss_(CSD_D), _rClssE_key);
const _base_clss_CSD = R.compose(R.flip(R.prop)(CSD_D), R.prop('className'));

// simple 1SAAT
let _y = (x)=> 20 * x + 15;// (N:x) -> N:y
_y = (x)=>-50 / 5 * (x) + 90;
let _opac = (x)=> -0.50 / 5 * (x) + 0.90;
assert('0.4', R.toString(_opac(5)), " _opac:");
assert(0.9, _opac(0), " _opac:");
/**
 *          ::{K:(v->v)}
 * @type {{fontSize: (XML|string|void|*), textAlign: (XML|string|void|*)}}
 */
let transformer = {
    fontSize: R.replace('100', '55'),
    textAlign: R.replace("right", "center"), // NOTE:  ON ANY CSD WITH textAlign:'center'
    // opacity: R.replace("0.9", "0.4"), // this is really for strings
};

/**
 *      :: CSD:{k:v) -> CSD{k:v}
 *  evolves the base CSD BY weighting some of the  properties.
 */
let _EVOLVE_CSD;

/**
 *          :: D:base CSD -> N:ndx -> D:trgt CSD
 *  This IS the function that DOES all the WORK of restyling each element/
 *  USED IN: simpleTests.js
 *  will need something like compose( _EVOLVE_(oldCSD), setTransform_ERs, setWt_ER) (trgt_Ndx)
 * @private
 */
let _trgt_clss_CSD = R.curry(
    (csd, ndx) => {
        assert(false, R.isNil(ndx), 'ndx isNil IN _trgt_clss_CSD');
        // BY HAND transformer.fontSize = R.replace('100')('175');//OK that WORKS!!
        transformer.fontSize = R.replace('90')(_y(ndx));//OK works BY HAND
        // transformer.opacity = R.replace("0.9")("0.4");//???
        // transformer.opacity = R.replace(0.9)(_y(ndx)/100);// BY HAND NG???
        _EVOLVE_CSD = R.evolve(transformer);//   CSD:old -> CSD:new
        //simple testing is Breakpoint the RET. Then step thru and watch the Browser
        // RET = csd;// i.e. NO CHANGE just return BASE:  {k:v} -> {k:v}
        RET = _EVOLVE_CSD(csd);// TRGT:{k:v} -> {k:v}
        return RET
    }
);
/**
 *          :: (base_CSD, trgt_E) -> trgt_CSD
 *
 *  REF: Object.assign( to target, from ...sources) -> trgt
 */
const _set_a_Style = R.curry(
    (csd, e_trgt)=> Object.assign(e_trgt.style, csd));

/**
 *          :: clssE -> L:[trgtE, trgtE, ...]
 *      an rClss Element:e -> a list of its verse elements.
 *      This is the target list of Verse Elements to mutate
 *
 */
const _rClss_Chldren = R.prop("children");// clssE -> L:[e, e,..]

/**
 *          _RESTYLE_trgtEs: L:nodeList ->  L:nodeList
 *      all Elements in all rClasses are RESTYLED =f(trgt)
 *
 */
const _RESTYLE_all_trgtEs = R.map(
    (clssE) => {
        return R.addIndex(R.map)(
            (trgtE, ndx, col)=> {
                var base = _base_clss_CSD(clssE);// E -> CSD
                var trgt = _trgt_clss_CSD(base);// (CSD, N)-> CSD THIS IS THE WORKER FUNCTION !!!
                return _set_a_Style(trgt(ndx), trgtE);
            },
            _rClss_Chldren(clssE)
        )
    }
);
var cee = R.map((v)=>R.values(R.values(v)));
/**
 *      ---------------------------- INVOKE and TEST
 */
// C_Both('vals were: ' + JSON.stringify( cee(CSD_D.fut)));
var fut0 = R.map(R.props(['fontSize', 'opacity']))(CSD_D);// BROKEN
C_Both('vals were: ' + JSON.stringify(R.values(fut0)));

var REStylED_trgts = _RESTYLE_all_trgtEs(NL);
var fut1 = REStylED_trgts[2];// ->[csd, csd ...]
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