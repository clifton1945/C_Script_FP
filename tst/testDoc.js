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
var V_Grp_Tmpl = '.book .ChptrReadGrps .cur  .VerseReadGrps > div';
//var VG_NL = GET_V_Grp_NL(GET_book());
//var VG_AR = [...VG_NL];
//var C_Grp_NL = GET_C_Grp_NL(book);
//var V_Grp_NL_ = GET_V_Grp_NL(book);
//var Tst_DivFut_Vrs4 = V_Grp_NL_.item(2).children.item(5);
var MSG = '';


/**
 *   --------------- CURRENT TEST --------------------------
 * */

// TESTING
//var curried_dLo_L_AND_L_ = R.curry(dLo_SC_L_AND_V_L_);
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
        var listLength_ = (l)=> {
            MSG += `   List.len: ${l.length}, `;
        };  // return is thrown away - so forget return

        // TESTING CODE SET multiple Attributes AT one time.
        /**
         * SET Selector Verses Class
         * @param cls
         * @constructor
         * @private
         *
         * WAS BEFORE this function       //var V_Grp_Tmpl = '.book .ChptrReadGrps .cur  .VerseReadGrps > .fut';
         */
        var SET_V_Grp_Tmpl_ = (cls) => ` .cur  .VerseReadGrps > .${cls}`;

        /**
         * Get all descendants that match selector
         * cssQuery :: String -> Node -> NodeList
         * Note: NodeList is array-like so you can run ramda list functions on it.
         */
        var cssQuery = R.invoker(1, 'querySelectorAll');

        /**
         * Mutate style properties on an element
         */
        var setStyle = R.curry(
            (value, node) => {
                return Object.assign(
                    node.style, value)
            }
        );

        // STYLE all (cls) verses TO  light green
        R.pipe(
            cssQuery(SET_V_Grp_Tmpl_ ('pst')),
            R.map(setStyle(
                {
                    backgroundColor: "rgba(145, 248, 29, 0.29)"
                    , opacity: ".5"
                    , fontSize: "50%"
                }))
        )(document);

        C_Both(MSG);
    };
    tstCode();
};


//  ------------------ INVOkE TEST ------------
main();

/**
 *   --------------- TEST MAYBE USEFUL FUNCTIONS LATER --------------------------
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

