/**
 * Created by CLIF on 5/5/2016.
 */
"use strict";
// var R = require('ramda');
//import { testStr } from '..//src//modules-compiled'; // WORKS but throws Inspection 'can't resolve
// import {C_It} from "..//src//functions_01-compiled"
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

    var CUT, the_SDecls, U, V, W, X, Y, Z;


    var _val_ndx = _a_Wt; // ????????????? how make and use for a specific class ??

//TEST DATA STUBS:
    var a_init_SD_trgt = fut_StylProps_stub;
    // hey Why a_Node DERIVED _FROM aNodeLIST??
    var a_Node = _aDoc_NodeList('.ChptrReadGrps .cur .VerseReadGrps .fut')[0].children[2];
    var propKeys = ['fontSize', 'opacity', 'textAlign']; // list of prop keys:: [fs, op, ta]
    var trgt_cssStyleDecl = {};
    /**
     *          CSSStyleDeclaration HELPER FUNCTIONS
     * @param i
     * @private
     */
    let _a_Wt_stub = i =>  35 + i * 10; // (i)->EXP: 0<ndx<
    var _appendPercent = (n) => `${n}%`;  // DO NOT UNDERSTAND HOW TO MAKE THIS Pointless ?
    var _divide100 = R.flip(R.divide)(100);// WORKS

    var _eager_fontSize = R.compose(_appendPercent, _a_Wt_stub);// a -> b
    var _eager_opacity = R.compose(_divide100, _a_Wt_stub);
    // BUILD a list of Lst_propVals_STUB
    var Lst_propVals_STUB = ['75%', 70, 'center']; // a list of prop values:: [fs_val, op_val, ta_val]

// HELPER FUNCTIONS: _->eagerFunction, Abc -> Obj
    var _a_lensKey_e4_Str = R.lensProp; //Str ->
    // Lens s a.
    // var Lst_lensKeys = R.map(_a_lensKey_e4_Str)(propKeys);     //-> Functions List:: [fs_lns, op_lns, ta_lns]
    var _map_propKey_LensFns = R.map(_a_lensKey_e4_Str);     //-> Functions List:: [fs_lns, op_lns, ta_lns]
    var Lst_lensKeys = _map_propKey_LensFns(propKeys);     //-> Functions List:: [fs_lns, op_lns, ta_lns]
    var _map_propVals_STUB = R.map(x=>x);
    var Lst_propVals = _map_propVals_STUB(Lst_propVals_STUB);        //-> Values List:: [fs_Vals, op_Vals, ta_Vals];
    var Lst_Key_Val_pairs = R.zip(Lst_lensKeys, Lst_propVals);  //-> Values[lensFn,v]:: [[fs_ln,fs_v], [op_ln,op_v],...]
    // var lst_Key_Val_pairs = R.zip(R.map( R.lensProp));       //-> a list of [lensFn,v]:: [[fs_ln,fs_v], [op_ln,op_v],...]
    // var lensFney_val_pairs = Lst_Key_Val_pairs(propKeys)(lst_propVals_STUB);  //-> a list of [lensFn,v]:: [[fs_ln,fs_v], [op_ln,op_v],...]

    var _set_a_SD_e4_SD = (a)=>R.set(a[0], a[1]);      //-> _set_a_SD_e4_trgtSD.
    var Lst_fn_SDs_e4_trgtSD = R.map(_set_a_SD_e4_SD)(Lst_Key_Val_pairs); //-> a list partial cssStyleDecl e4 trgtSDs.
    var _reduce_SDs_to_SD = (acc, val) => {
        return val(acc)
    };
    var a_SD = R.reduce(_reduce_SDs_to_SD, trgt_cssStyleDecl)(Lst_fn_SDs_e4_trgtSD); //-> Obj works NOTE: trgt

    let _assign_Style_e4_SD_Node = R.curry(function assign_Style(styleObj, node) {
        return Object.assign(node['style'], styleObj);
    });
    var a_styled_Node = _assign_Style_e4_SD_Node(a_SD)(a_Node);//-> Node/Elem mutated

// OK the above STYLES aVerse:; 
//  USING TEST STUBS:  
//     var a_init_SD_trgt = fut_StylProps_stub;
//     var a_Node = _aDoc_NodeList('.ChptrReadGrps .cur .VerseReadGrps .fut')[0].children[2];
// MUST BECOME Fn(PropertyObj, verseCollection.length, ndx) var propKeys = ['fontSize', 'opacity', 'textAlign']; // list of prop keys:: [fs, op, ta]
//     var trgt_cssStyleDecl = {};var a_Node = _aDoc_NodeList('.ChptrReadGrps .cur .VerseReadGrps .fut')[0].children[2];
//     var propKeys = ['fontSize', 'opacity', 'textAlign']; // list of prop keys:: [fs, op, ta]
//     var trgt_cssStyleDecl = {};

// DO Lists COMPOSE easily?? CAN I REPLACE all the Lists WITH functions???
    // RET = R.equals(key_val_pairs, X); //-> true
    // X = R.pipe(R.zip(_lensKeys_e4_Lst), _SDs_wo_SD_, _reduce_the_SDs)(Lst_propVals_STUB);//-> [ fn, fn, fn]
    // RET = R.equals(SDs_wo_SD_, X);

    CUT = a_SD;
    C_It(CUT);
    MSG = JSON.stringify(CUT);

    var tst_one_set_a = _set_a_SD_e4_SD(Lst_Key_Val_pairs[0])({cve: true});//-> {cve:true, fontSize:"75%"}
    var tst_Lst_fn_SDs_e4_trgtSD = Lst_fn_SDs_e4_trgtSD[0]({}); // -> {fontSize:"75%"}

// ASSERT
    CUT = a_styled_Node;
    KEY = fontSize_Key;
    EXP = '75%';
    TST = R.propEq(KEY, EXP)(CUT);
    STR = `EXP ${KEY}==${EXP} NOT ${R.prop(KEY, CUT)}`;
    console.assert(TST, STR);

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



