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
var MSG;

/**
 * ----- LEARN R.tst_R_zip_Obj_With -----
 * zip:[a]->[b]->[[a,b]]
 * zipObj:: [String]->[*] -> [String:*]
 * zipWith:: (a,b -> c)->[a]->[b]->[c]
 * @param x
 * @param y
 */
var tst_R_zip_Obj_With = function (tst = false) {
    var f, ret, exp;
    if (tst) {

        MSG = `..tst_R_zip::`;
        ret = R.zip([1, 2, 3], ['a', 'b', 'c']);
        //..tst_R_zip:: -> [[1,"a"],[2,"b"],[3,"c"]],
        MSG += ` -> ${JSON.stringify(ret)}, `;

        MSG += `\n..${'tst_R_Obj::'}`;
        ret = R.zipObj(['a', 'b', 'c'], [1, 2, 3]);
        //..tst_R_Obj:: -> {"a":1,"b":2,"c":3},
        MSG += ` -> ${JSON.stringify(ret)}, `;

        MSG += `\n..${'tst_R_zip_With::'}`;
        f = (a, b) => {
            return [R.add(a, 10), R.toUpper(b)]
        };
        ret = R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
        //..tst_R_zip_Obj_With:: -> [[11,"A"],[12,"B"],[13,"C"]],
        MSG += ` -> ${JSON.stringify(ret)}, `;

        MSG += `\n..${'tst_R_zip_With::'}`;
        f = (aObj, bObj) => {
            return [R.prop('big', R.prop('ndx'))]
        };
        var aLst = [{1:{big: .5}}, {2:{big:1.25}}, {3:{big:.75}}];
        var bLst = [{0:{name:'pst'}}, {1:{name:'cur'}},{2:{name:'fut'}}];
        var cLst = [{v:{}, ndx:0, arr:[]}, {v:{}, ndx:1, arr:[]}, {v:{}, ndx:2, arr:[]}];
        ret = R.zipWith(f, bLst, cLst);
        //..tst_R_zip_Obj_With:: ->
        MSG += ` -> ${JSON.stringify(ret)}, `;

        C_Both(MSG);
    }
};


/**
 * ----- LEARNING R_set:: Lens s a-> a->s ->s -----
 * @param tst
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

/**
 * ***** TEST FRAMEWORK **************
 *   a Dashboard for selecting tests,
 */
function main() {
    tst_R_zip_Obj_With(true);
    tst_R_set();
    tst_R_Categories();
    tst_R_when();
}
main();

