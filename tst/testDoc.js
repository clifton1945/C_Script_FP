"use strict";


let ___cut, ___srt, ___ret, ___msg, ___pipe, ___data;
//************************************************
// CUT: CodeUnderTest ****************************
// general functions
const query = (tmpl ) => node => node.querySelector(tmpl);
const HAS_Child =  (obj)=> obj.firstElementChild === null;
const TraceChild = (obj)=> (HAS_Child) ? `${obj.innerText}` : `${null}`;
//
const book = query('.book')(document);
const curChptr_VRGrps = query('.ChptrReadGrps > .cur > .chptr > .VerseReadGrps')(book);
const curVRGrp = query('.cur')(curChptr_VRGrps);
const pstVRGrp = curVRGrp.previousElementSibling;
const futVRGrp = curVRGrp.nextElementSibling;
//************************************************
// TESTING
//Trace(function (o) {
//    return 'o: ' + o.firstElementChild.innerHTML;
//})(pstVRGrp);
C_Both(`pst..${TraceChild(pstVRGrp)}`);
Trace(function (o) {
    return 'o: ' + o.firstElementChild.innerHTML;
})(curVRGrp);
Trace(function (o) {
    return 'o: ' + o.firstElementChild.innerHTML;
})(futVRGrp);

UPDATE_VRGrps(curVRGrp, -1);
//Trace(function (o) {
//    return 'o: ' + o.firstElementChild.innerHTML;
//})(pstVRGrp);
C_Both(`pst..${TraceChild(pstVRGrp)}`);
Trace(function (o) {
    return 'o: ' + o.firstElementChild.innerHTML;
})(curVRGrp);
Trace(function (o) {
    return 'o: ' + o.firstElementChild.innerHTML;
})(futVRGrp);

UPDATE_VRGrps(curVRGrp, 1);
//Trace(function (o) {
//    return 'o: ' + o.firstElementChild.innerHTML;
//})(pstVRGrp);
C_Both(`pst..${TraceChild(pstVRGrp)}`);
Trace(function (o) {
    return 'o: ' + o.firstElementChild.innerHTML;
})(curVRGrp);
Trace(function (o) {
    return 'o: ' + o.firstElementChild.innerHTML;
})(futVRGrp);

//*****************************************************
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