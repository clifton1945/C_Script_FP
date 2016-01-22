"use strict";


let ___cut, ___srt, ___ret, ___msg, ___pipe, ___data;
//************************************************
// CUT: CodeUnderTest ****************************
// general functions

//const query = (tmpl ) => node => node.querySelector(tmpl);
const TraceChild = (obj)=> (HAS_Child) ? `${obj.innerText}` : `${null}`;
//
const book = query('.book')(document);
var curChptr_CRGrps = query(StyleObj.CRGrpsTmpl)(book);
var curChptr_VRGrps = query(StyleObj.VRGrpsTmpl)(curChptr_CRGrps);
//*****************************************************
// TESTS
SET_All_Verse_Styles (StyleObj)([...curChptr_VRGrps]);
//BindHandlers(book);//TODO UNCOMMENT THIS TEST ONLY
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