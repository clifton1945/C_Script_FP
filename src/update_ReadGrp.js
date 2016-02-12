// 20160201
// STRUCTURE: MOVING All Code and Tests to one - this - File.
// keep it all in one place.
// STRUCTURE: FORGET struggling WITH import and require
// JUST USE <script src sources
"use strict";
var CUT;
// HOW ABOUT FIGURE HOW TO GIW??

//  BUILD: GET_Grps(curGrpTmpl) .. the 3 current groups
    const GET_Grps = function GET_Grps(tmplStr) { //=> Obj{pst: po, cur: co, fut:fo}
    let grpsObj = {pst: {}, cur: {}, fut: {}};
    grpsObj.cur = document.querySelector(tmplStr);
    grpsObj.pst = R.prop('previousElementSibling', grpsObj.cur);
    grpsObj.fut = R.prop('nextElementSibling', grpsObj.cur);
    return grpsObj
};
// BUILD : MOVE_NextChild (toGrp)(frmGrp)  FOR USE IN MOVE_Nexy AND MOVE_Last
    const MOVE_NextChild = (frmGrp)=>(toGrp)=> {
        // frm>to  e.g. fut>cur; cur>pst
        toGrp.appendChild(frmGrp.firstElementChild);
    };

// BUILD MOVE_Next( GrpsObj)=> UPDATES DOM div.ReadGrps contents
    const MOVE_Next = (GrpsObj)=> {
        // this funcion will ALWAYS need the current Grp element
        //  inorder TO CREATE the pst and cut elements
        // CanMOVE, MOVE fut>>cur, MOVE cur>>pst.
        // THINKING
        // SO just CALL each grp as needed, skip the GrpsObj
        //
        let {pst, cur, fut} = GrpsObj;  //TODO R.propSatisfies
        if (fut.childElementCount > 0) {
            MOVE_NextChild(fut)(cur);
            MOVE_NextChild(cur)(pst);
        }
    };

// BUILD MOVE_LastChild()
    const MOVE_LastChild = (frmGrp)=>(toGrp)=> {
        // toGrp insert (frmGrp.last..)(toGrp.first..)e.g pst>cur; cur>fut
        toGrp.insertBefore(frmGrp.lastElementChild, toGrp.firstElementChild);
    };

// BUILD MOVE_Last( GrpsObj)=> UPDATES DOM div.ReadGrps contents
    const MOVE_Last = (GrpsObj)=> {
        // will need CanMOVE, MOVE fut>>cur, MOVE cur>>pst
        let {pst, cur, fut} = GrpsObj;
        if (pst.childElementCount > 0) {
            MOVE_LastChild(pst)(cur);
            MOVE_LastChild(cur)(fut);
        }
    };

// BUILD && TEST UPDATE_ReadGrps(Direction)
    const UPDATE_ReadGrps = (GrpSelectorStr)=>(Direction)=> {
        // GET_Grps
        // , SELECT_ReadDirection(Direction)>>MOVE_Next() || MOVE_Last()
        let grpsObj = GET_Grps(GrpSelectorStr);  // TODO definately ready for pipeline

        let SELECT_MOVE_ = (grpsObj)=>(Direction)=> {
            // TODO great place functional do nothing if Direction === 0
            return Direction > 0 ? MOVE_Next(grpsObj) : MOVE_Last(grpsObj); // TODO WHAT IF === 0
        };
        //INVOKE
        SELECT_MOVE_(grpsObj)(Direction);
        /// UPDATE_Styles
        SET_All_Verse_Styles(StyleObj);
    };

