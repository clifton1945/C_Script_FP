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
//const book = query('.book')(document);
//const ChptrReadGrps = query('.ChptrReadGrps')(document);  //> div.ChptrReadGrps
//const ChptrReadGrpsChildren = query('.ChptrReadGrps')(document).children;  //> HTML Collection [3]
const Cur_ChptrReadGrp = query('.ChptrReadGrps > .cur')(document); //> div.cur

//  BUILD: GET_Grps(curGrpTmpl)
/**
 *
 * @param tmplStr
 * @returns {{pst: *, cur, fut: *}}
 * @constructor
 */
const GET_Grps = (tmplStr) => { // > Obj{pst: po, cur: co, fut:fo}
    let cur = query(tmplStr)(document);
    let pst = GET_('previousElementSibling')(cur);
    let fut = GET_('nextElementSibling')(cur);
    return {pst, cur, fut};
};
//  TESTS GET_Grps
let curGrpTmpl = '.ChptrReadGrps > .cur';
let GrpsObj = GET_Grps(curGrpTmpl);

// REMEMBER These ARE Chapters!! NOT Verses
let {pst, cur, fut} = GrpsObj;
//Trace((o)=>`GET_Grps:${Object.keys(o)}`)(GrpsObj);
console.assert(Object.keys(GrpsObj).length === 3
    , 'EXP 3 keys in GrpsObj.');  //> OK
//
//
// BUILD / TEST: MOVE_NextChild (toGrp)(frmGrp)

// BUILD MOVE_NextChild()
const MOVE_NextChild = (frmGrp)=>(toGrp)=>{
    toGrp.appendChild(frmGrp.firstElementChild);
};
////TEST MOVE_NextChild()
//let n0=cur.childElementCount;
//Trace((o)=>`cur Chptr El Count:${n0}`)(n0);
//A_Cut = MOVE_NextChild(fut)(cur);
//
//let n1=cur.childElementCount;
//Trace((o)=>`cur Chptr El Count:${n1}`)(n1);
//console.assert(n1 === (n0+1)
//    , 'EXP MOVED fut>>cur');  //> OK
//
//A_Cut = MOVE_NextChild(cur)(pst);
//let n2=cur.childElementCount;
//Trace((o)=>`cur Chptr El Count:${n2}`)(n2);
//console.assert(n2 === n0
//    , 'EXP MOVED cur>>pst'
//);  //> OK

// BUILD MOVE_Next( GrpsObj)=> UPDATES DOM div.ReadGrps contents
const MOVE_Next = (GrpsObj)=>{
    // will need CanMOVE, MOVE fut>>cur, MOVE cur>>pst
    let {pst, cur, fut} = GrpsObj;
    if( fut.childElementCount > 0 ) {
            MOVE_NextChild(fut)(cur);
            MOVE_NextChild(cur)(pst);
    }
};
//TEST MOVE_Next()
let n1=pst.childElementCount;
let n2=cur.childElementCount;
let n3=fut.childElementCount;
Trace((o)=>`Before Move_Next():${n1} pst, ${n2} cur, ${n3} fut`)();

A_Cut = MOVE_Next(GrpsObj);
let n4=pst.childElementCount;
let n5=cur.childElementCount;
let n6=fut.childElementCount;
Trace((o)=>`   1st Move_Next():${n4} pst, ${n5} cur, ${n6} fut`)();
console.assert(n4+n5+n6 === 3
    , '  1st MOVE_Next() EXP cur>>pst, fut>>cur'
);  //> OK
A_Cut = MOVE_Next(GrpsObj);
let n7=pst.childElementCount;
let n8=cur.childElementCount;
let n9=fut.childElementCount;
Trace((o)=>`   2nd MOVE_Next():${n4} pst, ${n5} cur, ${n6} fut`)();
console.assert(n4===n7 && n5===n8 && n6===n9,
    '  2nd MOVE_Next() EXP: No Change since fut.count===0 '
);  //> OK
// BUILD && TEST UPDATE_ReadGrps(Direction)
const UPDATE_ReadGrps = (Direction)=>{

};

//  POSTPONE THIS CALL SET_All_Verse_Styles (StyleObj);
//BindHandlers(book);