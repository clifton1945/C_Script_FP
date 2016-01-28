
// BUILD && TEST UPDATE_ReadGrps(Direction)
const UPDATE_ReadGrps = (GrpSelectorStr)=>(Direction)=>{
    // GET_Grps
    // , SELECT_ReadDirection(Direction)>>MOVE_Next() || MOVE_Last()
    let grpsObj = GET_Grps(GrpSelectorStr);
    let SELECT_MOVE_ = (grpsObj)=>(Direction)=>{
        // TODO great place functional do nothing if Direction === 0
        return Direction > 0 ? MOVE_Next(grpsObj) : MOVE_Last(grpsObj); // TODO WHAT IF === 0
    };
    SELECT_MOVE_(grpsObj)(Direction);
    /// UPDATE_Styles
    SET_All_Verse_Styles (StyleObj);
};
