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
 * todo  broken 20160307
 * ***** TEST FRAMEWORK **************
 *   a Dashboard for selecting tests,
 */
function main() {
    var all = true;
    tstCode(true);
    tst_R_MapObjIndex_AND_R_forEachIndexed(all);
    tst_SEPARATE_StyleConst_BY_VGrpClass_INTO_List(all);
    tst_R_zip_AND_derivatives(all);
    tst_R_map_AND_forEach_derivatives(all);
    tst_R_set(all);
    tst_R_Categories(all);
    tst_R_when(all);
}
// ***********************************

//var R = require('ramda');  //DO NOT USE OR NEED W/ TEST.HTML
var C_Cut, C_Ret, C_Exp, MSG;

/**
 * GLOBAL vars
 * require functions-compiled.js, objects-compiled.js
 * */
var book = GET_book();
var VG_NL = GET_V_Grp_NL(GET_book());
var VG_AR = [...VG_NL];
//var Tst_DivFut_Vrs4 = VG_NL.item(2).children.item(5);
const R_node2Obj = function (val, key, arr) {
    var vl = [val, key, arr];
    var vlStr = ["val", "key", "arr"];
    var x = R.zipObj(vlStr, vl);
    return x
}; // TODO ADD TO functions.js
// ------------------- TESTS -------------------
//
///**
// * tst_SEPARATE_StyleConst_BY_VGrpClass_INTO_List
// * @param tst
// */
//var tst_SEPARATE_StyleConst_BY_VGrpClass_INTO_List = function (tst = false) {
//    var f_, tstCode, ret, exp, MSG;
//
//    if (tst) {
//        tstCode = function () {
//            MSG = `\n..tst_SEPARATE_StyleConst_BY_VGrpClass_INTO_List`;
//            const SEPARATE_StyleConst_BY_VGrpClass_INTO_List = function () {
//                var PST = 0, CUR = 1, FUT = 2;
//                f_ = (n)=> {
//                    return StyleConstants[n]
//                };
//                return R.map(f_, [PST, CUR, FUT]);
//            };
//            ret = SEPARATE_StyleConst_BY_VGrpClass_INTO_List();
//            //..tst_R_zip:: -> [[1,"a"],[2,"b"],[3,"c"]],
//            MSG += ` -> ${JSON.stringify(ret)}, `;
//            return MSG
//        };
//        // TRACE MSG
//        C_Both(tstCode());
//        // ....tst_SEPARATE_StyleConst_BY_VGrpClass_INTO_List-> [{"name":"pst","smlWt":0.4,"lrgWt":0.95}, ....]
//    }
//};

var tst_R_MapObjIndex_AND_R_forEachIndexed = function (tst = false) {
    var V_GrpsNL = GET_V_Grp_NL(book);
    var V_GrpsAr = [...GET_V_Grp_NL(book)];

    function fn(StyleConstants, V_GrpsNL) {
        var a = R.mapObjIndexed(
            SELECT_StyleConstants_FOR_each_VerseGrp
            , V_GrpsAr
        );
        var b = R_forEachIndexed(
            SELECT_StyleConstants_FOR_each_VerseGrp
            , V_GrpsAr
        );
        C_Both(b);
        console.assert(R.isArray(a, b, `EXP ${a} === ${b}`));
        console.assert(R.equals(a, b, `EXP ${a} === ${b}`));
        return a
    }
};

/**
 * tst_R_map_AND_forEach_derivatives
 * @param tst
 */
var tst_R_map_AND_forEach_derivatives = function (tst = false) {
    var f, ret, exp, MSG;
    if (tst) {
        MSG = 'tst_R_mapObjIndexed::(f_, StyleConstants)-> ';
        var f_ = function f_(val, ndx, arr) {
            return [val[ndx]]
        }; //{} -> {[{}]
        ret = R.mapObjIndexed(f_, StyleConstants);
        //..tst_R_zip_With::([StyObj,,],[VerObj,,] ->
        MSG += ` -> ${JSON.stringify(ret)}, `;
        MSG += 'FAILED: THIS DOES NOT PRODUCE Lists.\n' +
            'WILL TRY R.zipWith which -> []';

        C_Both(MSG);
    }
};

/**
 * R_zip_AND_derivatives
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
        var Lst0 = [{big: .5}, {big: 1.25}, {big: .75}];
        var Lst2 = [{name: 'pst'}, {name: 'cur'}, {name: 'fut'}];

        var Lst1 = [{0: {big: .5, name: 'pst'}}, {1: {big: 1.25, name: 'cur'}}, {2: {big: .75, name: 'fut'}}];
        var Lst3 = [{v: {}, ndx: 0, arr: []}, {v: {}, ndx: 1, arr: []}, {v: {}, ndx: 2, arr: []}];

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

        MSG += `\n\n..${'tst_R_zip_With:: simple data'}`;
        f = (a, b) => {
            return [R.add(a, 10), R.toUpper(b)]
        };
        ret = R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
        //..tst_R_zipWith:: -> [[11,"A"],[12,"B"],[13,"C"]],
        MSG += ` -> ${JSON.stringify(ret)}, `;

        MSG += `\n\n..${'tst_R_zip_With:: styles and vGrps'}`;
        // first: need VGrp_Stys List {}->[{}]
        //  MAYBE USE Array.from
        // like
        // let spans = document.querySelectorAll('span.name');
        // let names2 = Array.from(spans, s => s.textContent);
        ret = Array.from(StyleConstants, s => s['1']);
        // MAYBE USE R.toPairs || .toPairsIn
        // StyleConstants:  [ SC[0], SC[1], SC[2]]
        // and need VGrp_Vers List
        //f = (a, b) => {
        //    return [R.add(a, 10), R.toUpper(b)]
        //};
        //ret = R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
        //..tst_R_zipWith:: -> [[11,"A"],[12,"B"],[13,"C"]],
        MSG += ` -> ${JSON.stringify(ret)}, `;

        // TRACE MSG
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
        var C_Arr = [[], [2, 2, 2], [3]];
        var READ__ = R.when(CAN_READ, READ_XXX);
        MSG = 'READ_ = R.when(CAN_READ, READ_XXX) -> ';
        MSG += R.toString(READ__(C_Arr[0])) + ', ';
        MSG += R.toString(READ__(C_Arr[1])) + ', ';
        MSG += R.toString(READ__(C_Arr[2])) + ', ';
        C_Both(MSG);
    }
};

var tstCode = function (tst = false) {
    MSG = 'tst_Lens->\n --- ';
//  ------------------ SET TEST ------------

    C_Both(MSG);
//  ------------------ INVOKE TEST ------------
};
main();