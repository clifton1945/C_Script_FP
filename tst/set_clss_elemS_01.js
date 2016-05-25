/**
 * set
 *SET_clss_elemS_01.js
 * CLIF on 20160524
 *
 * 1TAAT:: starting topDown EXTRACT then USE/INSERT
 * the class name and class length INTO
 * helper functions USED in calc Wt
 * 1215 I can get name and length in a clss_elem div
 *     e.g. fut_clss_elem_sTUB.
 *     RET = R.prop('className')(fut_clss_elem_sTUB);//-> "fut"
 *     RET = R.prop('childElementCount')(fut_clss_elem_sTUB);//-> 6
 *     can I from a trgt node?? DOes it have a parent?
 * 1615 let's map the clss_elemS, EXtract name and length, SHOVE them Into a global function
 *
 */
"use strict";
// var R = require('ramda');


var MSG, RET, EXP, CUT, _CUT, TST, noop = 0;
/**
 *          HELPER FUNCTIONS
 */
var msg = s => console.log('t:' + s);
var tIt = R.tap(msg);
var C_It = function C_It(txt) {
    return console.log(txt);
};
var cssQuery_ = R.invoker(1, 'querySelector');
var NodER = R.flip(cssQuery_)(document);
/**
 *          TEST DATA
 */
var slctr = '.book .ChptrReadGrps .cur  .VerseReadGrps ';
/**
 *          CODE UNDER TEST
 */
// NAMING THINGS
// a cur_chpt_elem div
var cur_chpt_elem = NodER(slctr);//-> div.VerseReadGrps
// a cur_chpt_elem HAS 3 children:: each a div w/ a name: pst, cur, fut
var clss_elemS = R.prop("children")(cur_chpt_elem);//-> HTMLCollection[3]:: clss_elemS AKA cur_chpt_elem.children
// each clss_elemS KNOWS its clss name. USE it In STYLING
var fut_clss_elem_sTUB = clss_elemS.item(2);//-> this div.fut ISa elem WITH a HTMLCollection::
var fut_trgt_elemS_sTUB = R.prop("children")(fut_clss_elem_sTUB);//-> HTMLCollection[6]
var a_trgt_elem_sTUB = fut_trgt_elemS_sTUB.item(5);


var helper_obj = {pst: 11, cur: 22, fut: 33};
// the WEIGHTER func will want ToRetrieve the wt valUES From a_wt_dictIONARY as a_func_of(clss_name)
var _helper = R.curry((obj, k) => R.prop(k)(obj));//
var _helper_Erg4 = _helper(helper_obj);// Erg4 a clss_key
var _XTract_clss_name = (elem) => R.prop('className')(elem); // Erg4: F(elem) -> S:name
// RET = _XTract_clss_name(a_trgt_elem_sTUB); //-> "vers"
_CUT = R.compose(_helper_Erg4, tIt, _XTract_clss_name);// {} -> Erg4

CUT = R.map(_CUT)(clss_elemS); // NOW -> [N,N,N]
RET = CUT;
// var fut_clss_elem_sTUB = clss_elemS.item(2);//-> this div.fut ISa elem WITH a HTMLCollection::
//     RET = fut_clss_elem_sTUB;
//     // fut_clss_elem_sTUB child HAS clss_elem_className
//     RET = R.prop('className')(fut_clss_elem_sTUB);//-> "fut"
//     RET = R.prop('childElementCount')(fut_clss_elem_sTUB);//-> 6
// var fut_trgt_elemS_sTUB = R.prop("children")(fut_clss_elem_sTUB);//-> HTMLCollection[6]
// var a_trgt_elem_sTUB = fut_trgt_elemS_sTUB.item(5);




/**
 *          CONFIRMATION OUTPUT & ASSERTS
 */
C_It(RET);
C_It(JSON.stringify(RET));

noop = 1;


