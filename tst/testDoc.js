"use strict";

//  *********** DOM  DATA    REQUIRE functions.js
var book = GET_book();
var C_Grp_NL = GET_C_Grp_NL(book);
var V_Grp_NL_ = GET_V_Grp_NL(book);
var Tst_DivFut_Vrs4 = V_Grp_NL_.item(2).children.item(5);

/**
 *   --------------- TEST FUNCTIONS AND TESTS --------------------------
 * */

/**
 * coll_len_gt_1()
 * :: collection -> Bool: t | f
 * @param coll
 * @returns {*}
 */
const coll_len_gt_1 = function coll_len_gt_1(coll) {
    var f = R.pipe(
        R.prop('length')
        , R.dec
        , R.lt(2)
        //TRACE(x=>x)
    );
    return f(coll)
};
var tst_coll_len_gt_1 = function tst_coll_len_gt_1(tst = false) {
    if (tst) {
        C_Both('tst_coll_len_gt_1, EXP NO FAIL. ');
        // TEST: coll_len_gt_1(nodelist)
        console.assert(coll_len_gt_1(V_FUT_NL) && R.not(coll_len_gt_1(V_PST_NL))
            , "FUT:true && PST:false");
        // TEST: coll_len_gt_1(Array of nodes)
        console.assert(coll_len_gt_1(V_FUT_Ar) && R.not(coll_len_gt_1(V_PST_Ar))
            , "FUT:true && PST:false");
    }
};

/**
 * CHANGE_VerseNodeStyle() ::
 * CODE BEGINNING, SIMPLE node:: styleProperty, styleValue, node -> node CHANGED
 * @param propKey
 * @param propVal
 * @param node
 * @returns {*}
 * @constructor
 * TODO REFACT to CHANGE a list of style updates,
 */
const CHANGE_VerseNodeStyle = function (propKey, propVal, node) {
    //R.assoc('color', 'red', node.style); // CHANGES copy NOT node
    node.style[propKey] = propVal; // note: not FP style
    return node
};
var tst_CHANGE_VerseNodeStyle = function (tst = false) {
    if (tst) {
        C_Both(
            `tst_CHANGE_VerseNodeStyle
     EXP TO SEE changes in testDoc.html.`
        );
        var VSO = Tst_DivFut_Vrs4.style;
        //TEST BEFORE
        VSO.fontSize = "200%"; //FORCE fontSize
        VSO.color = "green"; //FORCE fontSize
        var b = R.prop('color', Tst_DivFut_Vrs4.style);
        C_Both("style.before IS " + JSON.stringify(b));
        // TEST  CODE UNDER TEST

        //CHANGE_VerseNodeStyle = function(prop, val, node);
        // REQUIRE set_verse_style.js
        Tst_DivFut_Vrs4 = CHANGE_VerseNodeStyle("color", "red", Tst_DivFut_Vrs4);

        // TEST AFTER
        var a = R.prop('color', Tst_DivFut_Vrs4.style);
        C_Both("style.after IS " + JSON.stringify(a));
        console.assert(a === 'red' && a !== b, "EXP VerseStyle color:'red' NOT ${a}")
    }
};

/**
 * SELECT_StyleConstants_FOR_each_VerseGrp
 * sObj, node, num, NL:[node] -> sObj
 */
const SELECT_StyleConstants_FOR_each_VerseGrp =
    R.curry(function SELECT_StyleConstants_FOR_each_VerseGrp
            (SC, node, ndx, nl) {
            //var so = R.prop(`${ndx}`, SC);
            return R.prop('name', R.prop(`${ndx}`, SC));
        }
    );
var tst_SELECT_StyleConstants_forEach_VerseGrp =
    function tst_SELECT_StyleConstants_forEach_VerseGrp(tst = false) {
        if (tst) {
            C_Both("tst_SELECT_StyleConstants_forEach_VerseGrp");
            // require objects.js StyleConstants
            var tstNL = GET_V_Grp_NL(book);
            var tstStyConst = StyleConstants;
            // CODE UNDER TEST
            var cut = SELECT_StyleConstants_FOR_each_VerseGrp;
            cut = cut(tstStyConst);
            var RET, EXP;
            RET = R.mapObjIndexed(
                cut
                , tstNL
            );
            // TEST
            // EXP see 3 partial style constants in tstDoc
            C_Both('  ' + JSON.stringify(RET));
            //ASSERT
            RET = R.prop('2', RET);
            EXP = "fut";
            console.assert(RET === EXP
                , `EXP ${EXP} NOT ${RET}`);
        }
    };

var tst_R_MapObjIndex_AND_R_forEachIndexed = function (tst = false) {
    var V_GrpsNL = GET_V_Grp_NL(book);
    var V_GrpsAr = [...GET_V_Grp_NL(book)];
    function fn(StyleConstants, V_GrpsNL) {
        var a = R.mapObjIndexed(
            SELECT_StyleConstants_FOR_each_VerseGrp
            , V_GrpsAr
        );
        var b = R_forEachIndexed(
            SELECT_StyleConstants_FOR_each_VerseGrp
            , V_GrpsAr
        );
        C_Both(b);
        console.assert(R.isArray(a, b, `EXP ${a} === ${b}`));
        console.assert(R.equals(a, b, `EXP ${a} === ${b}`));
        return a
    }
};



/**
 *  CODE STRUCTURE
 *
 *    APPLY_fn_({StyGrpsObj},val, ndx, arr )=>{
 *          VrsGrpObj = fn(val, ndx, arr);
 *          StyGrpObj = fn{StyGrpsObj}, [VrsGrpObj])
 *          => [StyGrpObj, VrsGrpObj]}
 *    }
 *    , TOEACH_ [VrsGrpsNL]
 *    , RETURN -> [[StyGrpObj, VrsGrpObj], ... [SGO, VGO]]
 *
 *
 *    APPLY_fn_([SGO}, VGO]=>{
 *          VrsStyleWt:: (StyGrpObj, VrsObj) -> { };
 *          CHANGE_VrsNodeSty [StyUpdateArr], {VrsObj} ->
 *    , TOEACH [[StyGrpObj, VrsGrpObj], ... [SGO, VGO]])
 *    ->[[][][]...[]]
 *
 *
 */

/**
 *   ---------------------------TESTS -------------------------------
 * */
/**
 * ***** TEST FRAMEWORK **************
 *   a Dashboard for selecting tests,
 */
function main() {
    tst_R_MapObjIndex_AND_R_forEachIndexed();
    tst_SELECT_StyleConstants_forEach_VerseGrp();
    tst_CHANGE_VerseNodeStyle(); // require set_verse_styles.js
    tst_coll_len_gt_1();
}
//  ------------------ TEST FUNCTIONS ------------
/**
 * *** TESTING just testDoc.html Events
 */
main();
//SET_All_Verse_Styles(V_Grp_NL_);
BindHandlers(book);


/**
 *    --------------- OLD  CODE FOR STYLING Verses  ------------
 */
/**
 * :: nodeNdx[Int], nodeColl[collection] -> wt [Int]
 * @param ndx
 * @param arr
 * @returns {number}
 */
var fCALC_Wt = (ndx, arr)=> {

    var lrgWt = .9;
    var smlWt = .5;
    let delta = lrgWt - smlWt;
    let len = arr.length - 1;  // OR nl.childElementCount
    return (len > 1)
        // below is code for CUR|FUT>>fut:start large grow smaller.
        ? lrgWt - delta / len * ndx
        : lrgWt;  // ALWAYS lrgWt:
    // below is code for CUR|CUR>>CUR:
    //? smlWt + delta / len * ndx
    //: lrgWt;  // ALWAYS lrgWt:
    // below is code for pst>>PST|CUR. start small grow larger..
    //? smlWt + delta / len * ndx
    //: lrgWt;  // ALWAYS lrgWt:

}; // -> wt Int
//
/**
 * :: [Int] index of verse Node, [Obj]verses NodeList -> [Str]style
 * @param nodeNdx
 * @param NL
 * @returns {*}
 */
var fSET_Style_Str = function fSET_style_Str(nodeNdx, NL) {
    //:: Vndx, NL->Style Str
    return `${fCALC_Wt(nodeNdx, NL) * 100}%`
}; // [Str] style string
/**
 * :: Node, vNdx, NL -> RESTYLED vNode
 * @param vNode
 * @param ndx
 * @param arr
 * @returns {*}
 * @constructor
 */
var RESTYLE_1_verse = function RESTYLE_1_verse(vNode, ndx, arr) {
    vNode.style.fontSize = fSET_Style_Str(ndx, arr);
    return vNode;
}; // -> UPDATED vNode.style
//*** var MAP_
//
//var VerseArr = R.mapObjIndexed(RESTYLE_1_verse, V_FUT_NL); // fn, NL->NL
////  TEST
