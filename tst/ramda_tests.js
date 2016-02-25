/**
 * Created by CLIF on 1/29/2016.
 */
"use strict";
//var R = require('ramda');  //DO NOT USE OR NEED W/ TEST.HTML
var C_Cut, C_Ret, C_Exp, C_NL, C_Arr, C_Msg, TAAT;

/**
 * GLOBAL vars
 * require functions-compiled.js, objects-compiled.js
 * */
var book = GET_book();
C_NL = GET_V_Grp_NL(GET_book());
var StyleO = TST_StyleObj;
/**
 * ***** TEST FRAMEWORK **************
 */
function main() {
    tst_passing_strTmpl(true);
    tst_R_Categories();
    tst_R_when();
}

/**
 * ONE_TAAT: BUILD StyleTmpl THRU 3_Grps, 1_Grp, N_Verses
 *    START W/ V_Grp_NL -> Verse.style.font.size = StyleTmpl
 *
 *    first:TRY R.forEach, R.addIndex
 */
var tst_passing_strTmpl = function (tst = false) {
    var fn = (y)=> {
        C_Cut = R.forEach(
            (x)=>C_Both(
                R.prop('className', x)
            ),
            C_NL
        )
    };
    if (tst) fn();
};

/**
 * LOOKS LIKE R.xxx ARE categorized by their return OR
 * what they ARE in the case of Category:Function
 * R.propSatisfies() -> Category.Logic
 * R.prop() ->    Category: 'Object'
 * NOTE: NEED 2 R.prop() TO GET StyleO.1.name!!
 * BUT
 * R.apply function TO argument WHICH can return anything
 * SO
 * R type function && R.type Object
 */
var tst_R_Categories = function (tst = false) {

    var fn = function () {
        var C_Cut = R.prop('name', (R.prop(1, StyleO)));
//C_Both(C_Cut);
        C_Exp = 'cur';
        console.assert(C_Cut === C_Exp, `EXP '${C_Exp}' GOT '${C_Cut}'`);
    };
    R.when(fn, tst);
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
    R.when(fn, tst)
};
main();

