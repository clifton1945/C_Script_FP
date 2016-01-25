"use strict";

let A_Cut,  ___cut, ___srt, A_Ret, ___msg, ___pipe, ___data;
// CUT: CodeUnderTest ****************************
/**
 *HOW MAKE && TEST functional UPDATE_ReadGrps(cur_ReadGrp)(direction)
 *   1TAT:  REPLACE UPDATE_ReadGrps(cur_ReadGrp)(direction)
 *      WITH more Functional Style
 *   // REQUIRED BASIC FUNCTIONS:
 *   const = GET_ = (Prop)(OF_El)=>el[prop]  //in this case Element Child
 *   const = IS_ = (Test) => GET_ (Prop) (OF_El)=>
 *   // READ_Next || READ_Last functions
 *   const Pst_
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
//I WILL USE chapters, instead of  Verses, FOR these test.
//  EXPECT three div classes: pat, cur, fut
const book = query('.book')(document);
const ChptrReadGrps = query('.ChptrReadGrps')(document);  //> div.ChptrReadGrps
const ChptrReadGrpsChildren = query('.ChptrReadGrps')(document).children;  //> HTML Collection [3]
const Cur_ChptrReadGrp = query('.ChptrReadGrps > .cur')(document); //> div.cur
//TESTS
//A_Ret = GET_('childElementCount')(Cur_ChptrReadGrp);  //>> OK
//A_Cut =IS_((o)=> o.childElementCount > 0)(Cur_ChptrReadGrp);
////Trace((o)=>`${A_Cut}`)(A_Cut);
//console.assert(A_Cut,`EXP: Cur_ChptrReadGrp Count>0 [${A_Cut}]`);
// CUT:  BUILD AND TEST READ_Next()
let curGrp = Cur_ChptrReadGrp();
let pstGrp = GET_('previousElementSibling')(curGrp);
let futGrp = GET_('nextElementSibling')(curGrp);
IS_Next = IS_(((o)=>(o.childElementCount > 0)(futGrp)
let READ_Next = pipeline (
    (futGrp)=>(curGrp, pstGr) => {



    }
};


//  POSTPONE THIS CALL SET_All_Verse_Styles (StyleObj);
//BindHandlers(book);