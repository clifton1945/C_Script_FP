/**
 * set_clss_elemS_02.js
 * CLIF on 20160525
 *
 * 1TAAT:: STARTing bOTTOM_up, STYLe all_versES
 *  I want verses STYLED depending on its
 *      (0)a few specific style Properties: e.g. font, opacity, color, etc
 *      (1)location relative to its Siblings
 *      (2)the  reading class: pst, cur, fut
 * 160525  new paradign
 * start with a/any verse element - a trgt_elem.
 *  It has internal context: its Properties, in this case its CSSStyleDeclarations.
 *  It has external context in the DOM: siblings, parents, css , etc
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
/**
 *      the targET elemENT:: bottom-up
 *      trgt_type:div.vers, trgt_sibl_ndx:3, parnt_type:div.fut, parnt_sib_ndx:2, parnt_type:div.cur,
 * @type {Element|Node|string|File|DOMImplementation}
 */
var a_trgt_elem_sTUB = fut_trgt_elemS_sTUB.item(3);


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


