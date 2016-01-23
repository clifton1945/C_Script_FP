"use strict";

let ___cut, ___srt, ___ret, ___msg, ___pipe, ___data;
// CUT: CodeUnderTest ****************************
/**
 *HOW MAKE && TEST functional update ReadGrps
 *   1TAT:  curReadGrp.appendChild(futVRGrp.firstElementChild);
 *   become APPEND_ChildToGrp( ToGrp, FromGrp)
 *      curry (ToGrp) =>
 *      curry (FromGrp) =>
 *      change x.appendChild to APPEND_Child(to, frm) => {
 *          let firstChld = (frm)=>frm.firstElementChild
 *          to.appendChild(firstChld)
 *          )
 *      // no return needed
 *      }
 */

//*****************************************************
// TESTS
const book = query('.book')(document);
//I WILL USE chapters, instead of  Verses, FOR these test.
//  EXPECT three div classes: pat, cur, fut
const ChptrReadGrps = query('.ChptrReadGrps')(document);  //> div.ChptrReadGrps
const ChptrReadGrpsChildren = query('.ChptrReadGrps')(document).children;  //> HTML Collection [3]
const Cur_ChptrReadGrp = query('.ChptrReadGrps > .cur')(document); //> div.cur

// CHANGE 1TAT TO BUILD a function filter
//const GET_Cur_ChptrReadGrp = ( Grps ) => Grps.getElementsByClassName('cur');  //
//const APPEND_ChildToGrp = (ToGrp) => (FrmGrp) => {
//    return FrmGrp.getElementsByClassName('cur');
//};
//SET_All_Verse_Styles (StyleObj);
//BindHandlers(book);

/**
 *HOW TEST functional ??
 */
// traces
Trace((o)=> `exp element ${o}`)(ChptrReadGrps);
Trace((o)=> `exp children[${o.length}]===[3]`)(ChptrReadGrpsChildren);
Trace((o)=> `exp cur_ChptrReadGrp: cur==${cur_ChptrReadGrp.className}`)();
Trace((o)=> `exp GET_curRGrp: cur==${GET_curRGrp.className}`)(ChptrReadGrpsChildren);

/**
 * THINKING
 * I'll only want to CEE the cur_ChapterReadGrp AND UPDATE Style of the VerseReadGrps.
 * THEREFORE the default querySelectorAll string WILL BE( '#cur_ChptrReadGrp  .VerseReadGrps > div')
 * I'll css display: none everything else.
 * SO
 * I'll constantly BE READING: next || last verse // chptr
 *  SO how about a main() WITH
 *      GET_cur_crGrps_Ary(str) // =>vrGrps:[o,o,o]     // data:: CURRENT ChpterGrp [w/3 vrGrps:[w/n vers]]
 *      MAP(SET_All_versesStyle)(vrGrps)            //    each vrGrp:: vrGrp:[w/n vers]] IS
 *          SET_All_versesStyle(vrGrp)              //    APPLIED TO this fn => all verses.style updated
 *              SELECT_vStyleObj(StyleObj)(vrGrp)     //=>vStyleObj::sObj
 *              CALC_StyleWt_WITH(vStyleObj)                 //=>  partial curry CALC...::fn
 *              GET_versAry_FROM(vrGrp)                       //=> data: versAry w/ n verses.
 *          MAP(SET_1verseStyle)(versAry)                // each verse of this vrGrp's versAry IS
 *              SET_1verseStyle( versAry)                 // APPLIED TO this fn
 *                  TRNFRM_TO_VersObj_FRM(VerseObj)(versAry)           //=> versObj
 *                  CALC_StyleWt_WITH(~vStyleObj~)(VersObj)     // => styleWt NOTE ~curried~
 *                  SET_Verse_Style_Str(styleWt)            //=> styleStr
 *                  SET_Verse_Style( styleStr)              //=> actual vers setAttribute
 *
 */