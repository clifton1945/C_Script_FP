"use strict";


let ___cut, ___srt, ___ret, ___msg, ___pipe, ___data;
// CURRENT WIP  WWWWWWWWWWWWWWWWWWWWWWWW IIIIIIIIIIIIIIIIIIIIIIIIIIII PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
///**
// * UPDATES  the global VerseObj FOR this vers elem.
// * @param vO:  the global VerseObj
// * @constructor
// */
//const UPDATE_VerseObject = (vO) => (vers) => {
//    vO.val = vers[0];
//    vO.ndx = vers[1];
//    vO.ary = vers[2];
//    //C_Trace((o) => o.ndx)(vO);
//    return vO
//};
//// SET_One_Verse_Style:: ( obj, HTML:div) => some return signal complete
////************************************************.
//// CUT: CodeUnderTest ****************************
const SET_One_Verse_Style = (sO) => (...verse) => {
    let vO = UPDATE_VerseObject (VerseObj) (verse) ;
    // so now HAVE both styleObj && verseObj
    let wt = sO.calcWt(sO, vO);
    //C_Both(`wt:${wt}`);
    //AND FINISH with SET_verse_style_Attribute
    let v_style = vO.val.style;
    v_style.fontSize = `${wt * 100}%`;
    v_style.textAlign = 'center';
    C_Both(vO.toStr())
};
//*****************************************************
// RUN
SET_All_verse_Styles(StyleObj)(GET_cur_crGrps_Ary ()); // fn () <== INVOKED W/ ()
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

