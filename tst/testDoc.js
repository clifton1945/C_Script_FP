"use strict";

let A_Cut,  ___cut, ___srt, ___ret, ___msg, ___pipe, ___data;
// CUT: CodeUnderTest ****************************
/**
 *HOW MAKE && TEST functional UPDATE_ReadGrps(cur_ReadGrp)(direction)
 *   1TAT:  REPLACE UPDATE_ReadGrps(cur_ReadGrp)(direction)
 *      WITH more Functional Style
 *   REQUIRED BASIC FUNCTIONS:
 *   const = GET_ = (Prop)(OF_El)=>el[prop]  //in this case Element Child
*    const = IS_ = (Test) => GET_ (Prop) (OF_El)=>
 *   READ_Next(eg: last_curChild >> first_fut_Child : APPEND_Child(toGrp)(frGrp)
 *   READ_Last(eg; first_first_curC >> lst_pstC: INSERT_Before(frGrp)(toGrp)(
 *   becomes
 *      let READ_Next( ToGrp)(fmGrp) => {
 *          FIND_
 *          FILTER_()(fut_RGrp)
 *      }
 *
 *      curry (ToGrp) =>
 *      curry (FromGrp) =>
 *      let READ_Next = (ToGrp )(FrmGrp) => {
 *          ToGrp.appendChild((FrmGrp)=>FrmGrp.firstElementChild);
 *          }
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
// CUT
const GET_ReadGrp = (grpNameStr) => (domCollection) => {
    FIND_Predicate_IN_Array( // (pred)(array) >>
        (el, ndx)=>el.className === grpNameStr
    )  // this is the Predicate
    ([...domCollection]);  // returns curReadGrp
};
// WANT EQUIVALENT=curReadGrp.appendChild(futReadGrp.firstElementChild);

// CUT

const APPEND_ChildToGrp = (toGrpStr, frmGrpStr) => (coll) => {
    let toGrpColl = GET_ReadGrp(toGrpStr)(coll);
    let frmGrpColl = GET_ReadGrp(frmGrpStr)(coll);
    Coll2Array(toGrpColl).appendChild(frmGrpColl.firstElementChild)
};
A_Cut = APPEND_ChildToGrp('cur', 'fut')(ChptrReadGrpsChildren);

//  POSTPONE THIS CALL SET_All_Verse_Styles (StyleObj);
//BindHandlers(book);7

/**
 *HOW TEST functional ??
 */
// traces
Trace((o)=> `exp element ${o}`)(ChptrReadGrps);
Trace((o)=> `exp children[${o.length}]===[3]`)(ChptrReadGrpsChildren);
Trace((o)=> `exp cur_ChptrReadGrp: cur==${Cur_ChptrReadGrp.className}`)();
Trace((o)=> `exp GET_curReadGrp('cur')(ChptrReadGrpsChildren)
    cur==${o.className}`)(GET_ReadGrp('cur')(ChptrReadGrpsChildren));


//Trace((o)=> `exp GET_curRGrp: cur==${GET_curRGrp.className}`)(ChptrReadGrpsChildren);

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