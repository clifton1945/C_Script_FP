/**
 * PURPOSE OF ramda_tests.js: centered on finding and testing Ramda tools.
 * Status 2/25/2016
 * NOW
 *  new, workable TEST Framework FOR INVOKING individual Tests.
 *      tst_passing_strTmpl WIP only, keep to remind me if I go back to this style
 *      tst_R_Categories && tst_R_when Stable && Useful
 * NEXT
 *   start Again on my current undestanding if FP:
 *          START WITH the Action I want FOR a Node.
 *          In this case: START BY -- CHANGE the Style OF a VerseNode !!
 * Created by CLIF on 1/29/2016.
 */
"use strict";

/**
 * ***** TEST FRAMEWORK **************
 *   a Dashboard for selecting tests,
 */
function main() {
    tst_R_set();
    tst_R_Categories(true);
    tst_R_when();
}
// ***********************************

//var R = require('ramda');  //DO NOT USE OR NEED W/ TEST.HTML
var C_Cut, C_Ret, C_Exp, C_Verse, C_NL, C_Arr, C_Msg, One_TAAT;

/**
 * GLOBAL vars
 * require functions-compiled.js, objects-compiled.js
 * */
var book = GET_book();
C_NL = GET_V_Grp_NL(GET_book());
var Tst_DivFut_Vrs4 = C_NL.item(2).children.item(5);
C_Verse = Tst_DivFut_Vrs4;


//
//var tst_CHANGE_VerseNodeStyle = function (tst = false) {
//    // DID NOT USE lens
//    //var classLens = R.lensProp('class');
//    //var styleLens = R.lensProp('style');
//    //var colorLens = R.lensProp('color');
//    ////var futLens = R.lensProp('fut');
//    //var fontSizeLens = R.lensProp('fontSize');
//    //var so_ = (n) => n.style;
//    if (tst) {
//        var VSO = C_Verse.style;
//        // CODE UNDER TEST
//        //function CHANGE_VerseNodeStyle(prop, val, node) {
//        //    // below CHANGES copy NOT node
//        //    //R.assoc('color', 'red', node.style);
//        //    node.style[prop] = val;
//        //    return node
//        //}
//        //TEST BEFORE
//        VSO.fontSize = "200%"; //FORCE fontSize
//        VSO.color = "green"; //FORCE fontSize
//        var b = R.prop('color', C_Verse.style);
//        C_Both("style.before " + JSON.stringify(b));
//        // TEST  CODE UNDER TEST
//
//        //CHANGE_VerseNodeStyle = function(prop, val, node);
//        // REQUIRE set_verse_style.js
//        C_Verse = CHANGE_VerseNodeStyle("color", "red", C_Verse);
//
//        // TEST AFTER
//        var a = R.prop('color', C_Verse.style);
//        C_Both("style.after " + JSON.stringify(a));
//        console.assert(a === 'red' && a !== b, "EXP VerseStyle color:'red' NOT ${a}")
//    }
//};
//

/**
 * LEARN R.set and assoc setters and getters
 ::Object R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}

 ::Object R.assoc() IS SETTER TO R.prop() GETTER.
 Makes a shallow clone of an object, setting or overriding the specified property with the given value. Note that this copies and flattens prototype properties onto the new object as well. All non-primitive properties are copied by reference.

 See also dissoc
 ::Object R.over( aLens, aFunction, anArray && maybe aCollection
 ::Object R.lensProp Returns a lens whose focus is the specified property.
 ::Objext R.view see all of the object defined by lensProp
 ::Object R.lens String k -> Returns Lens
 Returns a lens whose focus is the specified property.
 Returns a lens for the given getter and setter functions. The getter "gets" the value of the focus; the setter "sets" the value of the focus. The setter should not mutate the data structure.
 See also view, set, over, lensIndex, lensProp.
 */
var tst_R_set = function (tst = false) {
    if (tst) {
        var xLens = R.lensProp('x');
        var a = {x: 1, y: 2};
        var b = R.set(xLens, 4, a);  //=> {x: 4, y: 2}
        C_Both(JSON.stringify(a)); // STILL Same
        C_Both(JSON.stringify(b)); // NEW !!
        console.assert(R.not(R.eqProps('x', a, b))
            , "EXP R.set() DOES NOT CHANGE the original 'a'.");

        var smlWtLens = R.lensProp('smlWt');
        var o = TST_StyleObj[2]['smlWt'];
        C_Both(o);
        var o1 = R.set(smlWtLens, 0.1, o);  //=> {x: 150, y: 2}
        //C_Both(o1.smlWt);
        console.assert(o1.smlWt === 0.1, `EXP smlWt: 0.1 BUT GOT ${o1.smlWt}`)
    }
};

/**
 * LOOKS LIKE R.xxx ARE categorized by their return OR
 * what they ARE in the case of Category:Function
 * R.propSatisfies() -> Category.Logic
 * R.prop() ->    Category: 'Object'
 * NOTE: NEED 2 R.prop() TO GET TST_StyleObj.1.name!!
 * BUT
 * R.apply function TO argument WHICH can return anything
 * SO
 * R type function && R.type Object
 */
var tst_R_Categories = function (tst = false) {
    if (tst) {
        var C_Cut = R.prop('name', (R.prop(1, TST_StyleObj)));
        C_Both(C_Cut);
        C_Exp = 'cur';
        console.assert(C_Cut === C_Exp, `EXP '${C_Exp}' BUT GOT '${C_Cut}'`);
    }
};

/**
 * LEARNING R.when()
 * when argument NL[XXX].childElementCount > 0 IS satisfied
 * , PASS NL to READ_ Last() || Next()
 * IF NOT, just return the NL arg
 * CAM_READ :: coll -> Bool
 *
 */
var tst_R_when = function (tst = false) {
    if (tst) {
        var CAN_READ = R.propSatisfies(R.gt(R.__, 0), 'length');
        var READ_XXX = function READ_XXX(NL) { // coll ->
            return NL.length;
        };
        C_Arr = [[], [2, 2, 2], [3]];
        var READ__ = R.when(CAN_READ, READ_XXX);
        C_Msg = 'READ_ = R.when(CAN_READ, READ_XXX) -> ';
        C_Msg += R.toString(READ__(C_Arr[0])) + ', ';
        C_Msg += R.toString(READ__(C_Arr[1])) + ', ';
        C_Msg += R.toString(READ__(C_Arr[2])) + ', ';
        C_Both(C_Msg);
    }
};
main();
