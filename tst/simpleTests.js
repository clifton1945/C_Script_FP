/**
 *  simpleTests.js
 * 160622
 *  @0625 ADDED _wtER_ s TO CssStyleDecl_Dict
 * 160621
 * @0952 STABLE USE of wtER s; NOT finished but close.
 * @0655 REMOVED NOT USED CODE
 * @0635 WORKING STABLE
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
        // _wtER: _wtER_fut,
        fontSize: "75%",
        opacity: '0.75',
        textAlign: "left",
        backgroundColor: "rgba(145, 248, 29, 0.29)"
    },
    cur: {
        // _wtER: _wtER_cur, // start big  stay big
        fontSize: "100%",
        opacity: '1.0',
        textAlign: "center",
        // backgroundColor: "rgba(255, 0, 0, 0.24)"
    },
    pst: {
        // _wtER: _wtER_pst,
        fontSize: "80%",
        opacity: '0.8',
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
 *      _get_clss_CSD:: (E:clssElem) -> D:clssCSD
 *  extracts the class style Dict -fut,cur,pst- from the class Element,
 *  NOTE: the base css style declaration dictionary, CSD_D, is hard coded in.
 */
const _get_clss_CSD = R.compose(R.flip(R.prop)(CSD_D), R.prop('className'));

/**
 *      _set_trgtStyles: CSD D -> E: trgt -> mutated E:trgt
 * @param csd
 * @param e_trgt
 */
const _set_trgtElem = R.curry(
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
        var wt_factor = _wtER_pst;
        return R.addIndex(R.map)(
            (trgtE, ndx, col)=> {
                var wt_factor = _wtER_fut(col);
                var trgt = _evolve_CSD(base, wt_factor(ndx));// (CSD, N)-> CSD THIS IS THE WORKER FUNCTION !!!
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

// testMe();
function testMe() {
    var MSG, _CUT, RET, EXP, TST, tNum = 0;
    MSG = ` simpleTests -> `;

    RET = _RESTYLE_all_trgtEs(NL); // INVOKED


// final MSG
    MSG += `
    finished simpleTests`;
    C_Both(MSG);
}
