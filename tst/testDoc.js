"use strict";


/**
 * testDoc.js
 * ALL THIS CODE, accumulating in functions.js and objects.js,
 * IS TO APPLY the fn: UPDATE_VERSE_STYLE to every div.vers PRESENTED to it
 *
 * I've changed the doc elements hopefully to let me keep track of the code.
 * But mostly to scrap all the many things open in tests.ja and tests.html.
 * This is a new staart.
 * This is in keeping with my oft repeated understanding that
 *   I MUST just DO OTAAT: One Thing At A Time
 *   Because I can't handle m ore that one - three thing at a time.
 *
 *   using new class names in testDoc.html
 * Created by CLIF on 1/9/2016.
 */

let ___cut, ___srt, ___ret, ___msg, ___pipe, ___data;
// CURRENT WIP  WWWWWWWWWWWWWWWWWWWWWWWW IIIIIIIIIIIIIIIIIIIIIIIIIIII PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
/**
 * UPDATES  the global VerseObj FOR this vers elem.
 * @param vO:  the global VerseObj
 * @constructor
 */
const UPDATE_VerseObject = (vO) => (vers) => {
    vO.val = vers[0];
    vO.ndx = vers[1];
    vO.ary = vers[2];
    C_Trace((o) => o.ndx)(vO);
    return vO
};

// SET_One_Verse_Style:: ( obj, HTML:div) => some return signal complete
//************************************************.
const SET_One_Verse_Style = (sO) => (...verse) => {
    let vO = UPDATE_VerseObject (VerseObj) (verse) ;
    C_Both(vO.toStr ());
};
//*****************************************************
//
//const SET_One_verseGrp_Styles = (styleObj) => (vrGrp) => {
//    let sO = styleObj[vrGrp.className];
//    //BUILD callback fn: SET_Verse_Style for use in map(fn)(vrGrp.chkldren)
//    ___cut = SET_One_Verse_Style(sO);
//    ___data = Coll2Array(vrGrp.children);
//    //C_It(`_this_StyleObj:${sO.name}`);
//    //C_It(`_this_VerseReadGrp.len:${___data.length}`);
//    f_map( ___cut ) ( ___data   );
//};  // CALLEDBY ( global StyleObj)(VerseGrp) >> just the StyleObj data for this VersereadGroup
//
//const SET_All_verse_Styles = (globalStyleObj) =>  (data) => {
//    //C_TraceD()(globalStyleObj);
//    C_Trace((f)=>`fn;${f}`)(data);
//    f_map(SET_One_verseGrp_Styles (globalStyleObj))( data); // calls each of 3 VerseReadGrps
//};

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

