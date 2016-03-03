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
    tst_R_map_AND_forEach_derivatives();
    tst_R_zip_AND_derivatives(true);
    tst_R_set();
    tst_R_Categories();
    tst_R_when();
}
// ***********************************

//var R = require('ramda');  //DO NOT USE OR NEED W/ TEST.HTML
var C_Cut, C_Ret, C_Exp, C_Verse, C_Arr, MSG;

/**
 * GLOBAL vars
 * require functions-compiled.js, objects-compiled.js
 * */
var book = GET_book();
var VG_NL = GET_V_Grp_NL(GET_book());
var VG_AR = [...VG_NL];
var Tst_DivFut_Vrs4 = VG_NL.item(2).children.item(5);
C_Verse = Tst_DivFut_Vrs4;
const R_node2Obj = function(val, key, arr) {
    var vl = [val, key, arr];
    var vlStr = ["val", "key", "arr"];
    var x = R.zipObj(vlStr, vl);
    return x
}; // TODO ADD TO functions.js

var tst_R_map_AND_forEach_derivatives = function (tst = false) {
    var f, ret, exp, MSG;
    if (tst) {
        MSG = 'tst_R_zip_With::([StyObj,,],[VG_NL,,]';
        var f_ = (nod, ndx, arr) => [val[ndx]] ; //->
        ret = R.mapObjIndexed(f_, StyleConstants);
        //..tst_R_zip_With::([StyObj,,],[VerObj,,] ->
        MSG += ` -> ${JSON.stringify(ret)}, `;

        C_Both(MSG);
    }
};

/**
 * R.zip::[a] -> [b] -> [[a,b],....[]]  // combines
 * R.ZipObj:: [Str] -> [*] -> [[a,b],...] // makes list of combined object
 * R.zipWith(a,b->c)->[a]->[b]->[c] // List OF func(a,b)-> applied to a,b PAIRS
 * WITH R_forEachIndexed->Obj:: ??//Obj
 * WITH R.mapObjIndexed->Obj::((*.Str, Obj)->*)->Obj->Obj //Obj
 *
 * NOTE:R.xprod( [1,2], [a, b]]->[[1,a], [1,b], [2,a], [2,b]]  NG for this
 * @param tst
 */
var tst_R_zip_AND_derivatives = function (tst = false) {
    var f, ret, exp, MSG;
    if (tst) {
        var Lst0 = [{big: .5}, {big:1.25}, {big:.75}];
        var Lst2 = [{name:'pst'}, {name:'cur'}, {name:'fut'}];

        var Lst1 = [{0:{big: .5, name:'pst'}}, {1:{big:1.25, name:'cur'}}, {2:{big:.75, name:'fut'}}];
        var Lst3 = [{v:{}, ndx:0, arr:[]}, {v:{}, ndx:1, arr:[]}, {v:{}, ndx:2, arr:[]}];

        MSG = `\n..tst_R_zip/Cat.List::[a]->[b]->[[a,b],]`;
        ret = R.zip([1, 2, 3], ['a', 'b', 'c']);
        //..tst_R_zip:: -> [[1,"a"],[2,"b"],[3,"c"]],
        MSG += ` -> ${JSON.stringify(ret)}, `;

        MSG += `\n\n..${'tst_R_zipCat.List::[a]->[b]->[[a,b],]'}`;
        ret = R.zip(Lst0, Lst2);
        //..tst_R_zip::-> [[{"big":0.5},{"name":"pst"}],[{"big":1.25},{"name":"cur"}],[{"big":0.75},{"name":"fut"}]]
        MSG += ` -> ${JSON.stringify(ret)}, `;

        MSG += `\n\n..${'tst_R_zipObj/Cat.List:: [Str:k] -> [*] -> {k:b,} Object!'}`;
        ret = R.zipObj(['a', 'b', 'c'], [1, 2, 3]);
        //..tst_R_zipObj:: -> {"a":1,"b":2,"c":3},
        MSG += ` -> ${JSON.stringify(ret)}, `;

        MSG += `\n\n..${'tst_R_zip_With::'}`;
        f = (a, b) => {
            return [R.add(a, 10), R.toUpper(b)]
        };
        ret = R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
        //..tst_R_zipWith:: -> [[11,"A"],[12,"B"],[13,"C"]],
        MSG += ` -> ${JSON.stringify(ret)}, `;

        // TRACE MSG
        C_Both(MSG);
    }
};

/**
 *
 * @param sObj
 * @param el
 * @param ndx
 * @param arr
 * @returns {*[]}
 */
//function f(sObj, el, ndx, arr)  {
//    let vo = {el, ndx, arr};
//    let so = sObj[ndx];
//    let el_cls = R.prop('class', ??????????????????);
//    return [so, VG_NL]; // ACTUAL RETURN VALUE
    //let name = R.prop('name', so);
    //let clss = R.prop('class', vo.el);
    //var r = {name, clss};
    //return  r     // TEST RETURN
//}

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
        MSG = 'READ_ = R.when(CAN_READ, READ_XXX) -> ';
        MSG += R.toString(READ__(C_Arr[0])) + ', ';
        MSG += R.toString(READ__(C_Arr[1])) + ', ';
        MSG += R.toString(READ__(C_Arr[2])) + ', ';
        C_Both(MSG);
    }
};
main();

