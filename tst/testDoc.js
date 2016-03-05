"use strict";

/**
 * ***** TEST FRAMEWORK **************
 *   a Dashboard for selecting tests,
 */
function main() {
    var all = false;
    tst_fn_FOR_VGrp_Style_List_AND_VGrp_Verse_List_FROM_VGrp_List(true);
    tst_COMBINE_VGrp_Style_List_AND_VGrp_Verse_List_INTO_VGrp_List(all);
    tst_SEPARATE_StyleConst_BY_VGrpClass_INTO_List(all);
    tst_R_MapObjIndex_AND_R_forEachIndexed(true);
    tst_SELECT_StyleConstants_forEach_VerseGrp(all);
    tst_CHANGE_VerseNodeStyle(all); // require set_verse_styles.js
    tst_coll_len_gt_1(all);
}

/**
 * GLOBAL vars
 * require functions-compiled.js, objects-compiled.js
 * */
//  *********** DOM  DATA    REQUIRE functions.js
var book = GET_book();
var VG_NL = GET_V_Grp_NL(GET_book());
var VG_AR = [...VG_NL];
var C_Grp_NL = GET_C_Grp_NL(book);
var V_Grp_NL_ = GET_V_Grp_NL(book);
var Tst_DivFut_Vrs4 = V_Grp_NL_.item(2).children.item(5);
var TRACE = '';

/**
 *   --------------- TEST FUNCTIONS  --------------------------
 * */
const SEPARATE_StyleConst_BY_VGrpClass_INTO_List = function () {
    var PST = 0, CUR = 1, FUT = 2;
    let f_ = (n)=> {
        return StyleConstants[n]
    };
    return R.map(f_, [PST, CUR, FUT]);
};
const COMBINE_VGrp_Style_List_AND_VGrp_Verse_List_INTO_VGrp_List = function () {
    // TRACING
    //var so = SEPARATE_StyleConst_BY_VGrpClass_INTO_List();
    //var vo = VG_AR;
    //var ret = R.zip(so, vo);
    //MSG += `   styleGrp:${
    //    R.prop('name', R.prop('2', so))
    //    }, verseGrp:${
    //    R.prop('className', R.prop('2', vo))
    //    }`;
    //  PRODUCTION
    return R.zip(
        SEPARATE_StyleConst_BY_VGrpClass_INTO_List()
        , VG_AR
    );
};

/**
 *   --------------- TESTS --------------------------
 * */
/**
 * tst_fn_FOR_VGrp_Style_List_AND_VGrp_Verse_List_FROM_VGrp_List
 * NOTE: IN js, UNPACKING IS CALLED Destructuring
 * @param tst
 */
var tst_fn_FOR_VGrp_Style_List_AND_VGrp_Verse_List_FROM_VGrp_List = function (tst = false) {
    if (tst) {
        var tstCode, tmpl, ret, exp, TRACE = 'tst_UNPACK_....';
        var tstVGrp_List = COMBINE_VGrp_Style_List_AND_VGrp_Verse_List_INTO_VGrp_List(
            StyleConstants, VG_AR);


        /**
         * TRACE_each_VerseNode
         * @param obj
         * @param ndx
         * @param col
         * @return {*}
         */
        var TRACE_each_VGrp_VrsObj_ = function (obj, ndx, col) {
            tmpl = `\n    V[${ndx}]:${JSON.stringify(obj.innerHTML)}`;
            TRACE += tmpl;
            return obj
        };
        var TRACE_each_VGrp_StyObj_ = function (obj, ndx, col) {
            tmpl = `\n-> S[${ndx}]:${JSON.stringify(R.prop('name', obj))}`;
            TRACE += tmpl;
            return obj
        };
        var CONVERT_VGrp_Vrs_TO_Vrs_ = function (grp_obj) {
            return R.prop('children', grp_obj)
        };
        var TRACE_eachOf_3_VGrps_ = function (list) {
            var [VGrp_SO, VGrp_V] = list; // UNPACK both style and verses VGrps.
            var VrsList = CONVERT_VGrp_Vrs_TO_Vrs_(VGrp_V);
            tmpl = ` SO:[${R.prop('name', VGrp_SO)}], VO:[${R.prop('className', VrsList)}]`;
            TRACE += `\n-> ${tmpl}, , ... `;
            ret = R_forEachIndexed(TRACE_each_VGrp_StyObj_, VGrp_SO);
            ret = R_forEachIndexed(TRACE_each_VGrp_VrsObj_, VrsList);
            return ret
        };
        // ---------------  tstCode
        tstCode = (list) => {
            return R_forEachIndexed(TRACE_eachOf_3_VGrps_, list); //-> orig list
        };
        //INVOKE tstCode
        ret = tstCode(tstVGrp_List);
        // TRACE TRACE
        C_Both(TRACE);

    }
};


/**
 * tst_COMBINE_VGrp_Style_List_AND_VGrp_Verse_List_INTO_VGrp_List
 * @param tst
 */
var tst_COMBINE_VGrp_Style_List_AND_VGrp_Verse_List_INTO_VGrp_List = function (tst = false) {
    if (tst) {
        var f_, tstCode, ret, exp
            , TRACE = 'tst_COMBINE_VGrp_Style_List_AND_VGrp_Verse_List_INTO_VGrp_List';

        tstCode = function () {
            ret = COMBINE_VGrp_Style_List_AND_VGrp_Verse_List_INTO_VGrp_List();
            var a = R.isArrayLike(ret);
            var b = R.length(ret);
            console.assert(a && b === 3
                , `EXP isArrayLike[${a}] && length[${b}]== 3:almost impossible to fail this.`);
            //TRACE += ` -> ${JSON.stringify(ret)}, `;
            return TRACE
        };
        // TRACE TRACE
        C_Both(tstCode());
        // tst_COMBINE_VGrp_Style_List_AND_VGrp_Verse_List_INTO_VGrp_List->
    }
};

/**
 * tst_SEPARATE_StyleConst_BY_VGrpClass_INTO_List
 * @param tst
 */
var tst_SEPARATE_StyleConst_BY_VGrpClass_INTO_List = function (tst = false) {
    var f_, tstCode, ret, exp;
    if (tst) {
        tstCode = function () {
            TRACE = `\n..tst_SEPARATE_StyleConst_BY_VGrpClass_INTO_List`;
            //const SEPARATE_StyleConst_BY_VGrpClass_INTO_List = function () {
            //    var PST = 0, CUR = 1, FUT = 2;
            //    f_ = (n)=> {
            //        return StyleConstants[n]
            //    };
            //    return R.map(f_, [PST, CUR, FUT]);
            //};
            ret = SEPARATE_StyleConst_BY_VGrpClass_INTO_List();
            //..tst_R_zip:: -> [[1,"a"],[2,"b"],[3,"c"]],
            TRACE += ` -> ${JSON.stringify(ret)}, `;
            return TRACE
        };
        // TRACE MSG
        C_Both(tstCode());
        // ....tst_SEPARATE_StyleConst_BY_VGrpClass_INTO_List-> [{"name":"pst","smlWt":0.4,"lrgWt":0.95}, ....]
    }
};

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
//  ------------------ INVOLE TEST ------------
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

