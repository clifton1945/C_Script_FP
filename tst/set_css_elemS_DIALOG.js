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
