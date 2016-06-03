"use strict";
/**
 * 6/3/2016
 *      _RESTYLE_trgts: L: nodelist -> all Elements in all rClasses RESTYLED =f(trgt)
 *      this relies on helper function: _my_init_rClass_CSD( elem)
 *      NOW  REFACT it TO ->
 *      _my_rClss_CSD( elem, ndx, col)
 *          get INIT CSD
 *          WEIGHT CSD_values
 *          FORMAT CSD_values
 *          EVOLVE the CSD
 *
 */
// var MSG = '', CUT, _CUT, RET, EXP, TST, tNum = 0;

/**
 *      styleProps: D:{{},{},{}}
 * @type {{fut: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}, cur: {fontSize: string, opacity: number, textAlign: string}, pst: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}}}
 */
const styleProps = {
    fut: {
        fontSize: "90%",
        opacity: 0.9,
        textAlign: "left",
        backgroundColor: "rgba(145, 248, 29, 0.29)"
    },
    cur: {
        fontSize: "100%",
        opacity: 1.0,
        textAlign: "center",
        // backgroundColor: "rgba(255, 0, 0, 0.24)"
    },
    pst: {
        fontSize: "80%",
        opacity: 0.8,
        textAlign: "right",
        backgroundColor: "rgba(255, 0, 0, 0.24)"
    }
};

/**
 *      cur_Chptr_rClss_NL: a nodelist of rClasses: NL: pst, cur, fut
 */
var nl = cur_Chptr_rClss_NL;

/**
 *          HELPERS for _my_init_rClss_CSD
 */
const _rClssKey = (rcE) => R.prop('className')(rcE);//: E:e -> S:e.classNameKey
// NOTE: styleProps hard coded into _a_init_cssStylDecl
const _a_init_cssStylDecl = R.flip(R.prop)(styleProps);// S:key -> D:propDict

var transformers = {// NOTE: USING .replace For string!
    // fontSize: fontSizer(fontSize_new), // yeah, it works
    opacity: R.multiply(.75),
    textAlign: R.replace('center', 'right')// works FOR any rClss WITH initial 'center'
};
let EVOLVER;  //R.evolve:: {k:(v->v)} -> {k:v} ->{k:v}
EVOLVER = R.evolve(transformers); //  {k:v} ->{k:v}

// now EVOLVE init TO weighted CSD
/**      _my_rClss_CSD( elem, ndx, col)
 *          pipe(
 *          _rClssKey,              //  E:e -> S:k
 *          _a_init_cssStylDecl     // S:k -> D:csd
 *                  WEIGHT CSD_values   // (D:dct) -> (E:e, N:ndx, L:col)
 *                  FORMAT CSD_values
 *          EVOLVE the CSD          // D:csd
 */
let _my_rClss_CSD = R.pipe(_rClssKey, _a_init_cssStylDecl, EVOLVER);

/**
 *      rClss_Elem_Children: E:e -> L:[e, e,..]
 *      an rClss Element:e -> a list of its verse elements.
 *      This is the target list of Verse Elements to mutate
 *
 */
let rClss_Elem_Children = R.prop("children");// E:e -> L:[e, e,..]
// test

// now mutate a trgt element style
/**
 *      _RESTYLE_trgts: L: nodelist -> all Elements in all rClasses RESTYLED =f(trgt)
 *      this relies on helper function:
 *      _my_init_rClass_CSD( elem)
 *      WHICH NOW  needs to BECOME -> _my_rClss_CSD( elem, ndx, col)
 *
 */
let _RESTYLE_trgts = R.forEach(
    (eClss) => {
        R.addIndex(R.forEach)(
            (trgt, ndx, col)=> Object.assign(trgt.style, _my_rClss_CSD(eClss)),
            rClss_Elem_Children(eClss)
        )
    }
);

var REStylED_trgts = _RESTYLE_trgts(nl);
C_Both(JSON.stringify(REStylED_trgts));
TestMe();

function TestMe() {
    var MSG = '', CUT, _CUT, RET, EXP, TST, tNum = 0;
//tests  _RESTYLE_trgts
    tNum = 4;
    RET = _RESTYLE_trgts(nl);
    var trgt = cur_Chptr_cur_rClss_Verse_tst1_Elem;
    RET = trgt.style.textAlign;
    assert('center', RET);
// tests  rClss_Elem_Children
    tNum = 3;
    let stub_rClss_Elem = document.querySelector('div #cur_VerseReadGrp');//
    RET = rClss_Elem_Children(stub_rClss_Elem);// -> HTMLCollection[2]
    assert(RET.length, 2, tNum);

//tests  _my_init_rClss_CSD
    tNum = 2;
    let _stub_my_init_rClss_CSD_List = R.map(_my_rClss_CSD);//  L:nl -> [[D:d, D:d, D:d]]
    RET = _stub_my_init_rClss_CSD_List(nl);//  ->  [[D:d, D:d, D:d]]
    assert(RET[0].fontSize, "80%");
    assert(RET[2].fontSize, "90%");

// test   cur_Chptr_rClss_NL
    tNum = 1;
    nl = cur_Chptr_rClss_NL;
    assert(nl[2].className, 'fut');
    assert(nl[2].childElementCount, 6);
// final MSG
    MSG = 'TestMe: completed';
    C_Both(MSG);
}