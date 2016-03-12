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
 *
 * @param tst
 */
var tst_MESS_WITH_DOM = function (tst = false) {
    var tstCode = function () {
        MSG = 'tst_MESS...DOM..';
        // TRACING FUNCTIONS

        // TESTING CODE SET multiple Attributes AT one time.

        /**
         * SET Template FOR Selector Verses Cls
         * :: Str: Cls.class -> Str
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
         * CALC StyleObj_ Weight.It IS unique forEach VerseClass AND VerseNode.
         * :: (StyleObj, VerseObj) -> Int: 0 < weight   though max should be near 1
         * @constructor
         * @private
         * @param SObj IS VClassStyleObj
         * @param VObj
         */
        var CALC_VerseNode_Weight__ = (SObj, VObj) => {
            return 0.75;    // FIX STUB
        };

        // TEST

        /**
         * SET Style Object OF a Property FOR this Verse
         * :: StyleObj, Wt -> {Obj}
         * @returns {Obj}
         * @constructor
         * @private
         * @param propFrmt
         * @param propName
         */
        var a_Style_PropertyObj__ = R.curry((propName, propFrmt) => {
            return {[propName]: propFrmt};
        });
        // NOTE: JS DOM Nodes ARE Objects AND HAVE Properties;
        // NOTE:    DOM Nodes PROVIDES ACCESS TO HTML attributes.
        //          Node.StyleObjects HAVE Properties

        MSG = ' SET_Style_Properties -> ';
        var fn = (w) =>  `${w}`;
        var fn1 = (w) => `${ w * 100}%`;

        var TST_WT = .6; // TRACE

        var StyleObj_opacity_ = (wt)=> a_Style_PropertyObj__('opacity', fn(wt));
        var StyleObj_fontSize_ = (wt)=> a_Style_PropertyObj__('fontSize', fn1(wt));
        var StyleObj_background_color = a_Style_PropertyObj__('background-color', 'rgba(145, 248, 29, 0.29)');

        /**
         * Style_PropsObj_:: (->a) -> [a,b,c]
         */
        var Style_PropsObj_ = function Style_PropsObj_(wt) {
            R.mergeAll(
                [
                    StyleObj_opacity_(wt), []
                    , StyleObj_fontSize_(wt)
                    , StyleObj_background_color
                ])
        };
        /**
         * Mutate style properties on an element
         */
        var setStyle__ = R.curry(
            (obj, node) => {
                var f = Object.assign(
                    node.style, obj);
                return f
            }
        );

        /**
         * set_Style_::  PRELOADED setStyle__(VerseWt) WAITS node
         */
        var setStyle_ = setStyle__(Style_PropsObj_(TST_WT));



        MSG = '\nStyle_PropsObj->' + JSON.stringify(Style_PropsObj_(TST_WT));

        /**
         * STYLE a Verse IN a Verse Class AS a function OF Verse Class AND Verse StyleObj_ Weight
         *    this INCLUDES
         *    select a Cls.class:: Str: pst||cur||fut
         *    set StyleObj for this cls
         *    set forEach verse in class
         *      create a VerseObj::{node:, ndx:, coll:}
         *      calc the style weight:: ( styleObj, VerseObj) -> Float: weight
         *      set the style template
         *      set the Node.style
         *
         */
        R.pipe(
            cssQuery(SET_V_Grp_Tmpl_('fut')),
            R.map(setStyle_())
        )(document);
        // TRACE
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
    return map(f_, [PST, CUR, FUT]);  // note GIVEN LIST:[INT] -> [OBJ]
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

