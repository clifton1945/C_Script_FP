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
//var R = require('ramda');  //DO NOT USE OR NEED W/ TEST.HTML
var C_Cut, C_Ret, C_Exp, C_Vers, C_NL, C_Arr, C_Msg, One_TAAT;

/**
 * GLOBAL vars
 * require functions-compiled.js, objects-compiled.js
 * */
var book = GET_book();
C_NL = GET_V_Grp_NL(GET_book());
var Tst_DivFut_Vrs4 = C_NL.item(2).children.item(5);
C_Vers = Tst_DivFut_Vrs4;

/**
 * ***** TEST FRAMEWORK **************
 *   a Dashboard for selecting tests,
 */
function main() {
    tst_R_set();
    tst_CHANGE_VerseNodeStyle(true);
    tst_R_when();
    tst_R_Categories();
    tst_passing_strTmpl();
}

/**
 * LEARN R.lens and assoc setters and getters
 ::Object R.over( aLens, aFunction, anArray && maybe aCollection
 ::Object R.lensProp Returns a lens whose focus is the specified property.
 ::Objext R.
 ::Object R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
 ::Object R.lens String k -> Returns Lens
    Returns a lens whose focus is the specified property.
    Returns a lens for the given getter and setter functions. The getter "gets" the value of the focus; the setter "sets" the value of the focus. The setter should not mutate the data structure.
        See also view, set, over, lensIndex, lensProp.
 */
var tst_R_set =  function (tst = false) {
    var smlWtLens = R.lensProp('smlWt');
    var o = TST_StyleObj[2]['smlWt'];
    //C_Both(o);
    var o1 = R.set(smlWtLens, 0.1 , o);  //=> {x: 150, y: 2}
    //C_Both(o1.smlWt);
    console.assert(o1.smlWt === 0.1, `EXP smlWt: 0.1 BUT GOT ${o1.smlWt}`)
};

/**
 * What Function & Arguments TO MODIFY a Verse Node Style ??
 * @param nde
 * @param ndx
 * @param coll
 */
var tst_CHANGE_VerseNodeStyle = function (tst = false) {
    var futLens = R.lensProp('fut');
    C_Both(JSON.stringify(
        R.view(futLens, StyleObj))
    ); // require objects.js
    function CHANGE_VerseNodeStyle (nde, ndx, coll) {
    }
};

/**
 * ONE_TAAT: BUILD StyleTmpl THRU 3_Grps, 1_Grp, N_Verses
 *    START W/ V_Grp_NL -> Verse.style.font.size = StyleTmpl
 *
 *    3_Grps context: args: StyleObj, Verse_Grps_Coll
 *      done TRY R.forEach, R.addIndex
 *    1_Grp context: (args: StyleObj, )
 *          {partial set calcWt_(verse}
 *          (partial set styleTmplt_(styleObj[class])
 *      -> calcWt_, styleTmplt_, verse
 *    N_Verses context:
 *      styleTmplt_
 *      set calcWt(verse)
 *      set styleTmplt( wt )
 *      verse.style.fontSize = styleTmplt
 */
var tst_passing_strTmpl = function (tst = false) {
    var className_ = R.curry(R.prop('className'));
    var tstTmpl_ = ( val, ndx, col ) => `className:${className_( val )} ndx:${ndx}}`;
    // CUT
    var cut = (val, ndx, col) => C_Both(
        tstTmpl_(val, ndx, col)
    );
    var fn = ()=> {
        R_forEachIndexed(
            cut,
            C_NL
        );
    };
    if (tst) fn();
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

    var fn = function () {
        var C_Cut = R.prop('name', (R.prop(1, TST_StyleObj)));
//C_Both(C_Cut);
        C_Exp = 'cur';
        console.assert(C_Cut === C_Exp, `EXP '${C_Exp}' BUT GOT '${C_Cut}'`);
    };
    if (tst) fn();
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
    var fn = ()=> {
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
    };
    if (tst) fn();
};
main();
