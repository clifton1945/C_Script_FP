/**
 * Created by CLIF on 5/5/2016.
 */
"use strict";
//var R = require('ramda');
//import { testStr } from '..//src//modules-compiled'; // WORKS but throws Inspection 'can't resolve

/**
 *  a Book has three ChapterClasses [ClassOfChptrs]: .pst, .cur, .fut. Each is a Collection of 0->N Chapters AT any one time.
 *  a ChapterClass [ClassOfChptrs]: is a Collection of 0->N Chapters AT any one time.
 *  a Chapter has three VerseClasses [ClassOfVerses]: .pst, .cur, .fut. Each with a Collection of 0->N Verses AT any one time.
 *  a VerseClass [ClassOfVerses] is a Collection of 0->N Verses AT any one time.
 *  a Verse has 1-N Sentences, each with 1-N clauses, each with 0-N phrases,....
 *
 *  BUT ONLY the cur_ChptrClass IS READ. Though any or all Chapters may at any on time be in the cur_ChptrClass
 */

/**
 *          GLOBAL vars
 * require functions-compiled.js, objects-compiled.js
 * */
//  *********** DOM  DATA    REQUIRE functions.js

var main = function () {
    var MSG, RET, EXP, TST, noop;
    MSG = 'style_theseVerses / ';

    /**
     *          TEST STUBS
     * @type {{chptr: {fut: {name: string, styleProps: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}}, cur: {name: string, styleProps: {fontSize: string, opacity: number, textAlign: string}}, pst: {name: string, styleProps: {fontSize: string, opacity: number, textAlign: string, backgroundColor: string}}}}}
     */
    const baseStylProp_Dict_stub = {
        chptr: {
            fut: {
                name: 'fut'
                , styleProps: {
                    fontSize: "90%",
                    opacity: 0.9,
                    textAlign: "CENTER",
                    backgroundColor: "rgba(145, 248, 29, 0.29)"
                }
            }
            , cur: {
                name: 'cur'
                , styleProps: {
                    fontSize: "100%",
                    opacity: 1.0,
                    textAlign: "CENTER",
                }
            }
            , pst: {
                name: 'pst'
                , styleProps: {
                    fontSize: "80%",
                    opacity: 0.8,
                    textAlign: "CENTER",
                    backgroundColor: "rgba(255, 0, 0, 0.24)"
                }
            }
        }
    };
    var fut_StylProps_stub = baseStylProp_Dict_stub.chptr.fut.styleProps;

    // **** NOTE ****   this is a node.js Test so DOM stub DO NOT WORK They are COMMENTED OUT
    //var aVerse_stub = _aDoc_Node('.ChptrReadGrps .cur .VerseReadGrps .fut').children[1];
    //var theseVerses_Coll_stub = _aDoc_Node('.ChptrReadGrps .cur .VerseReadGrps .fut').children;

    /**
     *          HELPER FUNCTIONS
     * @param i
     * @private
     */
    /**
     *          CONFIRMATION OUTPUT & ASSERTS
     */
    /**
     *      PLAN: 1TAAT MERGE individual CssStylDeclares
     *      NEXT: ALTER a Verse
     */

    /**
     *     R.lens AND R.set WORK-well TO PRODUCE one_cssStylDecl
     *     However, it is hard coded.
     */
    var CUT, the_cssSDecls, U, V, W, X, Y, Z;
    // WHAT IF I had a list of Values [123, 321] && a list [ _fontSize
    //CUT =  R.compose(Z,Y,X)({cve:12345});//WORKS >> X..Z form R.lensProp(propKey. propValu)(eager cssSD)
    var _lens_key = R.lensProp;
    var _val_ndx = _a_Wt; // ????????????? how make and use for a specific class ??

//TEST DATA STUBS:
    var init_SD_trgt = fut_StylProps_stub;
    var propKeys = ['fontSize', 'opacity', 'textAlign']; // list of prop keys:: [fs, op, ta]
    var propVals = ['125%', 70, 'center']; // a list of prop values:: [fs_val, op_val, ta_val]
    var a_Node = _aDoc_NodeList('.ChptrReadGrps .cur .VerseReadGrps .fut')[0].children[2];

// HELPER FUNCTIONS
    var lens_keys = R.map(_lens_key)(propKeys); // a list of props:: prop key lenses [fs, op, ta] -> [fs_lns, op_lns, ta_lns]
    var key_val_pairs = R.zip(lens_keys, propVals);  // a list of [k,v]:: [[fs_ln,fs_v], [op_ln,op_v],...]
    var _set_a_cssSD_wo_trgt = (a)=>R.set(a[0], a[1], R.__);
    var cssSDs_wo_SD_ = R.map(_set_a_cssSD_wo_trgt, key_val_pairs); // a list of partial set property cssStyleDecl eager trgt cssSD

    var reduce_the_cssSDs = R.reduce(function F(acc, val) {
        return val(acc)
    });
    var a_cssSD = reduce_the_cssSDs(init_SD_trgt)(cssSDs_wo_SD_);

    let assign_Style = R.curry(function assign_Style(styleObj, node) {
        return Object.assign(node['style'], styleObj);
    });
    var a_styled_Node = assign_Style(a_cssSD)(a_Node);

// OK the above STYLES aVerse:; ([propKey],[propVals], {init_SD_trgt}, {a_Node} -> a_Node}

    CUT = a_styled_Node;
    C_It(CUT);
    MSG = JSON.stringify(CUT);
// ASSERT
//    KEY = fontSize_Key;
//    EXP = '35%';
//    TST = R.propEq(KEY, EXP)(CUT);
//    STR = `EXP ${KEY}==${EXP} NOT ${R.prop(KEY, CUT)}`;
//    console.assert(TST, STR);

    C_Both(MSG);
    noop = '';
};
main();
//let _a_Wt_stub = i => 55 + i * 10; // (i)->EXP: 0<ndx<
//var-- _appendPercent = (n) => `${n}%`;  // DO NOT UNDERSTAND HOW TO MAKE THIS Pointless ?
//var _divide100 = R.flip(R.divide)(100);// WORKS
//var _eager_fontSize = R.compose(_appendPercent, _a_Wt_stub);// a -> b
//var _eager_opacity = R.compose(_divide100, _a_Wt_stub);
//var _new_Str = (s)=>R.always(s);
//var transformers = (n)=> {    // (n) -> {}
//    return {// trans... REQUIRE a transformer FUNC
//        // the R.always returns a FUNC returning the satisfied _eager by n
//        fontSize: R.always(_eager_fontSize(n)), // must be a -> (*-> b)
//        opacity: R.always(_eager_opacity(n)),
//        textAlign: _new_Str('center')
//    }
//};

//let styl_oneVerse = R.curry(function styl_One_Verse(styleObj, val, ndx, col) {
//    // remember, this is a cBFn which returns the_mutatedVerse
//    assign_Style(update_properties(styleObj)(ndx), val);
//    return val
//});
//let styl_theseVerses = R.curry(
//    /**
//     *      styl_theseVerses::
//     * @param cBFn
//     * @param coll
//     * @returns [verses]
//     */
//    function styl_theseVerses(cBFn, coll) {
//        return R.addIndex(R.map)(cBFn)(coll)
//    });



