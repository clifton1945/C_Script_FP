"use strict";

/**
 * ***** TEST FRAMEWORK **************
 *   a Dashboard for selecting tests,
 */
function main() {
    var all = false;
    tst_DOM_Vrs_STYLED(true);
}

/**
 * GLOBAL vars
 * require functions-compiled.js, objects-compiled.js
 * */
//var MSG = '';
//  *********** DOM  DATA    REQUIRE functions.js
//var book = GET_book();
// DEPRECATE var V_Grp_Tmpl = '.book .ChptrReadGrps .cur  .VerseReadGrps > div';
//var V_Grp_Tmpl = '.cur  .VerseReadGrps > div';

/**
 *   --------------- CURRENT TEST --------------------------
 * */
/**
 * tst_DOM_Vrs_STYLED
 *
 * @param tst
 */
var tst_DOM_Vrs_STYLED = function (tst = false) {
    var tstCode = function () {
        var MSG = 'tst_MESS...DOM..';
        // TRACING FUNCTIONS
        var tstSObj_Wt;

        // TESTING CODE FOR

        /**
         * SET Template FOR Selector Verses Cls
         * :: Str: Cls.class -> Str
         * @param cls
         * @constructor
         * @private
         *
         * WAS BEFORE this function       //var V_Grp_Tmpl = '.book .ChptrReadGrps .cur  .VerseReadGrps > .fut';
         */
        var VrsClass_SET_TO_ = (cls) => ` .cur  .VerseReadGrps > .${cls}`;

        /**
         * Get all descendants that match selector
         * invoker:: Number -> String -> (a -> b ->...-> n -> Object -> *)
         * VerseClassElem :: String -> Node -> NodeList
         * Note: NodeList is array-like so you can run ramda list functions on it.
         */
        var VerseClassElem = R.invoker(1, 'querySelectorAll');

        // TESTS

        /** NOTE: Properties AND Attributes
         * JS DOM Nodes ARE Objects AND HAVE Properties;
         * DOM Nodes PROVIDES ACCESS TO HTML attributes.
         * Node.StyleObjects HAVE Properties
        */

        /**
         * CALC VerseObj_ StyleWeight. It IS unique forEach VerseClass AND VerseNode.
         * :: (StyleObj, VerseObj) -> Int: 0 < weight   though max should be near 1
         * @constructor
         * @private
         * @param SObj IS one of the three VClass_StyleObj s pst, cur, fut
         * @param VObj IS VClass_VerseObj -> val,ndx, col
         */
        const VrsStyl_Wt__ = R.curry(
            (SObj, VObj) => {
                // LOCAL TESTING   return IS STUB
                // NOTE:  (1) CAN CHANGE lrgWt and SmlWT to closWt and farWt TO cut out sign change
                var s = SObj;
                var v = VObj
                return Math.random(); // test STUB
            });
        const VrsStyl_Wt = () => {
                // LOCAL TESTING   return IS STUB
                // NOTE:  (1) CAN CHANGE lrgWt and SmlWT to closWt and farWt TO cut out sign change
                return Math.random(); // test STUB
            };

        /**
         * calcWeight_StyleCls_  ????????????????
         * @param clsID
         * @returns {*}
         * @private

        const calcWeight_StyleCls_ =
            function calcWeight_StyleCls_(clsID) {
                return calcWeight__(R.prop(clsID), StyleObj);
            };

        // TESTING  the above is a STUB: the_StyleObj WILL already BE a Class: pst || cur || fut
        C_Both(
            calcWeight_StyleCls_('cur', {})
        );
         */

        MSG += '\n SET_Style_Properties -> ';
        /**
         * style object formats
         * @param w
         */
        var styFmt1 = (w) =>  `${w}`;
        var styFmt2 = (w) => `${ w * 100}%`;

        /**
         *  this_VrsProp_IS_
         */
        var this_VrsProp_IS_ = (a) => a; // STUB TESTING

        /**
         * a_Style_PropertyObj__
         * :: StyleObj, Wt -> {Obj}
         * @returns {Obj}
         * @constructor
         * @private
         * @param propFrmt
         * @param propName
         */
        var a_Style_PropertyObj__ = R.curry (
            function (propName, propFrmt) {
                return {[propName]: propFrmt }; // an Object
            });

        /**
         * a_StylePropObj_(style weight)
         * R.compose(a_Style_PropertyObj__, this_VrsProp_IS_ )
         * @type {Function|*}
         * @private
         */
        var a_StylePropObj_ = R.compose(
            a_Style_PropertyObj__,
            this_VrsProp_IS_
        );

        //var a_StylePropObj= R.compose(
        //    a_StylePropObj_,
        //    VrsStyl_Wt
        //);
        var StyleObj_opacity_  = a_StylePropObj_('opacity', styFmt1);
        var StyleObj_fontSize_ = a_StylePropObj_('fontSize', styFmt2);
        var StyleObj_background_color_ = a_StylePropObj_('background-color', 'rgba(145, 248, 29, 0.29)');

        /**
         * Style_PropsObj_:: (->a) -> [a,b,c]
         */
        var Style_PropsObj_ = function Style_PropsObj_ () {
            return R.mergeAll(
                [
                    StyleObj_opacity_, []
                    , StyleObj_fontSize_
                    , StyleObj_background_color
                ])
        };

        /**
         * // -----------------TEST_THIS: a_Style_PropertyOb-------------------------------
         * @constructor
         */
        var TEST_THIS = () => {
        MSG += '\na_StylePropObj->'
                + JSON.stringify(StyleObj_opacity_(.555))
                + ", "
                + JSON.stringify(StyleObj_fontSize_(.444))
                + ", "
                + JSON.stringify(StyleObj_background_color_())
            ;
        C_Both(MSG);
        MSG = '';
        // ------------------------------------------------
        };
        TEST_THIS();
        //BELOW HERE Code IS FOR MODIFYING theDom


        /**
         * Mutate style properties on an element
         */
        var setStyle_2_ = R.curry(
            (obj, node) => {
                var f = Object.assign(
                    node.style, obj);
                return f
            }
        );

        /**
         * set_Style_::  PRELOADED setStyle_2_(VerseWt) WAITS node
         */
        var VrsStyle_SET_BY_ = (Wt, obj, node)=> R.curry(setStyle_2_(Style_PropsObj_(Wt)));

        //calcWeight_StyleCls_('fut');


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
        var VerseStyle_SET_ = R.pipe(
            // TEST STUB: calcWeight_StyleCls_ IS HARD CODED TO BE 'fut' AND NOT LOOK FOR VObj
            VerseClassElem(VrsClass_SET_TO_('fut')),
            R.map(VrsStyle_SET_BY_(
                    calcWeight_StyleCls_({})
                )
            )
        );
        //
        C_Both(MSG);
        return VerseStyle_SET_(document);
    };
    tstCode();
};

//  ------------------ INVOKE TEST ------------
main();

