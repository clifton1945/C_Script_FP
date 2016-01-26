"use strict";

let A_Cut,  ___cut, ___srt, A_Ret, ___msg, ___pipe, ___data;
// CUT: CodeUnderTest ****************************
/**
 *HOW MAKE && TEST functional UPDATE_ReadGrps(cur_ReadGrp)(direction)
 *   1TAT:  REPLACE UPDATE_ReadGrps(cur_ReadGrp)(direction)
 *      WITH more Functional Style
 *   UPDATE_(curReadGHrp)(Direction) =>
 *   SELECT_(Direction) => // fn(curGrp)
 *   *  return (IS_(greaterZero)
 *       ?  READ_Next : READ_Last;
 *
 *   *   GET_(Prop)(OF_El)=>el[prop]  //in this case Element Child
 *   IS_(NotZero) => GET_(childElementCount)(ofFutRG)=>
 *   // READ_Next || READ_Last functions
 *   const Pst_
 *   READ_Next(eg: last_curChild >> first_fut_Child : APPEND_Child(toGrp)(frGrp)
 *   READ_Last(eg; first_first_curC >> lst_pstC: INSERT_Before(frGrp)(toGrp)(
 *   becomes
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
//
// CUT:  BUILD AND TEST:
//  GET_Grps(curGrpTmpl)=> {}
//  SELECT_(selector)(Direction)
//  UPDATE_(GrpObj)

//  TEST: GET_Grps(curGrpTmpl)
const GET_Grps = (tmpl) => { // > Obj{pst: po, cur: co, fut:fo}
    let curGrp = query(tmpl)(document);
    let pstGrp = GET_('previousElementSibling')(curGrp);
    let futGrp = GET_('nextElementSibling')(curGrp);
    return {pstGrp, curGrp, futGrp};
};
let curGrpTmpl = '.ChptrReadGrps > .cur';
Trace((o)=>`GET_Grps:${Object.keys(o)}`)(GET_Grps(curGrpTmpl));
// TEST: UPDATE_(READ_next)
//const UPDATE_ = ()

//  POSTPONE THIS CALL SET_All_Verse_Styles (StyleObj);
//BindHandlers(book);