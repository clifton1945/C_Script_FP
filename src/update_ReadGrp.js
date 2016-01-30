// BUILT
"use strict";
//import * as R from '../node_modules/ramda';
//var R = require('ramda');
//import R from '..//node_modules//ramda';
//import query from '..//src//functions-compiled.js';
//import requirejs from '..//node_modules//requirejs';

//var R = require('ramda');
//import * as R  from 'node-modules/ramda';

var cut;


//  BUILD: GET_Grps(curGrpTmpl) .. the 3 current groups
const GET_Grps = (tmplStr) => { // > Obj{pst: po, cur: co, fut:fo}
    let cur = (document.querySelector(tmplStr));
    let pst = R.prop('previousElementSibling',cur);  //
    let fut = R.prop('nextElementSibling')(cur);    //NOTE: R.prop param BOTH (a,b) AND (a)(b)
    return {pst, cur, fut};
};
// HOW ABOUT FIGURE HOW TO GIW??
//const grpsObj = {pst:{}, cur:{}, fut:{}};
//var tmplStr =  '.ChptrReadGrps > .cur';
//let transformations = {
//    //HOW GET THIS TO CREATE cur then APPLY cur TO pst and fut ??
//    cur:(tmplStr) => document.querySelector(tmplStr),
//
//    pst:R.prop('previousElementSibling',cur),
//    fut:R.prop('nextElementSibling',cur)
//};
//cut = R.evolve(transformations, grpsObj);
//console.log(cut.firstElementChild.className);
//

// BUILD : MOVE_NextChild (toGrp)(frmGrp)  FOR USE IN MOVE_Nexy AND MOVE_Last
const MOVE_NextChild = (frmGrp)=>(toGrp)=>{
    // frm>to  e.g. fut>cur; cur>pst
    toGrp.appendChild(frmGrp.firstElementChild);
};
// BUILD MOVE_Next( GrpsObj)=> UPDATES DOM div.ReadGrps contents
const MOVE_Next = (GrpsObj)=>{
    // will need CanMOVE, MOVE fut>>cur, MOVE cur>>pst
    let {pst, cur, fut} = GrpsObj;  //TODO R.propSatisfies
    if( fut.childElementCount > 0 ) {
        MOVE_NextChild(fut)(cur);
        MOVE_NextChild(cur)(pst);
    }
};
// BUILD MOVE_LastChild()
const MOVE_LastChild = (frmGrp)=>(toGrp)=>{
    // toGrp insert (frmGrp.last..)(toGrp.first..)e.g pst>cur; cur>fut
    toGrp.insertBefore(frmGrp.lastElementChild, toGrp.firstElementChild);
};
// BUILD MOVE_Last( GrpsObj)=> UPDATES DOM div.ReadGrps contents

const MOVE_Last = (GrpsObj)=>{
    // will need CanMOVE, MOVE fut>>cur, MOVE cur>>pst
    let {pst, cur, fut} = GrpsObj;
    if( pst.childElementCount > 0 ) {
        MOVE_LastChild(pst)(cur);
        MOVE_LastChild(cur)(fut);
    }
};
// BUILD && TEST UPDATE_ReadGrps(Direction)
const UPDATE_ReadGrps = (GrpSelectorStr)=>(Direction)=>{
    // GET_Grps
    // , SELECT_ReadDirection(Direction)>>MOVE_Next() || MOVE_Last()
    let grpsObj = GET_Grps(GrpSelectorStr);  // TODO definately ready for pipeline

    let SELECT_MOVE_ = (grpsObj)=>(Direction)=>{
        // TODO great place functional do nothing if Direction === 0
        return Direction > 0 ? MOVE_Next(grpsObj) : MOVE_Last(grpsObj); // TODO WHAT IF === 0
    };
    //INVOKE
    SELECT_MOVE_(grpsObj)(Direction);
    /// UPDATE_Styles
    SET_All_Verse_Styles (StyleObj);
};

