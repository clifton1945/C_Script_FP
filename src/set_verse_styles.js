/**
 * set_verse_styles.js  was h_SET_All_verse_Styles/js
 * Created by CLIF on 01//2016
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
const SET_One_verseGrp_Styles = R.curry(
    function SET_One_verseGrp_Styles (styleObj, vrGrp) {
    let sO = styleObj[vrGrp.className];
    f_map( SET_One_Verse_Style(sO) ) ( Coll2Array(vrGrp.children)   );
    }  // CALLEDBY ( global StyleObj)(VerseGrp) >> just the StyleObj data for this VersereadGroup
);
//const SET_All_Verse_Styles = (globalStyleObj, coll) => {
const SET_All_Verse_Styles = function SET_All_Verse_Styles (coll) {
    C_GrpStateCnt('style', coll);
    //coll = [...coll];
    var fn = SET_One_verseGrp_Styles(coll);
    R.map(fn , coll);
};
