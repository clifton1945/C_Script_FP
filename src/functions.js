/**
 * Created by CLIF on 2/19/2016.
 */

"use strict";
//var R = require('ramda');
//VERBS: MODIFY, UPDATE, APPLY,ADMINISTER,COMPLETE,FULFILL,AFFECT,ALTER

/**
 * an indexed forEach function:
 * R.forEach():: (a->*)->[a]->[a]
 *     Iterate over an input list, calling a provided function fn for each element in the list.  fn receives one argument: (value). Returns THE ORIGINAL array!!
 * addIndex() Returns function.
 *      An altered list iteration function that passes (item, index, list) to its callback
 */
const R_forEachIndexed = R.addIndex(R.forEach);

// *********** TEST HELPERS
const Cnt = R.curry(
    function (NDX, coll) {
        return R.prop('childElementCount', coll[NDX]);
    });
const C_GrpStateCnt = R.curry(
    // NOTE: this function requires indexs:PST, CUR, FUT as 0,1,2 repectively.
    function (nameStr, coll) {
        C_Both(`${nameStr}.div.class Cnt:p,c,f [${Cnt([PST], coll)},${Cnt([CUR], coll)},${Cnt([FUT], coll)}]`);
        return coll
    });
// ***********  CODE DOM && DATA REFERENCE
const bookTmpl = '.book';
const C_Grp_Tmpl = '.ChptrReadGrps > div';
const V_Grp_Tmpl = '.ChptrReadGrps .cur  .VerseReadGrps > div';

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

// *********** OLD BUT STILL IN USE
const Doc_It = (txt) => document.querySelector(".console").textContent = txt;

const C_It = (txt) => console.log(txt);
//export {C_It};

const C_Both = (txt) => {
    C_It(txt);
    Doc_It(txt);
};

const MSG_It = (msg) => C_Both(msg)

/**
 *          TRACE:: t -> o -> o
 * @param txt
 * @param obj
 * @returns {*}
 * @constructor
 */
const TRACE = R.curry(
    function TRACE(txt, obj) {
        C_Both(`${txt}: ${obj}`);
        return obj
    }
);
const TRACE_ = R.curry(
    function TRACE_(fn, obj) {
        C_Both(fn(obj));
        return obj
    });

