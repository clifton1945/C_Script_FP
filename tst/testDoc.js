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
//var book = GET_book();
// DEPRECATE var V_Grp_Tmpl = '.book .ChptrReadGrps .cur  .VerseReadGrps > div';
//var V_Grp_Tmpl = '.cur  .VerseReadGrps > div';

var MSG = '';

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

        // TESTING CODE SET multiple Attributes AT one time.

        /**
         * SET Template FOR Selector Verses Class
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
         * SET Template OF Style Properties FOR this Verse
         * @param opc opacity as 0 < Int <= 1.
         * @param fs fontSize as  0< Int.
         * @param col color as css.
         * @returns {{backgroundColor: *, opacity: *, fontSize: *}}
         * @constructor
         * @private
         */
        var SET_Style_Tmpl_ = (opc=1,  fs=100, col=`rgba(145, 248, 29, 0.29)`) => {
            return {
                backgroundColor: `${col}`
                    , opacity: `${opc}`
                , fontSize: `${fs}%`
            }
        };

        /**
         * Mutate style properties on an element
         */
        var setStyle = R.curry(
            (value, node) => {
                return Object.assign(
                    node.style, value)
            }
        );

        /**
         * STYLE all (cls) verses BY Style Template
         */
        R.pipe(
            cssQuery(SET_V_Grp_Tmpl_ ('fut')),
            R.map(setStyle(
                SET_Style_Tmpl_(.6, 125)
                ))
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

