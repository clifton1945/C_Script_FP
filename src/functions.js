/**
 * Created by CLIF on 2/19/2016.
 */

"use strict";
//var R = require('ramda');
//VERBS: MODIFY, UPDATE, APPLY,ADMINISTER,COMPLETE,FULFILL,AFFECT,ALTER

//160603
// const myTap = R.tap(s=>C_Both('mTap: ' + s));

// *********** TEST HELPERS
// var Cnt = R.curry(
//     function (NDX, coll) {
//         return R.prop('childElementCount', coll[NDX]);
//     });
// var C_GrpStateCnt = R.curry(
//     // NOTE: this function requires indexs:PST, CUR, FUT as 0,1,2 repectively.
//     function (nameStr, coll) {
//         C_Both(`${nameStr}.div.class Cnt:p,c,f [${Cnt([PST], coll)},${Cnt([CUR], coll)},${Cnt([FUT], coll)}]`);
//         return coll
//     });
// ***********  CODE DOM && DATA REFERENCE
const bookTmpl = '.book';
const C_Grp_Tmpl = '.ChptrReadGrps > div';
const V_Grp_Tmpl = '.ChptrReadGrps .cur  .VerseReadGrps > div';
const cur_Chptr_rClss_NL = document.querySelectorAll(V_Grp_Tmpl);
const cur_Chptr_cur_rClss_Verse_tst1_Elem = document.querySelector('div #tst1');
const div_tst1_E = document.querySelector('div #tst1');
//var C_Grp_NL = book.querySelectorAll(C_Grp_Tmpl); // NL:: 3 div.classes: pst, cur, fut
//var V_Grp_NL = book.querySelectorAll(V_Grp_Tmpl); // NL:: 3 div.classes: pst, cur, fut
const GET_book =
    function GET_book() {
        return document.querySelector(bookTmpl)
    };
const GET_C_Grp_NL =
    function GET_C_Grp_NL(book) {
        return book.querySelectorAll(C_Grp_Tmpl)
    };
const GET_V_Grp_NL =
    function GET_V_Grp_NL(book) {
        return book.querySelectorAll(V_Grp_Tmpl)
    };


/**
 *      assert:: a:exp, a:ret, S:b -> true:  | false S:b
 * @param ret
 * @param exp
 * @param tNum
 */
const assert = (exp, ret, tNum)=> console.assert(R.equals(exp, ret), ` EXP:[${exp}]; RET:[${ret}] @ ${tNum}`);


// *********** OLD BUT STILL IN USE
const Doc_It = (txt) => document.querySelector(".console").textContent = txt;

const C_It = (txt) => console.log(txt);
//export {C_It};

const C_Both = (txt) => {
    C_It(txt);
    Doc_It(txt);
};
var This = x => console.log('t:' + x);
const tap_This = R.tap(This);

const MSG_It = (msg) => C_Both(msg);

/**
 *          TRACE:: t -> o -> o
 * @param txt
 * @param obj
 * @returns {*}
 * @constructor
 */
// const TRACE = R.curry(
//     function TRACE(txt, obj) {
//         C_Both(`${txt}: ${obj}`);
//         return obj
//     }
// );
// const TRACE_ = R.curry(
//     function TRACE_(fn, obj) {
//         C_Both(fn(obj));
//         return obj
//     });
//
// const round2 = x => Math.round(x * 100) / 100;
// const msg = (msg) => ` ${msg}`;

