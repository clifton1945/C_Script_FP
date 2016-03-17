"use strict";

/**
 * ***** TEST FRAMEWORK **************
 *   a Dashboard for selecting tests,
 */
function main() {
    var all = false;
    tst_MESS_WITH_DOM(true);
    //tst_COMBINE_VGrp_Style_List_AND_VGrp_Verse_List_INTO_VGrp_List(all);
    //tst_SEPARATE_StyleConst_BY_VGrpClass_INTO_List(all);
    //tst_SELECT_StyleConstants_forEach_VerseGrp(all);
    //tst_CHANGE_VerseNodeStyle(all); // require STYLE_Verses.js
    ////tst_coll_len_gt_1(all);
}

/**
 * GLOBAL vars
 * require functions-compiled.js, objects-compiled.js
 * */
//  *********** DOM  DATA    REQUIRE functions.js
var book = GET_book();
//var V_Grp_Tmpl = '.book .ChptrReadGrps .cur  .VerseReadGrps > div';
//var VG_NL = GET_V_Grp_NL(GET_book());
//var VG_AR = [...VG_NL];
//var C_Grp_NL = GET_C_Grp_NL(book);
//var V_Grp_NL_ = GET_V_Grp_NL(book);
//var Tst_DivFut_Vrs4 = V_Grp_NL_.item(2).children.item(5);
var MSG = '';

/**
 *   --------------- TEST REQUIRED FUNCTIONS  --------------------------
 * */

/**
 * SEPARATE_StyleConst_BY_VGrpClass_INTO_List
 * @param StyObj
 * @returns {*}
 * @constructor
 */
const SEPARATE_StyleConst_BY_VGrpClass_INTO_List = function (StyObj) {
    var PST = 0, CUR = 1, FUT = 2;
    let f_ = (n)=> {
        return StyObj[n]
    };
    return R.map(f_, [PST, CUR, FUT]);  // note GIVEN LIST:[INT] -> [OBJ]
};
/**
 * TRANSFORM_VGrp_NL_INTO_Vrs_List:: {} -> []
 * @returns {*}
 * @constructor
 */
const TRANSFORM_VGrp_NL_INTO_Vrs_List = function (NL) {
    let f_ = (val, key, obj)=> NL[key].children;
    return R_forEachIndexed(f_, NL);
};
/**
 * Get all descendants that match selector
 * cssQuery :: String -> Node -> NodeList
 * Note: NodeList is array-like so you can run ramda list functions on it.
 */
const cssQuery = R.invoker(1, 'querySelectorAll');
/**
 * Mutate style properties on an element
 */
const setStyle = R.curry( (value, node) => {
        return Object.assign(
            node.style, value)
    });

var V_Grp_Tmpl = '.book .ChptrReadGrps .cur  .VerseReadGrps > .fut ';

/**
 *   --------------- CURRENT TEST --------------------------
 * */
/**
 * tst_MESS_WITH_DOM
 * NOTE: IN js, UNPACKING IS CALLED Destructuring
 * @param tst
 */
var tst_MESS_WITH_DOM;
tst_MESS_WITH_DOM = function (tst = false) {
    var tstCode = function () {
        MSG = 'tst_MESS_WITH_DOM ....';
        // TRACE FUNCTIONS
        var RET1, RET2;
        // TESTING CODE

        var V_Grp_Tmpl = '.book .ChptrReadGrps .cur  .VerseReadGrps > .fut > .vers';
        var anElem__ = R.curry((tmplStr, elem)=> elem.querySelector(tmplStr));
        RET1 = anElem__(V_Grp_Tmpl, document);

        var a_Coll__ =  R.invoker(1, 'querySelectorAll');
        RET2 = R.compose(
            TRACE('after a_Coll'),
            a_Coll__('.cur  .VerseReadGrps > .fut > .vers')
        )(document);



        // lens ??
        var clsLens = R.lens(R.prop('class'), R.assoc('class'));

        var CUT = R.pipe(
            cssQuery(V_Grp_Tmpl),
            R.map(setStyle({
                    backgroundColor: "rgba(145, 248, 29, 0.29)"
                    , opacity: ".5"
                    , fontSize: "50%"
                }))
        )(document);

        C_Both(MSG);
        return CUT
    };
    tstCode();
};


//  ------------------ INVOkE TEST ------------
main();
