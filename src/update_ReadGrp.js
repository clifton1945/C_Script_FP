// BUILT
"use strict";
//import * as R from '../node_modules/ramda';
//var R = require('ramda');
//import R from '..//node_modules//ramda';
//import query from '..//src//functions-compiled.js';
//import requirejs from '..//node_modules//requirejs';

//var R = require('ramda');
//import * as R  from 'node-modules/ramda';

//  BUILD: GET_Grps(curGrpTmpl)
const GET_Grps = (tmplStr) => { // > Obj{pst: po, cur: co, fut:fo}
    let cur = document.querySelector(tmplStr);
    let pst = GET_('previousElementSibling')(cur);
    //let pst = R.prop('previousElementSibling')(cur);  // ramda fails
    let fut = GET_('nextElementSibling')(cur);
    return {pst, cur, fut};
};
//  TESTS GET_Grps
let curGrpTmpl = '.ChptrReadGrps > .cur';
let GrpsObj = GET_Grps(curGrpTmpl);
console.log("IN update_ReadGrp.js:fut_N: " + GrpsObj.fut.childElementCount);

// BUILD : MOVE_NextChild (toGrp)(frmGrp)
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
    SELECT_MOVE_(grpsObj)(Direction);
    /// UPDATE_Styles
    SET_All_Verse_Styles (StyleObj);
};

