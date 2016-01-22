/**
 * h_SET_All_verse_Styles.js
 * Created by CLIF on 01/15/2016
 */
"use strict";

/**
 * UPDATES  the global VerseObj FOR this vers elem.
 * @param vO:  the global VerseObj
 * @constructor
 */
const UPDATE_VerseObject = (vO) => (vers) => {
    vO.val = vers[0];
    vO.ndx = vers[1];
    vO.ary = vers[2];
    //C_Trace((o) => o.ndx)(vO);
    return vO
};
const SET_One_Verse_Style = (sO) => (...verse) => {
    let vO = UPDATE_VerseObject (VerseObj) (verse) ;
    // so now HAVE both styleObj && verseObj
    let wt = sO.calcWt(sO, vO);
    //C_Both(`wt:${wt}`);
    //AND FINISH with SET_verse_style_Attribute
    let v_style = vO.val.style;
    v_style.fontSize = `${wt * 100}%`;
    //v_style.textAlign = 'center';
    //C_Both(vO.toStr())
};
const SET_One_verseGrp_Styles = (styleObj) => (vrGrp) => {
    let sO = styleObj[vrGrp.className];
    Trace((o)=>`local styleObj: ${o}`)(sO);
    Trace((o)=>`vrGrp.name: ${o.name}`)(vrGrp);
    //BUILD callback fn: SET_Verse_Style for use in map(fn)(vrGrp.chkldren)
    ___cut = SET_One_Verse_Style(sO);           //REFACT use directly in f_map
    ___data = Coll2Array(vrGrp.children);       //REFACT use directly in f_map
    //C_It(`_this_StyleObj:${sO.name}`);
    //C_It(`_this_VerseReadGrp.len:${___data.length}`);
    f_map( ___cut ) ( ___data   );
};  // CALLEDBY ( global StyleObj)(VerseGrp) >> just the StyleObj data for this VersereadGroup

// this does not care if bindHandlers signaled change chptr OR verse
const SET_All_Verse_Styles = (globalStyleObj) =>  (DEPRECATE) => {
    // First UPDATE current Chptr AND Verse Grps
    C_Trace((o)=>`StyleObj.VRGrpsTmpl:${o.VRGrpsTmpl}`)(globalStyleObj);
    var curChptr_CRGrps = query(
        '.ChptrReadGrps > .cur')(book);
    Trace(()=>`CRGrps:${curChptr_CRGrps.className}`)();
    var curChptr_VRGrps = query(
        ' .chptr > .VerseReadGrps > .cur')(curChptr_CRGrps);
    Trace(()=>`VRGrps:${curChptr_VRGrps.className}`)();
    // NOW CALL each of 3 VerseReadGrps
    Trace((o)=>`VRGrps:o.length: EXP 3 ${o.length}`)([...curChptr_VRGrps]);
    f_map(SET_One_verseGrp_Styles (globalStyleObj))([...curChptr_VRGrps.children]); // TODO  KEEP OR DROP
};
