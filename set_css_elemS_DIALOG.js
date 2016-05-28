/**
 * set__fut_clss_trgt_elemS_03.js
 *
 * CLIF @ 0530 160527
 *      BEGIN Viral Mode: INJECT each elem in a list With a style some function of the last sibling.
 * CLIF on 20160526 0545
 *
 * 1TAAT:: COMBINING bOTTOM_up ADD  IndexMap the NodeList of trgt_elements
 *  I want verses STYLED depending on its
 *      (1)its location relative to its Siblings.
 *      (2)its reading class: pst, cur, fut. Obtained from its parent
 *      (3)its read class's css_style_dec Properties: e.g. font, opacity, color, etc
 *
 * 160526 begin
 *      use trgt_elemS NodeList to traverse indexedMap
 *          providing elem, sibling index, siblingS collection
 *      use _my_clss_key to provide clss_key
 *      GIVEN these pipe _my_weight, _my_css_styl_decl _set_style
 *
 * 160525 end of the day
 *   // OK i HAVE enough To SEE it Works.
 *   // Can get trgt parent name. Used to retrieve style weight limits used in calc wt.numer;
 *   //                       AND Used to retrieve style csds
 *   // Can get parentNode.children.length. used in weight calc.denom
 *   // Can get trgt index in sibling collection. Used in weight calc.numer
 * 160525  new paradign
 * start with a/any verse element - a trgt_elem.
 *  It has internal context: its Properties, in this case its CSSStyleDeclarations.
 *  It has external context in the DOM: siblings, parents, css , etc
 *
 */

/**
 * calc_Wt_02.js    160528
 *  160528  back to rebuild a WEIGHTER: (D:propDct)(S:clssKey)(L:sibs)(N:ndx) -> N:0>=w<=1
 *      other functions: a propINIT_ER, propWEIGHT_ER, a prop_FORMAT_ER, propCSD_SETT_ER.
 *      STYLER: (D:propDct) (S:clssKey) (L:[elms]) -> L
 *
 *     INIT_ER: (D:propDct)(S:propKey) -> {propVals}
 *      want
 *
 *  160527 Leaving off here to switch to Viral Mode from Prescribed Mode
 *
 *  @ ed1a2776538d8e5b0f62f681d7d336d1a50764d9
 *    STABLE WIP  wt_rng_lens() AND wts_fut()    TO GET the two weight range values for a given read class

 SWITCHED TO   Lenses to get/view default weighting ranges as f(clss_key)

 WIP tst/SET_clss_elemS_03.js
 *
 *
 * calc_Wt_01 fn: N:n -> n
 * calc_Wt_01 fn: params: (CloseWt, FarWt, Length of Siblings)(NumeratorIndex) -> weight
 * calc_Wt_01 uses global arguments. FIX
 * calc_Wt_01 works but does not handle sibling NodeList of Length < 2. FIX
 * aSPD a cssStyle property dictionary is include in file but not used.
 * TO CHANGE by CLIF on 5/26
 * 0. convert _numerator() to function
 * 1. wt = gtOne? calcWt: closeWt
 *
 */
